defmodule GoodApi2.Util do
    def check_keys(keys, map) do
        case Enum.map(keys, fn k -> Map.has_key?(map, k) end) |> Enum.all? do
            true -> {:ok, map}
            false -> {:error, "missing"}
        end
  end

  def equals(a, b) do
      case {a, b} do
           {a, b} when a == b -> true
            _ -> false
      end
    end
end