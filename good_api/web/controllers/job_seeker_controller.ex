defmodule GoodApi.JobSeekerController do
    use GoodApi.Web, :controller
    alias GoodApi.JobSeeker

    def create(conn, %{"job_seeker" => user_params}) do
        case JobSeeker.create(user_params) do
            {:ok, job_seeker} ->
                conn
                |>put_status(:create)
                |>render("job_seeker.json", job_seeker: job_seeker)
            {:error, changeset} ->
                conn
                |>put_status(:bad_request)
                |>json(%{error: "error creating job_seeker"})
        end
    end

    def authenticate(conn, %{"email" => email, "password" => password}) do
        case JobSeeker.authenticate(email, password) do
            {:ok, job_seeker} ->
                IO.inspect job_seeker
                render(conn, "job_seeker.json", job_seeker: job_seeker)
            {:error, _} ->
                conn
                |>put_status(:not_found)
                |>json(%{error: "Invalid credentials"})
        end
    end
end