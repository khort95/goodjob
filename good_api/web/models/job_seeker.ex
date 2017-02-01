defmodule GoodApi.JobSeeker do
  use GoodApi.Web, :model

  schema "jobseekers" do
    field :email, :string
    field :password, :string
    field :name, :string
    field :picture, :string
    field :bio, :string
    field :resume, :string
    field :distance_range, :integer
    field :tags, {:array, :string}
    field :jobs_matched, {:array, :integer}
    field :chat_ids, {:array, :integer}
    field :api_token, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:email, :password, :name, :picture, :bio, :resume, :distance_range, :tags, :jobs_matched, :chat_ids, :api_token])
    |> validate_required([:email, :password, :name, :picture, :bio, :resume])
    |> unique_constraint(:email)
  end

  def create(params) do
    changeset(%GoodApi.JobSeeker{}, params)
    |> put_change(:password, hashed_password(params["password"]))
    |> put_change(:api_token, :base64.encode(:crypto.strong_rand_bytes(24)))
    |> GoodApi.Repo.insert()
  end
  
  defp hashed_password(password) do
    Comeonin.Pbkdf2.hashpwsalt(password)
  end

  def authenticate(email, password) do
      job_seeker = GoodApi.Repo.get_by(GoodApi.JobSeeker, email: email)
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
end

"""
curl -X POST -H "Content-Type: application/json" -d '{
	"job_seeker": {
		"email": "user@gmail.com",
		"name": "Phil DiMarco",
		"password": "123456",
		"picture": "link-to-picture",
		"bio": "I am a software engineer",
		"resume": "Please give me a job",
		"distance_range": 15,
		"tags": [
			"se",
			"coding"
		],
		"jobs_matched": [
		],
		"chat_ids": [
		],
		"api_token": "temp"
	}
}' "http://localhost:4000/api/job_seeker"
"""

"""
curl -X POST -H "Content-Type: application/json" -d '{

    "password": "123456",
    "email": "se.phildimarco@gmail.com"
  
}' "http://localhost:4000/api/job_seeker/authenticate"
"""