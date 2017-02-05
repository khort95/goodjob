defmodule GoodApi.Repo.Migrations.CreateHrPerson do
  use Ecto.Migration

  def change do
    create table(:hrperson) do
      add :email, :string
      add :password, :string
      add :name, :string
      add :bio, :string
      add :role, :string
      add :picture, :string
      add :is_head_hr_manager, :boolean, default: false, null: false
      add :permissions, {:array, :string}
      add :api_token, :string

      timestamps()
    end
    create unique_index(:hrperson, [:email])

  end
end
