defmodule GoodApi2.JobServer do
    use GenServer
    alias GoodApi2.CouchDb, as: Couch
    #change to use ets
    def start_link do
        GenServer.start_link(__MODULE__, [], name: __MODULE__)
    end

    def add(id, company, job, description, tags) do
        GenServer.cast(__MODULE__, {:add, %{id=>[company, job, description, tags]}})
    end

    def delete(job) do
        GenServer.cast(__MODULE__, {:delete, job})
    end

    def get() do
        GenServer.call(__MODULE__, :get)
    end

    def handle_cast({:add, job}, current_list) do
        {:noreply, [job | current_list]}
    end

    def handle_cast({:delete, job}, current_list) do
        job_in_list = Enum.filter(current_list, 
            fn(job_is) -> 
                [job_id] = Map.keys(job_is)
                job_id == job
            end)

        case job_in_list do
            [something] -> {:noreply, List.delete(current_list, something)}
            [] -> {:noreply, current_list}
        end
    end

    def handle_cast({:replace, list}, _current_list) do
        {:noreply, list}
    end

    def handle_call(:get, _from, list) do
        {:reply, list, list}
    end

    def add_test_jobs(num) do
        Enum.each(1..num, fn(job) -> 
            add("somecup&somejob#{job}","somecup", "somejob#{job}", "this is areally good job, please apply", ["tag1", "tag2", "tag3"]) 
        end)
    end

#save to dts rather than couch?
    def write_to_db(name) do
        #IO.inspect(body)
       case Couch.write_document(name, get()) do
            {:ok, msg} -> {:ok, "#{msg}, saved as #{name}"}
            {:error, msg} -> {:ok, msg}    
        end
    end

    def load_from_db(name) do
        case Couch.get_document(name, "get job list") do
           {:ok, job_list} -> 
               GenServer.cast(__MODULE__, {:replace, job_list["body"]})
               {:ok, job_list}
           {:error, msg} -> {:error, msg}
        end
    end
end
