# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :slax,
  ecto_repos: [Slax.Repo]

# Configures the endpoint
config :slax, Slax.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "j0oNSV/ge+x+U96dwdTMDBLfRxyAZeIkN9Iruqw6oZ9RMGi81OMTuSIUr2aFlSsa",
  render_errors: [view: Slax.ErrorView, accepts: ~w(json)],
  pubsub: [name: Slax.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
