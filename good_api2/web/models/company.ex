defmodule GoodApi2.Company do
  use GoodApi2.Web, :model
  alias GoodApi2.CouchDb, as: Couch
  alias GoodApi2.Util

  defstruct [:name, :link_to_website, :logo, :bio, :list_of_locations, :jobs, :manager_ids]
  
  def create(inputs) do
      keys = ["name", "link_to_website", "logo", "bio", "list_of_locations", "email"]
      IO.inspect inputs
      case Util.check_keys(keys, inputs) do
        {:ok, company} -> 
            add = %__MODULE__{
                name: company["name"], 
                link_to_website: company["link_to_website"],
                logo: company["logo"],  
                bio: company["bio"], 
                list_of_locations: company["list_of_locations"],
                jobs: [], 
                manager_ids: [%{inputs["email"] => true}]
            }
            
            case Couch.new_company(add) do
              {:ok, _, _} -> 
                  add_company_to_user(inputs["email"], add.name)
                  {:ok, add}
              {:error, _, _} -> {:error, "cant fit inside"}
            end
            
        {:error, _msg} -> {:error, "all required fields not present"}
      end
    end

    def show(name) do
        case Couch.get_company(name) do
            {:ok, company} -> {:ok, company}
            {:error, msg} -> {:error, msg}
        end
    end
    
    #only use when company is first made
    defp add_company_to_user(email, company) do
        Couch.user_update_company(email, company)
    end

    def add_user_to_company(email, company) do
        with {:found, _user} <- Couch.valid_document?(email, "user not found"),
             {:ok, company} <- Couch.get_document(company, "company not found") do
                  new_user_list = Couch.add_to_list(company["manager_ids"], %{email => false})
                  Couch.update_document(company, "manager_ids", new_user_list, "user has been added to company")
              else
                  {:error, msg} -> {:error, msg}
              end
    end

    def approve_user(sender, email, company) do
         with  :ok <- sender_is_hr_head?(sender, company),
              {:ok, user} <- Couch.get_document(email, "user not found"),
              {:ok, company} <- Couch.get_document(company, "company not found"),
              {:ok, list} <- Couch.test_and_remove(company["manager_ids"], %{email => false}, "failed to find user in company") do
                   new_user_list = Couch.add_to_list(list, %{email => true})
                   Couch.update_document(company, "manager_ids", new_user_list, "user has been approved")
                   Couch.update_document(user, "company", company["name"], "company has been added to user")
              else
                    {:error, msg} -> {:error, msg}
              end
    end

    defp sender_is_hr_head?(sender, company) do
       with {:ok, user} <- Couch.get_document(sender, "user not found"),
            true <- equals(true, user["is_head?"]),
            true <- equals(user["company"], company) do
                :ok
            else
                {:error, _msg} -> {:error, "hr person cannot approve that user"}
                _ -> {:error, "hr person cannot approve that user"}
            end
    end

    defp equals(a, b) do
      case {a, b} do
           {a, b} when a == b -> true
            _ -> false
      end
    end
end

"""
curl -X POST -H "Content-Type: application/json" -d '
{"create": 
{"name": "Evil Corp",
"bio": "we are a really good company to work for",
"logo": "link-to-logo",
"link_to_website": "evilcorp.com",
"list_of_locations":["west long branch", "freehold", "new york city"],
"email":"hr_dimarco@gmail.com"}
}
' "http://localhost:4000/api/company"

curl -X POST -H "Content-Type: application/json" -d '
{"name":"Evil Corp"}
' "http://localhost:4000/api/company/show"

curl -X POST -H "Content-Type: application/json" -d '
{"name":"Evil Corp"}
' "http://localhost:4000/api/company/view"

curl -X POST -H "Content-Type: application/json" -d '
{"company": "Evil Corp", "email":ww@w.com}
' "http://localhost:4000/api/company/add_user"

curl -X POST -H "Content-Type: application/json" -d '
{"sender":"hr_dimarco@gmail.com", "company": "Evil Corp", "email":"ww@w.com"}
' "http://localhost:4000/api/company/approve_user"
"""