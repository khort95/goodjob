defmodule GoodApi.Repo.Migrations.CreateJobSeeker do
  use Ecto.Migration

  def change do
    create table(:jobseekers) do
      add :email, :string
      add :password, :string
      add :name, :string
      add :picture, :string
      add :bio, :string
      add :resume, :string
      add :distance_range, :integer
      add :tags, {:array, :string}
      add :jobs_matched, {:array, :integer}
      add :chat_ids, {:array, :integer}
      add :api_token, :string

      timestamps()
    end
    create unique_index(:jobseekers, [:email])

  end
end
