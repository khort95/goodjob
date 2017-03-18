defmodule GoodApi2.Job do
    use GoodApi2.Web, :model
    alias GoodApi2.CouchDb, as: Couch
    alias GoodApi2.Util
    alias GoodApi2.Tag, as: Tag

    @derive [Poison.Encoder]
    defstruct [:name, :company, :likes, :active_chats, :description, 
        :post_date, :salary_range, :employment_type, 
        :location, :tags]

    def new(inputs) do
        keys = ["name", "company", "description", "salary_range", "employment_type", "location", "tags"]
        case Util.check_keys(keys, inputs) do
            {:ok, job} ->
                add = %__MODULE__{
                    name: job["name"],
                    company: job["company"],
                    likes: [],
                    active_chats: [],
                    description: job["description"],
                    post_date: DateTime.to_string(DateTime.utc_now()),
                    salary_range: job["salary_range"],
                    employment_type: job["employment_type"],
                    location: job["location"],
                    tags: job["tags"]
                }

                case Couch.new_job(add) do
                    {:ok, _, _} -> 
                        add_job_to_company(job["company"], job["name"])
                        Tag.add(job["tags"])
                        add_ets(job["company"], job["name"], job["tags"]) 
                        {:ok, add}
                    {:error, _, _} -> {:error, "cannot fit inside"}
                    {:error, msg}  -> {:error, msg} 
                end 
            {:error, _msg} -> {:error, "all required fields not present"}
        end
    end

    def show(company, job) do
        case Couch.get_job(company, job) do
            {:ok, job} -> {:ok, job}
            {:error, msg} -> {:error, msg}
        end
    end

    defp add_job_to_company(company, job) do
        Couch.company_new_job(company, job)
    end

    def like(job, user, choice) do
        case choice do
            "like" -> Couch.like(job, user, choice)
            "pass" -> Couch.like(job, user, choice)
            _      -> {:error, "invalid choice"}
        end
    end

    def approve(job, user, choice) do
        case choice do
            "approve" -> Couch.approve(job, user, choice)
            "reject"  -> Couch.approve(job, user, choice)
            _         -> {:error, "invalid choice"}
        end
    end
        
    def init_ets do
         :ets.new(:jobs, [:named_table, :set, :public])    
    end

    defp add_ets(company, job, tags) do
        :ets.insert(:jobs, {"#{company}&#{job}", {tags, 0}})
    end

    def job_feed(seen) do
        :ets.tab2list(:jobs)
        |>Enum.take(5)
        |>Enum.map(fn({job, _other}) -> job end)
        |>Enum.filter(fn(job) -> 
            Enum.all?(seen, fn(seen_job) -> job != seen_job end) 
        end)
    end
end
"""
curl -X POST -H "Content-Type: application/json" -d '
{"new": 
{"company":"Evil Corp",
"name": "paper boy",
"description": "deleiver papers to poeple",
"salary_range": "12 dollars an hour",
"employment_type": "full-time",
"location": "west long branch",
"tags":["paper", "boy", "newspapers"]}
}
' "http://localhost:4000/api/job"

curl -X POST -H "Content-Type: application/json" -d '
{"company":"Evil Corp", "job":"paper boy"}
' "http://localhost:4000/api/job/show"

curl -X POST -H "Content-Type: application/json" -d '
{"job":"some cup&job2", "user":"se.phildimarco@gmail.com", "choice":"like"}
' "http://localhost:4000/api/job/like"

curl -X POST -H "Content-Type: application/json" -d '
{"job":"Evil Corp&paper boy", "user":"se.phildimarco@gmail.com", "choice":"approve"}
' "http://localhost:4000/api/job/approve"

curl -X POST -H "Content-Type: application/json" -d '
{"email":"se.phildimarco@gmail.com"}
' "http://localhost:4000/api/job/job_feed"
"""