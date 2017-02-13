defmodule GoodApi2.Company do
  use GoodApi2.Web, :model
  alias GoodApi2.CouchDb, as: Couch
  alias GoodApi2.Util
  
  @derive [Poison.Encoder]
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
    
    defp add_company_to_user(email, company) do
        Couch.user_update_company(email, company)
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
"""