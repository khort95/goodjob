defmodule Slax.UserController do
  use Slax.Web, :controller
  alias Slax.User # so we can just write "User"

  def create(conn, %{"user" => user_params}) do
    case User.create(user_params) do
      {:ok, user} ->
        conn
        |> put_status(:created)
        |> render("user.json", user: user)
      {:error, changeset} ->
        conn
        |> put_status(:bad_request)
        |> json(%{error: "error creating user"})
    end
  end

  def authenticate(conn, %{"email" => email, "password" => password}) do
    case User.authenticate(email, password) do
        {:ok, user} ->
        conn
        |> render("user.json", user: user)
        {:error, _} ->
        conn
        |> put_status(:not_found)
        |> json(%{error: "Invalid credentials"})
        end
    end

  def authenticate(conn, something) do
    IO.inspect something
  end
  
def show(conn, %{"id" => id}) do
  case Slax.Repo.get_by(User, id: id) do
    nil ->
      conn
      |> put_status(:not_found)
      |> json(%{error: "Not found"})
    user ->
      conn
      |> render("user.json", user: user)
  end
end

def update(conn, %{"id" => id, "user" => user_params}) do
  user = Slax.Repo.get(Slax.User, id)
  changeset = User.changeset(user, user_params)
  case Slax.Repo.update(changeset) do
    {:ok, user} ->
      conn
      |> render("user.json", user: user)
    {:error, _} ->
      conn
      |> put_status(:bad_request)
      |> json(%{error: "Error updating user"})
  end
end

end