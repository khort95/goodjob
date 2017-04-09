defmodule GoodApi2.JobServer do
    use GenServer

    def start_link do
        GenServer.start_link(__MODULE__, [], name: __MODULE__)
    end

    def add(id, company, job, description, tags) do
        GenServer.cast(__MODULE__, {:add, {id, company, job, description, tags}})
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
                {job_n, _a, _f, _b, _c} = job_is
                job_n == job
            end)

        case job_in_list do
            [something] -> {:noreply, List.delete(current_list, something)}
            [] -> {:noreply, current_list}
        end
        
    end

    def handle_call(:get, _from, list) do
        {:reply, list, list}
    end

    def add_test_jobs(num) do
        Enum.each(1..num, fn(job) -> 
            add("somecup&somejob#{job}","somecup", "somejob#{job}", "this is areally good job, please apply", ["tag1", "tag2", "tag3"]) 
        end)
    end
end
