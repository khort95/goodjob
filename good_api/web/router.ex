defmodule GoodApi.Router do
  use GoodApi.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", GoodApi do
    pipe_through :api

    resources "/job_seeker", JobSeekerController, except: [:new, :edit]
    post "/job_seeker/authenticate", JobSeekerController, :authenticate
  end
end
