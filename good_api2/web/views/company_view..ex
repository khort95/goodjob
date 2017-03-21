defmodule GoodApi2.CompanyView do
    use GoodApi2.Web, :view

    def render("company.json", %{company: company}) do
        %{
            name: company.name,
            bio: company.bio, 
            logo: company.logo,
            link_to_website: company.link_to_website,
            list_of_locations: company.list_of_locations,
            manager_ids: company.manager_ids, 
            jobs: company.jobs
        }
    end

    def render("company_couch.json", %{company: company}) do
        %{
            name: company["name"], 
            bio: company["bio"], 
            logo: company["logo"],  
            link_to_website: company["link_to_website"],
            list_of_locations: company["list_of_locations"], 
            manager_ids: company["manager_ids"],
            jobs: company["jobs"]
        }
    end

    def render("company_view_couch.json", %{company: company}) do
        %{
            name: company["name"], 
            bio: company["bio"], 
            logo: company["logo"],  
            link_to_website: company["link_to_website"],
            list_of_locations: company["list_of_locations"]
        }
    end
end