defmodule GoodApi.HrPersonView do
    use GoodApi.Web, :view

    def render("hr_person.json", %{hr_person: hr_person}) do
        %{
            email: hr_person.email,
            name: hr_person.name, 
            picture: hr_person.picture,
            bio: hr_person.bio,
            permissions: hr_person.permissions, 
            role: hr_person.role, 
            api_token: hr_person.api_token
        }
    end
end