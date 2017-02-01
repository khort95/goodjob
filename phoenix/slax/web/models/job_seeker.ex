defmodule Slax.JobSeeker do
  use Slax.Web, :model

  schema "jobseekers" do
    field :email, :string
    field :password, :string
    field :name, :string
    field :picture, :string
    field :bio, :string
    field :resume, :string
    field :distance_range, :integer
    field :tags, {:array, :string}
    field :jobs_matched, :string
    field :chat_ids, {:array, :integer}

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:email, :password, :name, :picture, :bio, :resume, :distance_range, :tags, :jobs_matched, :chat_ids])
    |> validate_required([:email, :password, :name, :picture, :bio, :resume, :distance_range, :tags, :jobs_matched, :chat_ids])
    |> unique_constraint(:email)
  end
end
