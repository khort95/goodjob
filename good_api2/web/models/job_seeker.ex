defmodule GoodApi2.JobSeeker do
  use GoodApi2.Web, :model
  alias GoodApi2.CouchDb, as: Couch
  alias GoodApi2.Util
  
  @derive [Poison.Encoder]
  defstruct [:name, :email, :password, :bio, :resume, 
            :picture, :distance_range, :tags, 
            :chat_ids, :seen]
  
  def create(inputs) do
      keys = ["name", "email", "password", "bio", "resume", "picture", "distance_range", "tags"]
      IO.inspect inputs
      case Util.check_keys(keys, inputs) do
        {:ok, user} -> 
            temp = %__MODULE__{name: user["name"], email: user["email"], password: user["password"], bio: user["bio"], tags: user["tags"], resume: user["resume"], picture: user["picture"], distance_range: user["distance_range"]}
            add = %__MODULE__{temp | chat_ids: [], seen: []}
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
{"email": "jeff@gmail.com",
"name": "Jeff DiMarco",
"password": "123456",
"bio": "I am a cool guy",
"picture": "link-to-picture",
"resume":"I am good at my job",
"distance_range": 15,
"tags":["software", "coding", "bullshiting"]}
}
' "http://localhost:4000/api/job_seeker"

curl -X POST -H "Content-Type: application/json" -d '
{"email":"hr_dimarco@gmail.com",
"password":"123456"
}
' "http://localhost:4000/api/job_seeker/login"

"""