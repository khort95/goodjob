defmodule GoodApi2.NotificationChannel do
    use Phoenix.Channel

    intercept(["new_notification"])

    def join("notifications:"<> _room_code, _message, socket) do
        {:ok, socket}
    end

#GoodApi2.Endpoint.broadcast("notifications:hr_dimarco@gmail.com", "new_notification", %{msg: "new message"})
    def handle_out("new_notification", payload, socket) do
        push socket, "update", payload
        {:noreply, socket}
    end

    def send_notifcation(user, message) do
        GoodApi2.Endpoint.broadcast("notifications:"<>user, "new_notification", %{message: message})
    end
end