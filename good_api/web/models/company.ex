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
end
