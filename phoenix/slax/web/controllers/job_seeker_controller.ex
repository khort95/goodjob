defmodule Slax.JobSeekerController do
  use Slax.Web, :controller
  alias Slax.JobSeeker # so we can just write "User"

  def create(conn, %{"job_seeker" => user_params}) do
    case JobSeeker.create(user_params) do
      {:ok, user} ->
        conn
        |> put_status(:created)
        |> render("job_seeker.json", user: user)
      {:error, changeset} ->
        conn
        |> put_status(:bad_request)
        |> json(%{error: "error creating user"})
    end
  end

  def authenticate(conn, %{"email" => email, "password" => password}) do
    case JobSeeker.authenticate(email, password) do
        {:ok, job_seeker} ->
        conn
        |> render("job_seeker.json", job_seeker: job_seeker)
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
  case Slax.Repo.get_by(JobSeeker, id: id) do
    nil ->
      conn
      |> put_status(:not_found)
      |> json(%{error: "Not found"})
    user ->
      conn
      |> render("user.json", user: user)
  end
end

def update(conn, %{"id" => id, "job_seeker" => user_params}) do
  job_seeker = Slax.Repo.get(Slax.JobSeeker, id)
  changeset = JobSeeker.changeset(job_seeker, user_params)
  case Slax.Repo.update(changeset) do
    {:ok, job_seeker} ->
      conn
      |> render("job_seeker.json", job_seeker: job_seeker)
    {:error, _} ->
      conn
      |> put_status(:bad_request)
      |> json(%{error: "Error updating user"})
  end
end

end