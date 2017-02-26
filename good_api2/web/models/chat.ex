defmodule GoodApi2.Chat do
    use GoodApi2.Web, :model
    alias GoodApi2.CouchDb, as: Couch
    alias GoodApi2.Util

    def new_message(user, chat, content) do
        message = %{"user"=>user, "content"=>content, "timestamp"=>DateTime.to_string(DateTime.utc_now())}
        case Couch.send_message(chat, message) do
            {:ok, msg} -> {:ok, msg}
            {:error, msg} -> {:error, msg}
        end
    end

    def get_chat(chat_id) do
        case Couch.valid_chat?(chat_id) do
            {:found, chat} -> {:ok, chat}
            {:error, msg} -> {:error, msg}
        end
    end
end
"""
curl -X POST -H "Content-Type: application/json" -d '
{"user":"se.phildimarco@gmail.com", "chat":"se.phildimarco@gmail.com&&Evil Corp&paper boy", "content":"hello!"}
' "http://localhost:4000/api/chat"
"""