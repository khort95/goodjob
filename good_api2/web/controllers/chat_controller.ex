defmodule GoodApi2.ChatController do
    use GoodApi2.Web, :controller
    alias GoodApi2.Chat

    import GoodApi2.GoodPlug
    plug :log_request

    def send_message(conn, %{"sender"=>user, "job_seeker"=>job_seeker, "job"=>job,"content"=>content}) do
         case Chat.new_message(user, job_seeker, job, content) do
            {:ok, chat} ->
                conn
                |>render("chat.json", %{chat: chat})
            {:error, msg} ->
                conn
                |>put_status(:not_found)
                |>json(%{error: msg})
        end  
    end

     def android_send_message(conn, %{"sender"=>user, "sender_name"=>sender_name, "job_seeker"=>job_seeker, "job"=>job, "content"=>content}) do
         case Chat.new_message(user, job_seeker, job, content) do
            {:ok, chat} ->
                 message = %{"sender"=>user, "sender_name"=>sender_name, "content"=>content}
                 GoodApi2.Endpoint.broadcast("chat:#{job_seeker}&&#{job}", "chat_send", message)
                 conn
                 |>render("chat.json", %{chat: chat})
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
                |>render("chat.json", %{chat: Poison.decode!(chat)})
            {:error, msg} ->
                conn
                |>put_status(:not_found)
                |>json(%{error: msg})
        end
    end
end
