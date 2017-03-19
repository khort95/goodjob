defmodule GoodApi2.HrPersonController do
    use GoodApi2.Web, :controller
    alias GoodApi2.HrPerson
    
    def create(conn, %{"create" => inputs}) do
        case HrPerson.create(inputs) do
            {:ok, hr_person} ->
                conn
                |>render("hr_person.json", %{hr_person: hr_person})
            {:error, msg} ->
                conn
                |>put_status(:not_found)
                |>json(%{error: msg})
        end  
    end

    def login(conn, %{"email" => email, "password" => password}) do
        case HrPerson.login(email, password) do
             {:ok, hr_person} ->
                conn
                |>render("hr_person_couch.json", %{hr_person: hr_person})
            {:error, msg} ->
                conn
                |>put_status(:not_found)
                |>json(%{error: msg})
        end  
    end

    def update_picture(conn, %{"email" => email, "picture" => picture}) do
        case HrPerson.update_picture(email, picture) do
            {:ok, hr_person} ->
                 conn
                |>render("hr_person_couch.json", %{hr_person: hr_person})
            {:error, msg} ->
                conn
                |>put_status(:not_found)
                |>json(%{error: msg})
        end
    end
end