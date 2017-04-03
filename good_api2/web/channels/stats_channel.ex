defmodule GoodApi2.StatsChannel do
    use Phoenix.Channel
    alias GoodApi2.Stats, as: Stats

    intercept(["stats_view"])

    def join("stats_channel:"<> room_code, _message, socket) do
        cond do
            room_code == "phils_secret_stats_page_pls_dont_look" ->  {:ok, socket}
            false -> {:error, "failed to connect"}
        end
    end

#GoodApi2.Endpoint.broadcast("stats_channel:phils_secret_stats_page_pls_dont_look", "stats_view", %{msg: "temp"})
    def handle_out("stats_view", _payload, socket) do
        push socket, "update", Stats.view
        {:noreply, socket}
    end
end