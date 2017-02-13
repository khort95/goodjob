defmodule GoodApi2.Job do
    use GoodApi2.Web, :model
    alias GoodApi2.CouchDb, as: Couch

    @derive [Poison.Encoder]
    defstruct [:name, :company, :likes, :active_chats, :description, 
        :post_date, :salary_range, :employment_type, 
        :location, :tags]

    def new(inputs) do
        
    end

    def show(name) do
        
    end
end