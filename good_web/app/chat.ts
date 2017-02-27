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