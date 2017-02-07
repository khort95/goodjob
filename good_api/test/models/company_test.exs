defmodule GoodApi.CompanyTest do
  use GoodApi.ModelCase

  alias GoodApi.Company

  @valid_attrs %{HR_manager_ids: [], bio: "some content", head_HR_manager_id: 42, link_to_website: "some content", list_of_locations: [], logo: "some content", name: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Company.changeset(%Company{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Company.changeset(%Company{}, @invalid_attrs)
    refute changeset.valid?
  end
end
