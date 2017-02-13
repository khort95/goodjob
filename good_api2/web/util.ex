defmodule GoodApi2.Util do
    def check_keys(keys, map) do
        case Enum.map(keys, fn k -> Map.has_key?(map, k) end) |> Enum.all? do
            true -> {:ok, map}
            false -> {:error, "missing"}
        end
  end
end