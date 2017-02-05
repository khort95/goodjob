defmodule GoodApi.HrPersonController do
    use GoodApi.Web, :controller
    alias GoodApi.HrPerson

    def create(conn, %{"hr_person" => user_params}) do
        case HrPerson.create(user_params) do
            {:ok, hr_person} ->
                conn
                |>put_status(:created)
                |>render("hr_person.json", hr_person: hr_person)
            {:error, changeset} ->
                conn
                |>put_status(:bad_request)
                |>json(%{error: "error creating hr_person"})
        end
    end

    def authenticate(conn, %{"email" => email, "password" => password}) do
        case HrPerson.authenticate(email, password) do
            {:ok, hr_person} ->
                IO.inspect hr_person
                render(conn, "hr_person.json", hr_person: hr_person)
            {:error, _} ->
                conn
                |>put_status(:not_found)
                |>json(%{error: "Invalid credentials"})
        end
    end
end