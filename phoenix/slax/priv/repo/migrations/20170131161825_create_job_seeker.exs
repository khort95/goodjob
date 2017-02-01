defmodule Slax.Repo.Migrations.CreateJobSeeker do
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
      add :jobs_matched, :string
      add :chat_ids, {:array, :integer}

      timestamps()
    end
    create unique_index(:jobseekers, [:email])

  end
end
