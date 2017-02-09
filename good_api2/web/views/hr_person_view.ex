defmodule GoodApi2.HrPersonView do
    use GoodApi2.Web, :view
    alias GoodApi2.HrPerson

    def render("hr_person.json", %{hr_person: hr_person}) do
        %{
            email: hr_person.email,
            name: hr_person.name, 
            picture: hr_person.picture,
            bio: hr_person.bio,
            permissions: hr_person.permissions, 
            role: hr_person.role 
        }
    end

    def render("hr_person_couch.json", %{hr_person: hr_person}) do
        %{
            email: hr_person["email"],
            name: hr_person["name"], 
            picture: hr_person["picture"],
            bio: hr_person["bio"],
            permissions: hr_person["permissions"], 
            role: hr_person["role"],
            company: hr_person["company"]
        }
    end
end