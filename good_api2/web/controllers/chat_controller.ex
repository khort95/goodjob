defmodule GoodApi2.ChatController do
    use GoodApi2.Web, :controller
    alias GoodApi2.Chat

    def send_message(conn, %{"user"=>user, "chat"=>chat, "content"=>content}) do
         case Chat.new_message(user, chat, content) do
            {:ok, _chat} ->
                conn
                |>json(%{ok: "message sent"})
            {:error, msg} ->
                conn
                |>put_status(:not_found)
                |>json(%{error: msg})
        end  
    end

    def show(conn, %{"show"=>chat}) do
        case Chat.get_chat(chat) do
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
