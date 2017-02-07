defmodule GoodApi.Router do
  use GoodApi.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", GoodApi do
    pipe_through :api

    resources "/job_seeker", JobSeekerController, except: [:new, :edit]
    post "/job_seeker/authenticate", JobSeekerController, :authenticate

    resources "/hr_person", HrPersonController, except: [:new, :edit]
    post "/hr_person/authenticate", HrPersonController, :authenticate

    resources "/company", CompanyController, except: [:new, :edit]
    post "/company/show", CompanyController, :show
  end
end
