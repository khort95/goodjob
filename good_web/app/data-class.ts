export interface Chat{
    job: string,
    job_seeker: string,
    messages: Message[]
}

export interface Message{
    sender: string
    sender_name: string
    timestamp: string
    content: string
}

export interface Company{
    name: string, 
    logo: string,
    bio: string,
    link_to_website: string,
    list_of_locations: string[],
    hr_manager_ids: string[],
    jobs: string[]
}

export interface Job{
    name: string,
    company: string, 
    likes: string[],
    active_chats: string[],
    description: string,
    post_date: string,
    salary_range: string,
    employment_type: string,
    location: string,
    tags: string[]
}

export interface JobSeekerProfile{
    name: string
    picture: string,
    bio: string,
    resume: string, 
    tags: string[]
}

export interface HrPerson{
    email: string,
    name: string, 
    picture: string,
    bio: string,
    permissions: string[], 
    role: string,
    company: string
}