defmodule GoodApi2.Stats do
    use GenServer
    
    defmodule GoodState do defstruct [:users, :companies, :jobs, :chats, :active_count, :total_requests] end

    def start_link do
         GenServer.start_link(__MODULE__, [], name: __MODULE__)
    end

    def add_user(user) do
        GenServer.cast(__MODULE__, {:add_user, user})
    end

    def add_company(company) do
        GenServer.cast(__MODULE__, {:add_company, company})
    end

    def add_job(job) do
        GenServer.cast(__MODULE__, {:add_job, job})
    end

    def add_chat(chat) do
        GenServer.cast(__MODULE__, {:add_chat, chat})
    end

    def active_plus do
        GenServer.cast(__MODULE__, :active_plus)
    end

    def active_minus do
        GenServer.cast(__MODULE__, :active_minus)
    end

    def request(type) do
        GenServer.cast(__MODULE__, {:request, type})
    end

    def view do
        GenServer.call(__MODULE__, :view)
    end

    def view_detailed do
        GenServer.call(__MODULE__, :view_detailed)
    end

    def init([]) do
        state = %GoodState{users: [], companies: [], jobs: [], active_count: 0, total_requests: {0, []}}
        {:ok, state}
    end

    def handle_cast({:add_user, user}, state) do
        {:noreply, %GoodState{state | users: [user | state.users]}}
    end

     def handle_cast({:add_company, company}, state) do
        {:noreply, %GoodState{state | companies: [company | state.companies ]}}
    end

    def handle_cast({:add_job, job}, state) do
        {:noreply, %GoodState{state | jobs: [job | state.jobs]}}
    end

    def handle_cast({:add_chat, chat}, state) do
        {:noreply, %GoodState{state | chats: [chat | state.chats]}}
    end

    def handle_cast(:active_plus, state) do
        {:noreply, %GoodState{state | active_count: state.active_count + 1}}
    end

    def handle_cast(:active_minus, state) do
        {:noreply, %GoodState{state | active_count: state.active_count - 1}}
    end

    def handle_cast({:request, type}, state) do
        {count, requests} = state.total_requests
        {:noreply, %GoodState{state | total_requests: {count + 1, [{type, DateTime.to_string(DateTime.utc_now())} | requests]}}}
    end

    def handle_call(:view, _from, state) do
        {total, _requests} = state.total_requests 
        {:reply, %{active_count: state.active_count, requests: total, users: Enum.count(state.users), companies: Enum.count(state.companies), jobs: Enum.count(state.jobs), chats: Enum.count(state.chats)}, state}
    end

    def handle_call(:view_detailed, _from, state) do
        {:reply, state, state}
    end
end