import {HrPerson, Company, Job, Message, Chat, JobSeekerProfile} from './data-class'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable }     from '@angular/core';

import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {CookieService} from 'angular2-cookie/core';

@Injectable()
export class GoodJobService{
  constructor (private http: Http, private cookieService:CookieService) {}
  public static hr_person: HrPerson
  public static company: Company
  url: string = "http://localhost:4000/"
  //url: string = "http://sepract1.monmouth.edu:4000/"


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
     return {email: "", picture: "", bio: "",  permissions: [], role: "", name: "Please Login", company: ""}
    }

    login(password: string, email: string): Observable<HrPerson>{
       let creds = JSON.stringify({ email: email, password: password });

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return this.http.post(this.url + 'api/hr_person/login', creds, {
        headers: headers
        }).map(this.mapHrPerson)
    }

     mapHrPerson(response:Response): HrPerson{
     // console.log("res::", response.json())
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
       // console.log("parsed company!", user)
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
     // console.log("res::", response.json())
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
        //console.log("parsed company!", company)

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
     // console.log("res::", response.json())
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
        //console.log("job company!", company)

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
      return [{sender: "GoodJob", sender_name:"", timestamp:"", content:"no messages"}]
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
      //console.log("res::", response.json())
      let data = response.json();
      let chat = <Chat>({
               job_seeker: data.job_seeker,
               job: data.job,
               messages: data.messages
        })

      return chat
    }

    approve_user(job: string, company: string ,user: string, choice: boolean):Observable<any>{
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let job_id = this.make_job_id(company, job)
      
      if(choice){
        let body = JSON.stringify({job: job_id, user: user, choice: "approve"});
        
        return this.http.post(this.url + 'api/job/approve', body, {
          headers: headers
          }).map(this.map_message);
        }
      else{
        let body = JSON.stringify({job: job_id, user: user, choice: "reject"});
        
        return this.http.post(this.url + 'api/job/approve', body, {
          headers: headers
          }).map(this.map_message);
        }
      }

     map_message(response:Response): any{
      //console.log("res::", response.json())
      return response.json();
    }

    private make_job_id(company: string, job: string): string {
      return company + '&' + job
    }

  fetch_null_job_seeker_profile(): JobSeekerProfile{
    return{
      name: "user not found", 
      picture: "",
      bio: "",
      resume: "", 
      tags: ""
    }
  }


    fetch_job_seeker_profile(email: string) :Observable<JobSeekerProfile>{
      let creds = JSON.stringify({email: email});

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return this.http.post(this.url + 'api/job_seeker/profile', creds, {
        headers: headers
        }).map(this.mapJobSeekerProfile);
    }

  mapJobSeekerProfile(response:Response): JobSeekerProfile{
     // console.log("res::", response.json())
      let data = response.json();
      let company = <JobSeekerProfile>({
                name: data.name,
                picture: data.picture,
                bio: data.bio,
                resume: data.resume,
                tags: data.tags
        })
        //console.log("job company!", company)

      return company
    }


}
