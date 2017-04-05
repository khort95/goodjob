defmodule GoodApi2.ChatChannel do
    use Phoenix.Channel

    intercept(["chat_send"])

    def join("chat:"<> _room_code, _message, socket) do
        {:ok, socket}
    end

    #validate mesage and save to db here?
    def handle_in("chat_send", %{"content"=>message}, socket) do
        #save message to db and brodcast if valid
        broadcast! socket, "chat_send", message
        {:noreply, socket}
    end

#GoodApi2.Endpoint.broadcast("notifications:hr_dimarco@gmail.com", "new_notification", %{msg: "new message"})
    def handle_out("chat_send", payload, socket) do
        push socket, "new_message", payload
        {:noreply, socket}
    end

    def send_notifcation(chat, message) do
        GoodApi2.Endpoint.broadcast("notifications:"<>chat, "chat_send", message)
    end
end