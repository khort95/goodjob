defmodule GoodApi2.ChatView do
    use GoodApi2.Web, :view

    def render("chat.json", %{chat: chat}) do
        %{
            job_seeker: chat["job_seeker"], 
            job: chat["job"], 
            messages: chat["messages"]
        }
    end

end

# defstruct [:name, :link_to_website, :logo, :bio, :list_of_locations, :manager_ids]