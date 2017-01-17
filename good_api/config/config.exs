# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :good_api, GoodApi.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "eI8BBleA6Y6JJ3S1IvsoHi/0t4NVbAeUPJwdlgmtz5/32oBTj3RDCZsb5Sw7YD18",
  render_errors: [view: GoodApi.ErrorView, accepts: ~w(html json)],
  pubsub: [name: GoodApi.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
