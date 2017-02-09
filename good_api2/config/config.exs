# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :good_api2, GoodApi2.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "AVQhmc3GG/uXEAOFahNopeqzSVotqae2IlQGhd5yWFqGQdvjuqgE+X9rq+ZYll3k",
  render_errors: [view: GoodApi2.ErrorView, accepts: ~w(json)],
  pubsub: [name: GoodApi2.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
