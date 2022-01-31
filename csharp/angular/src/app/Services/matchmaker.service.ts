import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetaileCandidate } from '../models/detaile-candidate';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Meeting } from '../models/meeting';
import { FullNameToSuggest } from '../models/full-name-to-suggest';

@Injectable({
  providedIn: 'root'
})
export class MatchmakerService {

  constructor(private http: HttpClient) { }
m1:string
t:string
s:string
tz:string;

  GetDetailsByTz(u: User): Observable<DetaileCandidate> {
    return this.http.post<DetaileCandidate>(environment.api + '/GetDetailsByTz/', u)

  }




  GetAllSuggest(): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(environment.api + '/GetAllSuggest');

  }




  EditMeeting(m: Meeting) {
    return this.http.post(environment.api + '/EditMeeting', m)

  }
  getAllCandidate(): Observable<User[]> {
    return this.http.get<User[]>(environment.api + '/getAllCandidate')

  }

  getAgeFromDate(d: Date) {
    if (d == null)
      return null;
    let t = new Date(d);
    return new Date().getFullYear() - t.getFullYear();
  }




  registerMatchMaker(U: User) {

    return this.http.post(environment.api + '/registerMatchMaker', U);

  }


  saveDetailsMatchMaker(u: User) {
    return this.http.post(environment.api + '/saveDetailsMatchMaker', u);

  }

  GetDetailsMatchMaker(u: User): Observable<User> {
    return this.http.post<User>(environment.api + '/GetDetailsMatchMaker', u);

  }



  mailToCandidate(subject, text,m,tz) {
    return this.http.get(environment.api + '/mailToCandidate?subject=' + subject + '&text=' + text+"&m="+m+"&tz="+tz);
  }
  
  GetNameFromTz():Observable<FullNameToSuggest[]>{
    return this.http.get<FullNameToSuggest[]>(environment.api+"/GetNameFromTz");
  }
}
