defmodule GoodApi.CompanyController do
    use GoodApi.Web, :controller
    alias GoodApi.Company

    def create(conn, %{"company" => user_params}) do
        case Company.create(user_params) do
            {:ok, company} ->
                conn
                |>put_status(:created)
                |>render("company.json", company: company)
            {:error, changeset} ->
                conn
                |>put_status(:bad_request)
                |>json(%{error: "error creating company"})
        end
    end

    def show(conn, %{"name" => name}) do
        case Company.show(name) do
            {:ok, company} ->
                conn
                |>render("company.json", company: company)
            {:error, _} ->
                conn
                |>put_status(:not_found)
                |>json(%{error: "Invalid credentials"})
        end
    end
end
