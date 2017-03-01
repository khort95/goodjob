defmodule GoodApi2.Chat do
    use GoodApi2.Web, :model
    alias GoodApi2.CouchDb, as: Couch
    alias GoodApi2.Util

    def new_message(sender, job_seeker, job, content) do
        message = %{"sender"=>sender,"sender_name"=>"", "content"=>content, "timestamp"=>DateTime.to_string(DateTime.utc_now())}
        case Couch.send_message(job_seeker, job, message) do
            {:ok, msg} -> {:ok, msg}
            {:error, msg} -> {:error, msg}
        end
    end

    def get_chat(job_seeker, job) do
        case Couch.valid_chat?(job_seeker, job) do
            {:found, chat} -> {:ok, chat}
            {:error, msg} -> {:error, msg}
        end
    end
end
"""
curl -X POST -H "Content-Type: application/json" -d '
{"sender":"se.phildimarco@gmail.com", "job_seeker":"se.phildimarco@gmail.com", "job":"Evil Corp&paper boy", "content":"hey 1!!"}
' "http://localhost:4000/api/chat"

curl -X POST -H "Content-Type: application/json" -d '
{"job_seeker":"se.phildimarco@gmail.com", "job":"Evil Corp&paper boy"}
' "http://localhost:4000/api/chat/show"
"""