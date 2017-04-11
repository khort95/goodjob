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
    post "/job_seeker/profile/add_resume", JobSeekerController, :update_resume
    post "/job_seeker/profile/view_resume", JobSeekerController, :view_resume

    post "/company", CompanyController, :create
    post "/company/show", CompanyController, :show
    post "/company/view", CompanyController, :view
    post "/company/add_user", CompanyController, :add_user
    post "/company/approve_user", CompanyController, :approve_user

    post "/job", JobController, :create
    post "/job/edit", JobController, :edit
    post "/job/show", JobController, :show
    post "/job/view", JobController, :view
    post "/job/like", JobController, :like
    post "/job/approve", JobController, :approve
    post "/job/job_feed", JobController, :job_feed
    post "/job/delete", JobController, :delete_job

    post "/chat", ChatController, :send_message
    post "/chat_android", ChatController, :android_send_message
    post "/chat/show", ChatController, :show
  end
end
