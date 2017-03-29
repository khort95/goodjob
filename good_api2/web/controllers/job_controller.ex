defmodule GoodApi2.JobController do
    use GoodApi2.Web, :controller
    alias GoodApi2.Job
    alias GoodApi2.CouchDb, as: Couch
    
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

    def show(conn, %{"company"=>company, "job" => name}) do
        case Job.show(company, name) do
            {:ok, job} ->
                conn
                |>render("job_couch.json", %{job: job})
            {:error, msg} ->
                conn
                |>put_status(:not_found)
                |>json(%{error: msg})
        end
    end

     def show(conn, _something) do
        conn
        |>put_status(:not_found)
        |>json(%{error: "bad request"})
        
    end

    def view(conn, %{"job" => name}) do
        case Job.show(name) do
            {:ok, job} ->
                conn
                |>render("job_view_couch.json", %{job: job})
            {:error, msg} ->
                conn
                |>put_status(:not_found)
                |>json(%{error: msg})
        end
    end

    def like(conn, %{"job"=>job, "user"=>user, "choice"=>choice}) do
            case Job.like(job, user, choice) do
            {:ok, job} ->
                conn
                |>json(%{ok: job})
            {:error, msg} ->
                conn
                |>put_status(:not_found)
                |>json(%{error: msg})
        end
    end

     def approve(conn, %{"job"=>job, "user"=>user, "choice"=>choice}) do
        case Job.approve(job, user, choice) do
            {:ok, job} ->
                conn
                |>json(%{ok: job})
            {:error, msg} ->
                conn
                |>put_status(:not_found)
                |>json(%{error: msg})
        end
    end

    def job_feed(conn, %{"email" => email}) do
         case Couch.profile(email) do
            {:ok, job_seeker} ->
                jobs = Job.job_feed(job_seeker["seen"])
                conn
                |>json(jobs)
            {:error, msg} ->
                conn
                |>put_status(:not_found)
                |>json(%{error: msg})
        end
    end
end