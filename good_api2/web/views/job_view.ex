defmodule GoodApi2.JobView do
    use GoodApi2.Web, :view
    
    def render("job.json", %{job: job}) do
        %{
            name: job.name,
            company: job.company, 
            likes: job.likes,
            active_chats: job.active_chats,
            description: job.description,
            post_date: job.post_date,
            salary_range: job.salary_range,
            employment_type: job.employment_type,
            location: job.location,
            tags: job.tags

        }
    end

    def render("job_couch.json", %{job: job}) do
        %{ 
            name: job["name"],
            company: job["company"], 
            likes: job["likes"],
            active_chats: job["active_chats"],
            description: job["description"],
            post_date: job["post_date"],
            salary_range: job["salary_range"],
            employment_type: job["employment_type"],
            location: job["location"],
            tags: job["tags"]
        }
    end
end

#  defstruct [:company, :name, :likes, :active_chats, :description, 
#        :post_date, :salary_range, :employment_type, 
 #       :location, :tags]