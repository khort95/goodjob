defmodule GoodApi2.HrPerson do
  use GoodApi2.Web, :model
  alias GoodApi2.CouchDb, as: Couch
  alias GoodApi2.Util
  
  @derive [Poison.Encoder]
  defstruct [:name, :email, :password, :bio, :role, :picture, :company, :is_head?, :permissions]
  
  def create(inputs) do
      keys = ["name", "email", "password", "bio", "role", "picture"]
      IO.inspect inputs
      case Util.check_keys(keys, inputs) do
        {:ok, user} -> 
            temp = %__MODULE__{name: user["name"], email: user["email"], password: user["password"], bio: user["bio"], role: user["role"], picture: user["picture"]}
            add = %__MODULE__{temp |  company: "nil", is_head?: false, permissions: ["nil"]}
            case Couch.new_user(add) do
              {:ok, _, _} -> {:ok, add}
              {:error, _, _} -> {:error, "cant fit inside"}
            end
            
        {:error, _msg} -> {:error, "all required fields not present"}
      end
  end

  def login(username, password) do
      case Couch.validate(username, password) do
        {:ok, user} -> {:ok, user}
        {:error, msg} -> {:error, msg}
      end
  end
end

"""
curl -X POST -H "Content-Type: application/json" -d '
{"create": 
{"email": "hr_dimarco@gmail.com",
"name": "Phil DiMarco",
"password": "123456",
"bio": "I am a cool guy",
"picture": "link-to-picture",
"role": "I do shit and fuck around all daaayy boy"}
}
' "http://localhost:4000/api/hr_person"

curl -X POST -H "Content-Type: application/json" -d '
{"email":"hr_dimarco@gmail.com",
"password":"123456"
}
' "http://localhost:4000/api/hr_person/login"

"""