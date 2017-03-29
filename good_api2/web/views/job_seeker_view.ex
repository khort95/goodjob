defmodule GoodApi2.JobSeekerView do
    use GoodApi2.Web, :view

    def render("job_seeker.json", %{job_seeker: job_seeker}) do
        %{
            email: job_seeker.email,
            name: job_seeker.name, 
            picture: job_seeker.picture,
            bio: job_seeker.bio,
            resume: job_seeker.resume,
            tags: job_seeker.tags, 
            chat_ids: job_seeker.chat_ids
        }
    end

    def render("job_seeker_profile.json", %{job_seeker: job_seeker}) do
        %{
            name: job_seeker["name"], 
            picture: job_seeker["picture"],
            bio: job_seeker["bio"],
            tags: job_seeker["tags"]
        }
    end

    def render("job_seeker_couch.json", %{job_seeker: job_seeker}) do
        %{
            email: job_seeker["email"],
            name: job_seeker["name"], 
            picture: job_seeker["picture"],
            bio: job_seeker["bio"],
            resume: job_seeker["resume"], 
            tags: job_seeker["tags"],
            chat_ids: job_seeker["chat_ids"]
        }
    end
end

# defstruct [:name, :email, :password, :bio, :resume, :picture, :distance_range, :tags,  :chat_ids]