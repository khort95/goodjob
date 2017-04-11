defmodule GoodApi2.Tag do
    def init do
        :ets.new(:tags, [:named_table, :ordered_set, :public])
    end

    def add(list) when is_list(list) do
        Enum.map(list, fn(tag) -> add_tag(tag) end)
        :ok
    end

    def add(item) do 
        add_tag(item)
        :ok
    end

    defp add_tag(tag) do
        case :ets.lookup(:tags, tag) do
            [] -> :ets.insert(:tags, {tag, 1})
            [{_name, count}] -> :ets.insert(:tags, {tag, count+1})
        end
    end

    def all do
        :ets.tab2list(:tags)
    end
end