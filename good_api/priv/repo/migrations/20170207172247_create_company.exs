defmodule GoodApi.Repo.Migrations.CreateCompany do
  use Ecto.Migration

  def change do
    create table(:companies) do
      add :name, :string
      add :link_to_website, :string
      add :logo, :string
      add :bio, :string
      add :list_of_locations, {:array, :string}
      add :head_HR_manager_id, :integer
      add :HR_manager_ids, {:array, :integer}

      timestamps()
    end
    create unique_index(:companies, [:name])

  end
end
