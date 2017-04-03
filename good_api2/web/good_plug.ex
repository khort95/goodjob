defmodule GoodApi2.GoodPlug do
    alias GoodApi2.Stats, as: Stats
    import Plug.Conn

    def log_request(conn, _) do
        Stats.request(conn.request_path)
        GoodApi2.Endpoint.broadcast("stats_channel:phils_secret_stats_page_pls_dont_look", "stats_view", %{msg: "temp"})
        conn
    end
end