defmodule GoodApi.Company do
  use GoodApi.Web, :model

  schema "companies" do
    field :name, :string
    field :link_to_website, :string
    field :logo, :string
    field :bio, :string
    field :list_of_locations, {:array, :string}
    field :head_HR_manager_id, :integer
    field :HR_manager_ids, {:array, :integer}

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :link_to_website, :logo, :bio, :list_of_locations, :head_HR_manager_id, :HR_manager_ids])
    |> validate_required([:name, :link_to_website, :logo, :bio, :list_of_locations, :head_HR_manager_id, :HR_manager_ids])
    |> unique_constraint(:name)
  end

  def create(params) do
    changeset(%GoodApi.Company{}, params)
    |> GoodApi.Repo.insert()
  end

  def show(name) do
    company = GoodApi.Repo.get_by(GoodApi.Company, name: name)
    case company do
      nil -> {:error, "company not found"}
      _   -> {:ok, company}
    end
  end
  
end

"""
curl -X POST -H "Content-Type: application/json" -d '{
	"company": {
	  "name": "test company",
    "link_to_website": "www.goodjob.com",
    "logo": "link-to-logo",
    "bio": "we are a great company",
    "list_of_locations":[],
    "head_HR_manager_id": 0,
    "HR_manager_ids":[]
	}
}' "http://localhost:4000/api/company"
"""

"""
curl -X POST -H "Content-Type: application/json" -d '{
	  "name": "test company"
	}' "http://localhost:4000/api/company/show"
"""