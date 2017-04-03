defmodule GoodApi2.GoodPlug do
    alias GoodApi2.EventServer, as: Events
    import Plug.Conn

    def log_request(conn, _) do
        Events.request(conn.request_path)
        GoodApi2.Endpoint.broadcast("stats_channel:phils_secret_stats_page_pls_dont_look", "stats_view", %{msg: "temp"})
        conn
    end
end