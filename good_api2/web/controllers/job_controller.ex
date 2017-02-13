defmodule GoodApi2.JobController do
    use GoodApi2.Web, :controller
    alias GoodApi2.Job
    
    def create(conn, %{"new" => inputs}) do
        case Job.new(inputs) do
            {:ok, job} ->
                conn
                |>render("job.json", %{job: job})
            {:error, msg} ->
                conn
                |>put_status(:not_found)
                |>json(%{error: msg})
        end  
    end

    def show(conn, %{"name" => name}) do
        case Job.show(name) do
            {:ok, job} ->
                conn
                |>render("job_couch.json", %{job: job})
            {:error, msg} ->
                conn
                |>put_status(:not_found)
                |>json(%{error: msg})
        end
    end
end