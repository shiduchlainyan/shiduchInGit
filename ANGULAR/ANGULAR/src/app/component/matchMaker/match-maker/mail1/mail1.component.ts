import { Component, OnInit } from '@angular/core';

import { MatchmakerService } from 'src/app/Services/matchmaker.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-mail1',
  templateUrl: './mail1.component.html',
  styleUrls: ['./mail1.component.css']
})
export class Mail1Component implements OnInit {

  constructor(private MatchmakerService: MatchmakerService) { }
  allCandidate: User[];

  ngOnInit() {
    this.getAllCandidate();
  }

  mailToCandidate(subject, text, m, tz) {

    this.MatchmakerService.mailToCandidate(subject.value, text.value, m.value, tz.value).subscribe(res => {
      console.log(res);

    })


  }
// COPY
getAllCandidate() {
  this.MatchmakerService.getAllCandidate().subscribe(res => {
    this.allCandidate = res;
    this.allCandidate.sort(function (a: User, b: User) {
      if (a.FirstName < b.FirstName) { return -1; }
      if (a.FirstName > b.FirstName) { return 1; }
      return 0;});

  })
}


  getMailFromUser(mail) {
    this.MatchmakerService.m1 ="";
    if(mail.currentTarget.value!="null")
    this.MatchmakerService.m1 = mail.currentTarget.value;
  }
  getTzFromUser(tz){
    this.MatchmakerService.tz ="";
    if(tz.currentTarget.value!="null")
    this.MatchmakerService.tz = tz.currentTarget.value;
  }
}
