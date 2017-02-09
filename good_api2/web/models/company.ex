defmodule GoodApi2.Company do
  use GoodApi2.Web, :model
  alias GoodApi2.CouchDb, as: Couch
  
  @derive [Poison.Encoder]
  defstruct [:name, :link_to_website, :logo, :bio, :list_of_locations, :manager_ids]
  
  def create(inputs) do
      keys = ["name", "link_to_website", "logo", "bio", "list_of_locations"]
      IO.inspect inputs
      case check_keys(keys, inputs) do
        {:ok, company} -> 
            add = %__MODULE__{
                name: company["name"], 
                link_to_website: company["link_to_website"],
                logo: company["logo"],  
                bio: company["bio"], 
                list_of_locations: company["list_of_locations"], 
                manager_ids: [0]
            }
            
            case Couch.new_company(add) do
              {:ok, _, _} -> {:ok, add}
              {:error, _, _} -> {:error, "cant fit inside"}
            end
            
        {:error, _msg} -> {:error, "all required fields not present"}
      end
    end

    def show(name) do
        case Couch.get_company(name) do
            {:ok, user} -> {:ok, user}
            {:error, msg} -> {:error, msg}
        end
    end

    defp check_keys(keys, map) do
        case Enum.map(keys, fn k -> Map.has_key?(map, k) end) |> Enum.all? do
            true -> {:ok, map}
            false -> {:error, "missing"}
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
"list_of_locations":["west long branch", "freehold", "new york city"]}
}
' "http://localhost:4000/api/company"

curl -X POST -H "Content-Type: application/json" -d '
{"name":"Evil Corp"}
' "http://localhost:4000/api/company/show"
"""