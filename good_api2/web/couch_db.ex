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
            {:error, _} -> {:error, "no match"}  
        end
    end

    #make chat ids user.email-company.name !
    #http://127.0.0.1:5984/_utils/index.html
end