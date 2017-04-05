#do no resume thing
defmodule GoodApi2.Chat do
    use GoodApi2.Web, :model
    alias GoodApi2.CouchDb, as: Couch
   # alias GoodApi2.NotificationChannel, as: NC
    alias GoodApi2.EventServer, as: Event

    ##NOTIFICATIONS NEED TO BE HANDLED IN A SMARTER WAY!!
    def new_message(sender, job_seeker, job, content) do
        message = %{"sender"=>sender,"sender_name"=>"", "content"=>content, "timestamp"=>DateTime.to_string(DateTime.utc_now())}
        
        case Couch.send_message(job_seeker, job, message) do
            {:ok, msg} -> 
                #NC.send_notifcation(sender, content<>" new message")
                Event.message_count
                {:ok, msg}
            {:error, msg} -> {:error, msg}
        end
    end

    def get_chat(job_seeker, job) do
        chat = Couch.make_chat_id(job_seeker, job)
        case Couch.valid_document?(chat, "chat not found") do
            {:found, chat} -> {:ok, chat}
            {:error, msg} -> {:error, msg}
        end
    end
end

defmodule GoodApi2.Message do
    defstruct [:sender, :sender_name, :content, :timestamp] 
end
"""
curl -X POST -H "Content-Type: application/json" -d '
{"sender":"se.phildimarco@gmail.com", "job_seeker":"se.phildimarco@gmail.com", "job":"Evil Corp&paper boy", "content":"hey 1!!"}
' "http://localhost:4000/api/chat"

curl -X POST -H "Content-Type: application/json" -d '
{"job_seeker":"se.phildimarco@gmail.com", "job":"Evil Corp&paper boy"}
' "http://localhost:4000/api/chat/show"
"""