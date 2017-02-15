import { HrPerson } from './hr-person';
import { Company } from './company';
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
  
login(password: string, email: string)  {
 
  let creds = JSON.stringify({ email: email, password: password });

  let headers = new Headers();
  headers.append('Content-Type', 'application/json');

  this.http.post('http://localhost:4000/api/hr_person/login', creds, {
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

  fetch_company(name: string)  {
    let creds = JSON.stringify({ name: name});

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    var s = this.http.post('http://localhost:4000/api/company/show', creds, {
      headers: headers
      }).map(data => data.json()).subscribe(
        data => 
            GoodJobService.company = {
                name: data.name, 
                logo: data.logo,
                bio: data.bio,
                list_of_locations: data.list_of_locations, 
                link_to_website: data.link_to_website,
                hr_manager_ids: data.manager_ids
                
            }
        )
     console.log(s)
    }

  create_user(newPerson: any) :HrPerson {
    let creds = JSON.stringify(newPerson);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('http://localhost:4000/api/hr_person', creds, {
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

    this.http.post('http://localhost:4000/api/company', creds, {
      headers: headers
      }).map(data => data.json()).subscribe(
        data => 
          GoodJobService.company = {
              name: data.name, 
              logo: data.logo,
              bio: data.bio,
              list_of_locations: data.list_of_locations, 
              link_to_website: data.link_to_website,
              hr_manager_ids: data.manager_ids
          }
        
      )
      if(GoodJobService.company == null){return {name: "error", logo: "", bio: "", link_to_website: "", list_of_locations: [], hr_manager_ids: []}}
      return GoodJobService.company;
    }

    get_user() :HrPerson {
     if(GoodJobService.hr_person == null){return {email: "", picture: "", bio: "",  permissions: [], role: "", name: "error!", company: ""}}
     return GoodJobService.hr_person;
    }

    get_company() :Company {
     if(GoodJobService.company == null){return {name: "error", logo: "", bio: "", link_to_website: "", list_of_locations: [], hr_manager_ids: []}}
     return GoodJobService.company;
    }


}

