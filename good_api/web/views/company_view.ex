defmodule GoodApi.CompanyView do
    use GoodApi.Web, :view

    def render("company.json", %{company: company}) do
        %{
            name: company.name,
            link_to_website: company.link_to_website,
            logo: company.logo,
            bio: company.bio,
            list_of_locations: company.list_of_locations,
            head_HR_manager_id: company.head_HR_manager_id,
            "HR_manager_ids": company."HR_manager_ids"
        }
    end
end