defmodule GoodApi2.JobSeeker do
  use GoodApi2.Web, :model
  alias GoodApi2.CouchDb, as: Couch
  alias GoodApi2.Util
  alias GoodApi2.Stats, as: Stats

  defstruct [:name, :email, :password, :bio, :resume, 
            :picture, :distance_range, :tags, 
            :chat_ids, :seen]
  
  def create(inputs) do
      keys = ["name", "email", "password", "bio", "distance_range", "tags"]
      IO.inspect inputs
      case Util.check_keys(keys, inputs) do
        {:ok, user} -> 
            temp = %__MODULE__{name: user["name"], email: user["email"], password: user["password"], bio: user["bio"], tags: user["tags"], distance_range: user["distance_range"]}
            add = %__MODULE__{temp | chat_ids: [], seen: [],  resume: "no-resume", picture: "no-picture"}
            case Couch.new_user(add) do
              {:ok, _, _} -> 
                Stats.add_user(user["email"])
                {:ok, add}
              {:error, _, _} -> {:error, "cant fit inside"}
            end
            
        {:error, _msg} -> {:error, "all required fields not present"}
      end
  end

  def login(email, password) do
      case Couch.validate(email, password) do
        {:ok, user} -> {:ok, user}
        {:error, msg} -> {:error, msg}
      end
  end

  def profile(email) do
      case Couch.valid_document?(email, "job seeker profile not found") do
        {:found, user} -> {:ok, Poison.decode!(user)}
        {:error, msg} -> {:error, msg}
      end
  end

  def update_resume(email, password, resume) do
    with  :ok <- is_pdf?(resume),
         {:ok, user} <- Couch.validate(email, password),
         {:ok, _updated} <- Couch.update_document(user, "resume", resume, "resume added successfully!") do
              {:ok, "updated resume"}
    else
      {:error, message} -> {:error, message}
    end
  end

  defp is_pdf?("data:application/pdf" <> _rest), do: :ok
  defp is_pdf?(_something), do: {:error, "not in pdf format"}


  def get_resume(email) do
    case profile(email) do
        {:ok, user} -> {:ok, user["resume"]}
        {:error, msg} -> {:error, msg}
      end
  end
end

"""
curl -X POST -H "Content-Type: application/json" -d '
{"create": 
{"email": "se.phildimarco@gmail.com",
"name": "Phil DiMarco",
"password": "123456",
"bio": "I am a cool guy",
"distance_range": 15,
"tags":["software", "coding", "bullshiting"]}
}
' "http://localhost:4000/api/job_seeker"

curl -X POST -H "Content-Type: application/json" -d '
{"email":"jeff@gmail.com",
"password":"123456"
}
' "http://localhost:4000/api/job_seeker/login"

curl -X POST -H "Content-Type: application/json" -d '
{"email":"jeff@gmail.com"
}
' "http://localhost:4000/api/job_seeker/profile"

curl -X POST -H "Content-Type: application/json" -d '
{"email":"jeff@gmail.com", "password":"123456", "resume":"test(base64encoded resume here!)"
}
' "http://localhost:4000/api/job_seeker/profile/add_resume"

curl -X POST -H "Content-Type: application/json" -d '
{"email":"se.phildimarco@gmail.com"
}
' "http://localhost:4000/api/job_seeker/profile/view_resume"

"""