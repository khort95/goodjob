defmodule Slax.UserView do
  use Slax.Web, :view
  
  def render("user.json", %{user: user}) do
    %{
      id: user.email,
      email: user.email,
      api_token: user.api_token,
      first_name: user.first_name,
      last_name: user.last_name
    }
  end
end