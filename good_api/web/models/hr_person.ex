defmodule GoodApi.HrPerson do
  use GoodApi.Web, :model

  schema "hrperson" do
    field :email, :string
    field :password, :string
    field :name, :string
    field :bio, :string
    field :role, :string
    field :picture, :string
    field :is_head_hr_manager, :boolean, default: false
    field :permissions, {:array, :string}
    field :api_token, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:email, :password, :name, :bio, :role, :picture, :is_head_hr_manager, :permissions])
    |> validate_required([:email, :password, :name, :bio, :role, :picture, :is_head_hr_manager, :permissions])
    |> unique_constraint(:email)
  end

   def create(params) do
    changeset(%GoodApi.HrPerson{}, params)
    |> put_change(:password, hashed_password(params["password"]))
    |> put_change(:api_token, :base64.encode(:crypto.strong_rand_bytes(24)))
    |> GoodApi.Repo.insert()
  end
  
  defp hashed_password(password) do
    Comeonin.Pbkdf2.hashpwsalt(password)
  end

  def authenticate(email, password) do
      job_seeker = GoodApi.Repo.get_by(GoodApi.HrPerson, email: email)
      case check_password(job_seeker, password) do
          true -> {:ok, job_seeker}
          _    -> {:error, "not found"}
      end
  end

  def check_password(job_seeker, password) do
      case job_seeker do
          nil -> false
          _ -> Comeonin.Pbkdf2.checkpw(password, job_seeker.password)
      end
  end

  def authenticate_by_token(token) do
    case token do
      nil -> nil
      _ -> GoodApi.Repo.get_by(GoodApi.HrPerson, api_token: token)
    end
  end
end

"""
curl -X POST -H "Content-Type: application/json" -d '{
	"hr_person": {
		"email": "hr_dimarco@gmail.com",
		"name": "Phil DiMarco",
		"password": "123456",
    "bio": "I am a cool guy",
		"picture": "link-to-picture",
    "role": "I do shit and fuck around all daaayy boy",
    "is_head_hr_manager":"false",
    "permissions":[],
    "api_token": "temp"
	}
}' "http://localhost:4000/api/hr_person"
"""
"""
curl -X POST -H "Content-Type: application/json" -d '{

    "password": "123456",
    "email": "hr_dimarco@gmail.com"
  
}' "http://localhost:4000/api/hr_person/authenticate"
"""