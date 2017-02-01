defmodule Slax.JobSeekerTest do
  use Slax.ModelCase

  alias Slax.JobSeeker

  @valid_attrs %{bio: "some content", chat_ids: [], distance_range: 42, email: "some content", jobs_matched: "some content", name: "some content", password: "some content", picture: "some content", resume: "some content", tags: []}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = JobSeeker.changeset(%JobSeeker{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = JobSeeker.changeset(%JobSeeker{}, @invalid_attrs)
    refute changeset.valid?
  end
end
