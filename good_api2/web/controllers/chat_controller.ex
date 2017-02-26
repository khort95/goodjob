defmodule GoodApi2.ChatController do
    use GoodApi2.Web, :controller
    alias GoodApi2.Chat

    def send_message(conn, %{"user"=>user, "job_seeker"=>job_seeker, "job"=>job,"content"=>content}) do
         case Chat.new_message(user, job_seeker, job, content) do
            {:ok, _chat} ->
                conn
                |>json(%{ok: "message sent"})
            {:error, msg} ->
                conn
                |>put_status(:not_found)
                |>json(%{error: msg})
        end  
    end

    def show(conn, %{"job_seeker"=>job_seeker, "job"=>job}) do
        case Chat.get_chat(job_seeker, job) do
            {:ok, chat} ->
                conn
                |>render("company.json", %{chat: chat})
            {:error, msg} ->
                conn
                |>put_status(:not_found)
                |>json(%{error: msg})
        end
    end
end
