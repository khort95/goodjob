defmodule GoodApi2.StatsChannel do
    use Phoenix.Channel
    alias GoodApi2.EventServer, as: Events

    intercept(["stats_view"])

    def join("stats_channel:"<> room_code, _message, socket) do
        cond do
            room_code == "phils_secret_stats_page_pls_dont_look" -> {:ok, socket}
            false -> {:error, "failed to connect"}
        end
    end

#GoodApi2.Endpoint.broadcast("stats_channel:phils_secret_stats_page_pls_dont_look", "stats_view", %{msg: "temp"})
    def handle_out("stats_view", _payload, socket) do
        push socket, "update", Events.view
        {:noreply, socket}
    end

    def handle_in("stats_view", %{"update"=>_message}, socket) do
        GoodApi2.Endpoint.broadcast("stats_channel:phils_secret_stats_page_pls_dont_look", "stats_view", Events.view)
        {:noreply, socket}
    end
end