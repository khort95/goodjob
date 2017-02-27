import { HrPerson } from './hr-person';
import { Company } from './company';
import { Job } from './job';
import { Message, Chat } from './chat';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable }     from '@angular/core';

import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GoodJobService{
constructor (private http: Http) {}
public static hr_person: HrPerson
public static company: Company
url: string = "http://localhost:4000/"
//url: string = "http://sepract1.monmouth.edu:4000/"
  
login(password: string, email: string)  {
 
  let creds = JSON.stringify({ email: email, password: password });

  let headers = new Headers();
  headers.append('Content-Type', 'application/json');

  this.http.post(this.url+ 'api/hr_person/login', creds, {
    headers: headers
    }).map(data => data.json()).subscribe(
      data => 
        GoodJobService.hr_person = {
            email: data.email,
            name: data.name, 
            picture: data.picture,
            bio: data.bio,
            permissions: data.permissions, 
            role: data.role,
            company: data.company
        }
      
    )
    }


  create_user(newPerson: any) :HrPerson {
    let creds = JSON.stringify(newPerson);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post(this.url + 'api/hr_person', creds, {
      headers: headers
      }).map(data => data.json()).subscribe(
        data => 
          GoodJobService.hr_person = {
              email: data.email,
              name: data.name, 
              picture: data.picture,
              bio: data.bio,
              permissions: data.permissions, 
              role: data.role,
              company: data.company
          }
        
      )
      if(GoodJobService.hr_person == null){return {email: "", picture: "", bio: "",  permissions: [], role: "",  name: "error!", company: ""}}
      return GoodJobService.hr_person;
    }

    create_company(newPerson: any) :Company {
    let creds = JSON.stringify(newPerson);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post(this.url + 'api/company', creds, {
      headers: headers
      }).map(data => data.json()).subscribe(
        data => 
          GoodJobService.company = {
              name: data.name, 
              logo: data.logo,
              bio: data.bio,
              list_of_locations: data.list_of_locations, 
              link_to_website: data.link_to_website,
              hr_manager_ids: data.manager_ids,
              jobs:[]
          }
        
      )
      if(GoodJobService.company == null){this.fetch_null_company()}
      return GoodJobService.company;
    }

    get_user() :HrPerson {
     if(GoodJobService.hr_person == null){return this.fetch_null_hr_person()}
     return GoodJobService.hr_person;
    }

    fetch_null_hr_person() :HrPerson {
     return {email: "", picture: "", bio: "",  permissions: [], role: "", name: "please login", company: ""}
    }

    test_login(password: string, email: string): Observable<HrPerson>{
       let creds = JSON.stringify({ email: email, password: password });

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return this.http.post(this.url + 'api/hr_person/login', creds, {
        headers: headers
        }).map(this.mapHrPerson)
    }

     mapHrPerson(response:Response): HrPerson{
      console.log("res::", response.json())
      let data = response.json();
      let user = <HrPerson>({
            email: data.email,
            name: data.name, 
            picture: data.picture,
            bio: data.bio,
            permissions: data.permissions, 
            role: data.role,
            company: data.company
        })
        console.log("parsed company!", user)
        GoodJobService.hr_person = user
      return user
    }

    fetch_null_company(): Company  {
      return {name: "error", logo: "", bio: "", link_to_website: "", list_of_locations: [], hr_manager_ids: [], jobs:["no jobs"]}
    }

    fetch_company(name: string): Observable<Company>{
      let body = JSON.stringify({ name: name});

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return this.http.post(this.url + 'api/company/show', body, {
        headers: headers})
        .map(this.mapCompany);
    }

  mapCompany(response:Response): Company{
      console.log("res::", response.json())
      let data = response.json();
      let company = <Company>({
                name: data.name, 
                logo: data.logo,
                bio: data.bio,
                list_of_locations: data.list_of_locations, 
                link_to_website: data.link_to_website,
                hr_manager_ids: data.manager_ids,
                jobs: data.jobs
        })
        console.log("parsed company!", company)

      return company
    }

    fetch_null_job() :Job {
       return { name: "no job found",
                company: "", 
                likes: [],
                active_chats: [],
                description: "",
                post_date: "",
                salary_range: "",
                employment_type: "",
                location: "",
                tags: []
              }
    }

    new_job(job: any) :Observable<Job>{
      let creds = JSON.stringify(job);

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return this.http.post(this.url + 'api/job', creds, {
        headers: headers
        }).map(this.mapJob);
      }

    fetch_job(company: string, name: string) :Observable<Job>{
      let creds = JSON.stringify({job: name, company: company});

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return this.http.post(this.url + 'api/job/show', creds, {
        headers: headers
        }).map(this.mapJob);
    }

    
    mapJob(response:Response): Job{
      console.log("res::", response.json())
      let data = response.json();
      let company = <Job>({
                name: data.name,
                company: data.company, 
                likes: data.likes,
                active_chats: data.active_chats,
                description: data.description,
                post_date: data.post_date,
                salary_range: data.salary_range,
                employment_type: data.employment_type,
                location: data.location,
                tags: data.tags
        })
        console.log("job company!", company)

      return company
    }

    fetch_null_chat(): Chat{
      return{
        job_seeker: "empty chat",
        job:"",
        messages: this.fetch_null_message()
      }
    }

    fetch_null_message(): Message[]{
      return [{sender: "GoodJob", timestamp:"", content:"no messages"}]
    }

    private make_job_id(company: string, job: string): string {
      return company + '&' + job
    }

    fetch_chat(job_seeker_name: string, company_name: string, job_name: string) :Observable<Chat>{
      let creds = JSON.stringify({job_seeker: job_seeker_name, job: this.make_job_id(company_name, job_name)});

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return this.http.post(this.url + 'api/chat/show', creds, {
        headers: headers
        }).map(this.map_chat);
    }

    send_message(sender: string, job_seeker_name: string, company_name: string, job_name: string, msg: string) :Observable<Chat>{
      let creds = JSON.stringify({sender: sender, job_seeker: job_seeker_name, job: this.make_job_id(company_name, job_name), content: msg});

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return this.http.post(this.url + 'api/chat', creds, {
        headers: headers
        }).map(this.map_chat);
    }

    map_chat(response:Response): Chat{
      console.log("res::", response.json())
      let data = response.json();
      let chat = <Chat>({
               job_seeker: data.job_seeker,
               job: data.job,
               messages: data.messages
        })

      return chat
    }

    private static map_messages(messages: any[]): Message[]{
      let msgs: Message[] = []
      for(let obj of messages){
        
        msgs.push(JSON.parse(obj))
      }
      return msgs
    }
}

