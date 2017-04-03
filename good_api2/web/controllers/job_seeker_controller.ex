defmodule GoodApi2.JobSeekerController do
    use GoodApi2.Web, :controller
    alias GoodApi2.JobSeeker

    import GoodApi2.GoodPlug
    plug :log_request
    
    def create(conn, %{"create" => inputs}) do
        case JobSeeker.create(inputs) do
            {:ok, job_seeker} ->
                conn
                |>render("job_seeker.json", %{job_seeker: job_seeker})
            {:error, msg} ->
                conn
                |>put_status(:not_found)
                |>json(%{error: msg})
        end  
    end

    def login(conn, %{"email" => email, "password" => password}) do
        case JobSeeker.login(email, password) do
             {:ok, job_seeker} ->
                conn
                |>render("job_seeker_couch.json", %{job_seeker: job_seeker})
            {:error, msg} ->
                conn
                |>put_status(:not_found)
                |>json(%{error: msg})
        end  
    end

    def profile(conn, %{"email" => email}) do
        case JobSeeker.profile(email) do
            {:ok, job_seeker} ->
                conn
                |>render("job_seeker_profile.json", %{job_seeker: job_seeker})
            {:error, msg} ->
                conn
                |>put_status(:not_found)
                |>json(%{error: msg})
        end  
    end

     def update_resume(conn, %{"email" => email, "password"=>password, "resume" => resume}) do
        case JobSeeker.update_resume(email, password, resume) do
            {:ok, msg} -> 
                conn
                |>json(%{ok: msg})
            {:error, msg} ->
                conn
                |>put_status(:not_found)
                |>json(%{error: msg})
        end
    end

    def view_resume(conn, %{"email" => email}) do
        case JobSeeker.get_resume(email) do
            {:ok, resume} ->
                conn
                |>json(%{resume: resume})
            {:error, msg} ->
                conn
                |>put_status(:not_found)
                |>json(%{error: msg})
        end
    end
end