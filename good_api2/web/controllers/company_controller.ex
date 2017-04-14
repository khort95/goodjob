defmodule GoodApi2.CompanyController do
    use GoodApi2.Web, :controller
    alias GoodApi2.Company

    import GoodApi2.GoodPlug
    plug :log_request
    
    def create(conn, %{"create" => inputs}) do
        case Company.create(inputs) do
            {:ok, company} ->
                conn
                |>render("company.json", %{company: company})
            {:error, msg} ->
                conn
                |>put_status(:not_found)
                |>json(%{error: msg})
        end  
    end

    def show(conn, %{"name" => name}) do
        case Company.show(name) do
            {:ok, company} ->
                conn
                |>render("company_couch.json", %{company: company})
            {:error, msg} ->
                conn
                |>put_status(:not_found)
                |>json(%{error: msg})
        end
    end

    def view(conn, %{"name" => name}) do
        case Company.show(name) do
            {:ok, company} ->
                conn
                |>render("company_view_couch.json", %{company: company})
            {:error, msg} ->
                conn
                |>put_status(:not_found)
                |>json(%{error: msg})
        end
    end

    def add_user(conn, %{"email" => email, "company" => company}) do
        case Company.add_user_to_company(email, company) do
            {:ok, msg} ->
                conn
                |>json(%{ok: msg})
            {:error, msg} ->
                conn
                |>put_status(:not_found)
                |>json(%{error: msg})
        end
    end

    def approve_user(conn, %{"sender" => sender, "email" => email, "company" => company, "choice"=>choice}) do
        case Company.approve_user(sender, email, company, choice) do
            {:ok, msg} ->
                conn
                |>json(%{ok: msg})
            {:error, msg} ->
                conn
                |>put_status(:not_found)
                |>json(%{error: msg})
        end
    end
end