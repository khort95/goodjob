defmodule GoodApi2.CompanyController do
    use GoodApi2.Web, :controller
    alias GoodApi2.Company
    
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
end