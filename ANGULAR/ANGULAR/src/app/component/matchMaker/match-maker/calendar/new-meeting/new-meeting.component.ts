import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Meeting } from 'src/app/models/meeting';
import { CalanderService } from 'src/app/Services/calander.service';
import { Time } from '@angular/common';
import { dateSelectionJoinTransformer } from '@fullcalendar/core';
import { CandidateService } from 'src/app/Services/candidate.service';
import { User } from 'src/app/models/user';
import { MatchmakerService } from 'src/app/Services/matchmaker.service';

@Component({
  selector: 'app-new-meeting',
  templateUrl: './new-meeting.component.html',
  styleUrls: ['./new-meeting.component.css']
})
export class NewMeetingComponent implements OnInit {
  // המשתנה king יכיל :
  //1-בהוספת פגישה
  //2-בעריכת פגישה
  date: Date;
  kind: number;//ז"א שזו פגישה חדשה
  start: string;
  end: string;
  allCandidate: User[];
  allMatchMaker: User[];
  meetingChanged = new Subject();
  m: Meeting;
  u: User;
  isError: boolean;
  constructor(public bsModalRef: BsModalRef, private CalanderService: CalanderService, private dCandidateService: CandidateService, private MatchmakerService: MatchmakerService) { }

  ngOnInit() {
    this.isError = false;
    this.getAllCandidate();
    this.getAllMatchMaker();
    if (this.dCandidateService.secondCandidate.User.UserId == null) {
      this.u = new User();
      this.u.UserId = Number(localStorage.getItem("userId"));
      this.dCandidateService.GetDetailsByUserId(this.u).subscribe(res => {
        this.dCandidateService.allowAcceess = res.User.AllowAccess;
        if (this.dCandidateService.allowAcceess == 1) {//אם זה מועמד
          this.dCandidateService.secondCandidate = res

        }

      });
    }

    if (this.kind == 1) {//אם זה הוספה של פגישה חדשה
      this.m = new Meeting()
      this.m.KindMeeting = 1;
      this.m.title = "פגישה עם שדכן "
      this.m.backgroundColor = "red";
      this.start = "00:00";
      this.end = "00:00";
    }
    else {//אם זה עדכון של פגישה קיימת

      this.start = this.m.start.toString().split(" ")[4];
      this.end = this.m.end.toString().split(" ")[4];
      // this.start = this.m.start.toString().split(/T|Z/)[1];
      // this.end = this.m.end.toString().split(/T|Z/)[1];

    }



  }

  addMeeting() {
    if (this.start > this.end) {
      this.isError = true;

      return;
    }
    let arr = this.start.split(":")
    this.date.setHours(Number(arr[0]) + 3);
    this.date.setMinutes(Number(arr[1]));
    this.m.start = this.date;
    arr = this.end.split(":");
    let d: Date;
    d = new Date(this.date);
    d.setHours(Number(arr[0]) + 3);
    d.setMinutes(Number(arr[1]));
    this.m.end = d;
    if (this.m.KindMeeting == 1) {
      this.m.title = "פגישה בין מועמדים ";
      this.m.backgroundColor = "green";
    }
    this.CalanderService.addMeeting(this.m).subscribe((res: Meeting) => {
      console.log(res);
      res.start = new Date(res.start.toString().split("Z")[0]);
      res.end = new Date(res.end.toString().split("Z")[0]);
      this.meetingChanged.next(res);
    });

  }
  EditMeeting() {
    this.date = new Date(this.m.start);
    let arr = this.start.split(":")
    this.date.setHours(Number(arr[0]) + 3);

    this.date.setMinutes(Number(arr[1]));
    this.m.start = this.date;
    arr = this.end.split(":");
    let d: Date;
    d = new Date(this.date);
    d.getMinutes
    d.setHours(Number(arr[0]) + 3);
    d.setMinutes(Number(arr[1]));
    this.m.end = d;
    if (this.m.KindMeeting == 1) {
      this.m.title = "פגישה בין מועמדים ";
      this.m.backgroundColor = "green";
    }
    else {
      this.m.title = "פגישה עם שדכן ";
      this.m.backgroundColor = "red";
    }
    this.CalanderService.EditMeeting(this.m).subscribe((res: Meeting) => {
      console.log(res);

      res.start = new Date(res.start.toString().split("Z")[0]);
      res.end = new Date(res.end.toString().split("Z")[0]);

      this.meetingChanged.next(res);
    });
  }
  // res.start= new Date(res.start.toString().split("Z")[0]);
  // res.end= new Date(res.end.toString().split("Z")[0]);

  // this.meetingChanged.next(res);
  deleteMeeting() {

    this.CalanderService.deleteMeeting(this.m).subscribe(res => {
      console.log(res);
      this.meetingChanged.next(null);

    });


  }




  getAllCandidate() {
    this.MatchmakerService.getAllCandidate().subscribe(res => {
      this.allCandidate = res;
      this.allCandidate.sort(function (a: User, b: User) {
        if (a.FirstName < b.FirstName) { return -1; }
        if (a.FirstName > b.FirstName) { return 1; }
        return 0;});

    })
  }
  getAllMatchMaker() {
    this.MatchmakerService.getAllMatchMaker().subscribe(res => {
      this.allMatchMaker = res;
      this.allMatchMaker.sort(function (a: User, b: User) {
        if (a.FirstName < b.FirstName) { return -1; }
        if (a.FirstName > b.FirstName) { return 1; }
        return 0;});
    })
  }

}
