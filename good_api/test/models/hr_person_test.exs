defmodule GoodApi.HrPersonTest do
  use GoodApi.ModelCase

  alias GoodApi.HrPerson

  @valid_attrs %{email: "some content", is_head_hr_manager: true, name: "some content", password: "some content", permissions: [], picture: "some content", role: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = HrPerson.changeset(%HrPerson{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = HrPerson.changeset(%HrPerson{}, @invalid_attrs)
    refute changeset.valid?
  end
end
