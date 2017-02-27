defmodule GoodApi2.CouchDb do
    alias Couchdb.Connector.Writer
    alias Couchdb.Connector.Reader
    alias Couchdb.Connector
    
    
    @goodjob_db %{protocol: "http", hostname: "localhost",database: "good_job", port: 5984}

    def init_db() do
        Couchdb.Connector.Storage.storage_up(@goodjob_db)
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

    defp valid_user?(email) do
        case Reader.get(@goodjob_db, email) do
            {:ok, data}     -> {:found, data}
            {:error, _error} -> :error
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

    defp valid_job?(job) do
        case Reader.get(@goodjob_db, job) do
            {:ok, data}      -> {:found, data}
            {:error, _error} -> :error
        end
    end

    def like(job_name, user_name, "like") do
        case valid_user?(user_name) do
            {:found, user_result} -> case valid_job?(job_name) do
                        {:found, result} ->
                            job = Poison.decode!(result)
                            user = Poison.decode!(user_result)
                            {:ok, %{:headers => _h, :payload => _p}} = Connector.update(@goodjob_db, %{job | "likes" => add_to_list(job["likes"], user_name)})
                            {:ok, %{:headers => _h, :payload => _p}} = Connector.update(@goodjob_db, %{user | "seen" => add_to_list(user["seen"], job_name)})
                            
                            {:ok, "job liked"}
                        :error -> {:error, "job not found"}
                      end
            :error -> {:error, "user not found"}
        end 
    end

    def like(job_name, user_name, "pass") do
        case valid_user?(user_name) do
            {:found, result} -> case valid_job?(job_name) do
                        {:found, _result} ->
                            user = Poison.decode!(result)
                            {:ok, %{:headers => _h, :payload => _p}} = Connector.update(@goodjob_db, %{user | "seen" => add_to_list(user["seen"], job_name)})
                            {:ok, "job passed"}
                        :error -> {:error, "job not found"}
                      end
            :error -> {:error, "user not found"}
        end 
    end

    def approve(job_name, user_name, "approve") do
        case valid_user?(user_name) do
            {:found, user_result} -> case valid_job?(job_name) do
                        {:found, result} ->
                            job = Poison.decode!(result)
                            user =  Poison.decode!(user_result)
                            case find_in_listremove(job["likes"], user_name) do
                                {:ok, list} -> 
                                    case new_chat(user, job_name) do
                                        {:ok, chat} ->
                                            {:ok, %{:headers => _h, :payload => _p}} = Connector.update(@goodjob_db, %{job | "likes" => list, "active_chats"=>add_to_list(job["active_chats"], user_name)}) 
                                            {:ok, "user added to chat #{chat}"}
                                        {:error, msg} -> {:error, msg}
                                    end
                                :error      -> {:error, "user not found in job"}
                            end
                        :error -> {:error, "job not found"}
                      end
            :error -> {:error, "user not found"}
        end 
    end

    def approve(job_name, user_name, "reject") do
        case valid_user?(user_name) do
            {:found, _user_result} -> case valid_job?(job_name) do
                        {:found, result} ->
                            job = Poison.decode!(result)
                            case find_in_listremove(job["likes"], user_name) do
                                {:ok, list} -> 
                                    {:ok, %{:headers => _h, :payload => _p}} = Connector.update(@goodjob_db, %{job | "likes" => list})
                                    {:ok, "user rejected"}
                                :error      -> {:error, "user not found in job"}
                            end
                        :error -> {:error, "job not found"}
                      end
            :error -> {:error, "user not found"}
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
                    :error -> {:error, "invalid hr_person"}
                end
            {:error, msg} -> {:error, msg}
        end
    end

    def update_document(old, field_name, new_field, success) do
         case Connector.update(@goodjob_db, %{old | field_name => new_field}) do
             {:ok, %{:headers => _h, :payload => _p}} -> {:ok, %{old | field_name => new_field}}
             {:error, _} -> {:error, "failed to update document (error doing #{success})"}
         end
    end

    defp add_to_list(list, item) do
        list++[item]
        |>Enum.uniq()
    end

    defp find_in_listremove(list, item) do
        size = Enum.count(list)
        new_list = List.delete(list, item)
        size2 = Enum.count(new_list)
    
        case size - size2 == 0 do
            true  -> :error
            false -> {:ok, new_list}
        end
    end

    #make chat ids user.email-company.name !
    #http://127.0.0.1:5984/_utils/index.html
end