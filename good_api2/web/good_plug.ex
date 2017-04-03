defmodule GoodApi2.GoodPlug do
    alias GoodApi2.Stats, as: Stats
    import Plug.Conn

    def log_request(conn, _) do
        Stats.request(conn.request_path)
        conn
    end
end