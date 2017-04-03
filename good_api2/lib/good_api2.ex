defmodule GoodApi2 do
  use Application
  alias GoodApi2.Tag, as: Tag
  alias GoodApi2.JobServer, as: Job
  alias GoodApi2.Stats, as: Stats

  # See http://elixir-lang.org/docs/stable/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    Tag.init
    Job.start_link
    Stats.start_link

    import Supervisor.Spec

    # Define workers and child supervisors to be supervised
    children = [
      # Start the endpoint when the application starts
      supervisor(GoodApi2.Endpoint, []),
      # Start your own worker by calling: GoodApi2.Worker.start_link(arg1, arg2, arg3)
      # worker(GoodApi2.Worker, [arg1, arg2, arg3]),
    ]

    # See http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: GoodApi2.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    GoodApi2.Endpoint.config_change(changed, removed)
    :ok
  end
end
