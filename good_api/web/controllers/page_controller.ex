defmodule GoodApi.PageController do
  use GoodApi.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
