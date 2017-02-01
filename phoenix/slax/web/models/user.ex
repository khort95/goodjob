defmodule Slax.User do
  use Slax.Web, :model

  schema "users" do
    field :email, :string
    field :password, :string
    field :first_name, :string
    field :last_name, :string
    field :api_token, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:email, :password, :first_name, :last_name, :api_token])
    |> validate_required([:email, :password, :first_name, :last_name, :api_token])
    |> unique_constraint(:email)
  end

  def create(params) do
    changeset(%Slax.User{}, params)
    |> put_change(:password, hashed_password(params["password"]))
    |> put_change(:api_token, :base64.encode(:crypto.strong_rand_bytes(24)))
    |> Slax.Repo.insert()
  end


  defp hashed_password(password) do
    Comeonin.Pbkdf2.hashpwsalt(password)
  end


def authenticate(email, password) do
  user =  Slax.Repo.get_by(Slax.User, email: email)
  case check_password(user, password) do
    true -> {:ok, user}
    _    -> {:error, "not found"}
  end
end

def check_password(user, password) do
  case user do
    nil -> false
    _ -> Comeonin.Pbkdf2.checkpw(password, user.password)
    end
  end

  def authenticate_by_token(token) do
  case token do
    nil -> nil
    _ -> Slax.Repo.get_by(Slax.User, api_token: token)
  end
end

  
end

"""
curl -X POST -H "Content-Type: application/json" -d '{
  "user": {
    "email": "phil@gmail.com",
    "first_name": "phil",
    "last_name": "DiMarco",
    "password": "123456",
    "api_token": "test"
  }
}' "http://localhost:4000/api/users"

        RESPONSE  
          {"last_name":"DiMarco","id":"phil@gmail.com","first_name":"phil","email":"phil@gmail.com","api_token":"snIRoVVnWCgBYfqC4eWiC+suQ3HES79Y"}

curl -X POST -H "Content-Type: application/json" -d '{

    "password": "123456",
    "email": "phil@gmail.com"
  
}' "http://localhost:4000/api/users/authenticate"
   

"api_token": "rXIzoQujBTOV8xKPi7wIntogQwDcLRXh"
"""