defmodule GoodApi2.Router do
  use GoodApi2.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", GoodApi2 do
    pipe_through :api

    post "/hr_person", HrPersonController, :create
    post "/hr_person/login", HrPersonController, :login
    post "/hr_person/update_picture", HrPersonController, :update_picture

    post "/job_seeker", JobSeekerController, :create
    post "/job_seeker/login", JobSeekerController, :login
    post "/job_seeker/profile", JobSeekerController, :profile

    post "/company", CompanyController, :create
    post "/company/show", CompanyController, :show
    post "/company/view", CompanyController, :view

    post "/job", JobController, :create
    post "/job/show", JobController, :show
    post "/job/view", JobController, :view
    post "/job/like", JobController, :like
    post "/job/approve", JobController, :approve
    post "/job/job_feed", JobController, :job_feed

    post "/chat", ChatController, :send_message
    post "/chat/show", ChatController, :show
  end
end
