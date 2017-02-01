defmodule GoodApi.JobSeekerView do
    use GoodApi.Web, :view

    def render("job_seeker.json", %{job_seeker: job_seeker}) do
        %{
            email: job_seeker.email,
            name: job_seeker.name, 
            picture: job_seeker.picture, 
            bio: job_seeker.bio, 
            resume: job_seeker.resume, 
            distance_range: job_seeker.distance_range, 
            tags: job_seeker.tags, 
            jobs_matched: job_seeker.jobs_matched, 
            chat_ids: job_seeker.chat_ids, 
            api_token: job_seeker.api_token
        }
    end
end