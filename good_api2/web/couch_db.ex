defmodule GoodApi2.CouchDb do
    alias Couchdb.Connector.Writer
    alias Couchdb.Connector.Reader
    alias Couchdb.Connector
    
    #http://127.0.0.1:5984/_utils/index.html
    @goodjob_db %{protocol: "http", hostname: "localhost",database: "good_job", port: 5984}

    def init_db() do
        Couchdb.Connector.Storage.storage_up(@goodjob_db)
    end

    def update_document(old, field_name, new_field, success) do
         case Connector.update(@goodjob_db, %{old | field_name => new_field}) do
             {:ok, %{:headers => _h, :payload => _p}} -> {:ok, %{old | field_name => new_field}}
             {:error, _} -> {:error, "failed to update document (error doing #{success})"}
         end
    end

    defp valid_user?(email) do
        case Reader.get(@goodjob_db, email) do
            {:ok, data}      -> {:found, data}
            {:error, _error} -> {:error, "user not valid"}
        end
    end

    def valid_chat?(chat) do
        case Reader.get(@goodjob_db, chat) do
            {:ok, data}      -> {:found, data}
            {:error, _error} -> {:error, "chat not found"}
        end
    end

    def valid_chat?(job_seeker, job) do
        chat = make_chat_id(job_seeker, job)
        case Reader.get(@goodjob_db, chat) do
            {:ok, data}      -> {:found, data}
            {:error, _error} -> {:error, "chat not found"}
        end
    end

    defp valid_job?(job) do
        case Reader.get(@goodjob_db, job) do
            {:ok, data}      -> {:found, data}
            {:error, _error} -> {:error, "job not found"}
        end
    end

    def new_user(user) do
        IO.inspect user
        json = Poison.encode!(user)
       
        case String.contains?(user.email, "@") do
            true  -> Writer.create(@goodjob_db, json, user.email)
            false -> {:error, "no @ sign", :bad}
        end
        
    end

    def validate(email, password) do
        case Reader.get(@goodjob_db, email) do
            {:ok, data} -> 
                user = Poison.decode!(data)
                pass = user["password"]
                case pass do
                    pass when pass == password -> {:ok, user}
                    _ -> {:error, "bad password"}
                end
            {:error, _} -> {:error, "no match"}    
        end
    end

    def user_update_company(email, company) do
        case Reader.get(@goodjob_db, email) do
            {:ok, data} -> 
                case get_company(company) do
                    {:ok, _} -> user = Poison.decode!(data)
                                {:ok, %{:headers => _h, :payload => _p}} = Connector.update(@goodjob_db, %{user | "company" => company, "is_head?" => true})
                    {:error, _} -> {:error, "company not found"}
                end
            {:error, _} -> {:error, "no match"}
        end
    end

    def new_company(company) do
        IO.inspect company
        json = Poison.encode!(company)
       
        case !String.contains?(company.name, "@") do
            true  -> Writer.create(@goodjob_db, json, company.name)
            false -> {:error, "has @ sign", :bad}
        end
        
    end

    def get_company(name) do
        case Reader.get(@goodjob_db, name) do
            {:ok, data} -> {:ok, Poison.decode!(data)}
            {:error, _} -> {:error, "company not found"}  
        end
    end

    def company_new_job(company, job) do
        case get_company(company) do
            {:ok, company} -> 
                    list = case company["jobs"] do
                                nil -> []
                                jobs -> jobs
                           end
                    {:ok, %{:headers => _h, :payload => _p}} = Connector.update(@goodjob_db, %{company | "jobs" => list ++ [job]})
            {:error, _} -> {:error, "company not found"}
        end
    end

    def new_job(job) do
        IO.inspect job
        json = Poison.encode!(job)
     
        case !String.contains?(job.name, "@") do
            true  -> 
                case get_company(job.company) do
                    {:ok, _company} -> Writer.create(@goodjob_db, json, "#{job.company}&#{job.name}")
                    {:error, _} -> {:error, "invalid company"}
                end
            false -> {:error, "has @ sign", :bad}
        end
    end

    def get_job(company, job) do
        IO.puts "#{company}&#{job}"
        case Reader.get(@goodjob_db, "#{company}&#{job}") do
            {:ok, data} -> {:ok, Poison.decode!(data)}
            {:error, _} -> {:error, "company not found"}  
        end
    end

    def like(job_name, user_name, "pass") do
        with {:found, user_result}   <- valid_user?(user_name),
             {:found, job_result}    <- valid_job?(job_name),
             {user, job}             <- decode_user_job(user_result, job_result),      
             nil                     <- Enum.find(job["likes"], fn(user)->user==user_name end),
             nil                     <- Enum.find(job["active_chats"], fn(user)->user==user_name end) do
                 user = Poison.decode!(user_result)
                 update_document(user, "seen", add_to_list(user["seen"], job_name), "job added to seen")
                 {:ok, "job passed"}
        else
            {:error, message}       -> {:error, message}
            str when is_binary(str) -> {:error, "job in liked active chat cannot pass"}
                                  _ -> {:error, "failed to pass"}       
        end
    end

    def like(job_name, user_name, "like") do
        with {:found, user_result}  <- valid_user?(user_name),
             {:found, job_result}   <- valid_job?(job_name),
             {user, job}            <- decode_user_job(user_result, job_result),              
             nil                    <- Enum.find(job["likes"], fn(user)->user==user_name end),
             nil                    <- Enum.find(user["seen"], fn(job)->job==job_name end),
             nil                    <- Enum.find(job["active_chats"], fn(user)->user==user_name end) do 
                update_document(job, "likes", add_to_list(job["likes"], user_name), "user added to liked jobs")
                update_document(user, "seen", add_to_list(user["seen"], job_name), "job added to seen")
                {:ok, "job liked"}
        else
            {:error, message}       -> {:error, message}
            str when is_binary(str) -> {:error, "job in liked/active/seen already"}
                                  _ -> {:error, "error failed to like job"}
        end
    end

    defp decode_user_job(raw_user, raw_job) do
        job = Poison.decode!(raw_job)
        user = Poison.decode!(raw_user)
        {user, job}
    end

    def approve(job_name, user_name, "approve") do
        with {:found, user_result} <- valid_user?(user_name),
             {:found, job_result} <- valid_job?(job_name),
             {user, job} <- decode_user_job(user_result, job_result),
             {:ok, list} <- test_and_remove(job["likes"], user_name, "user not found in the job likes'"),
             {:ok, chat} <- new_chat(user, job_name) do
                 {:ok, %{:headers => _h, :payload => _p}} = Connector.update(@goodjob_db, %{job | "likes" => list, "active_chats"=>add_to_list(job["active_chats"], user_name)}) 
                 {:ok, "user added to chat #{chat}"}
             else 
                 {:error, msg} -> {:error, msg}
                  _            -> {:error, "failed to approve user"}
             end
    end

    def approve(job_name, user_name, "reject") do
        with {:found, _user_result} <- valid_user?(user_name),
             {:found, job_result} <- valid_job?(job_name),
             job = Poison.decode!(job_result),
             {:ok, list} <- test_and_remove(job["likes"], user_name, "user not found in job") do
                 update_document(job, "likes", list, "rejected user")
                 {:ok, "user rejected"}
        else 
           {:error, msg} -> {:error, msg}
           _             -> {:error, "failed to reject user"}   
        end         
    end

    #takes a user and a job name and creates a new chat document and adds the chat to the user
    defp new_chat(job_seeker, job) do
        empty_chat = %{"job_seeker"=>job_seeker["email"], "job_seeker_name"=>job_seeker["name"], "job"=>job, "messages"=>[]}
        |>Poison.encode!

        new_id = make_chat_id(job_seeker["email"], job)
        #assume job/jobseeker validaded in approve
        case Writer.create(@goodjob_db, empty_chat, new_id) do
            {:ok, _, _} -> 
                {:ok, %{:headers => _h, :payload => _p}} = Connector.update(@goodjob_db, %{job_seeker | "chat_ids" => add_to_list(job_seeker["chat_ids"], job)})
                {:ok, new_id}
            {:error, _, _} -> {:error, "failed to create chat"}
        end
    end

    defp make_chat_id(job_seeker, job) do
        "#{job_seeker}&&#{job}"
    end

    def send_message(job_seeker, job, message) do
        chat_id = make_chat_id(job_seeker, job)
        case valid_chat?(chat_id) do
            {:found, raw} ->
                case valid_user?(message["sender"]) do
                    {:found, user_raw} ->
                        chat = Poison.decode!(raw)
                        user = Poison.decode!(user_raw)
                        message = %{message | "sender_name"=>user["name"]}
                        update_document(chat, "messages", add_to_list(chat["messages"], message), "message sent")
                    {:error, msg} -> {:error, msg}
                end
            {:error, msg} -> {:error, msg}
        end
    end

    defp add_to_list(list, item) do
        case list do
            list when list == nil -> [item]
            _ ->
                list++[item]
                |>Enum.uniq()       
        end
    end

    defp test_and_remove(list, item, msg) do
        size = Enum.count(list)
        new_list = List.delete(list, item)
        size2 = Enum.count(new_list)
    
        case size - size2 == 0 do
            true  -> {:error, msg}
            false -> {:ok, new_list}
        end
    end
end