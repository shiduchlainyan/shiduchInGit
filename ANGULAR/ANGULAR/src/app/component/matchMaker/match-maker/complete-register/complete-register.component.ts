import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/Services/candidate.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { DetaileCandidate } from 'src/app/models/detaile-candidate';
import { MatchmakerService } from 'src/app/Services/matchmaker.service';

@Component({
  selector: 'app-complete-register',
  templateUrl: './complete-register.component.html',
  styleUrls: ['./complete-register.component.css']
})
export class CompleteRegisterComponent implements OnInit {

  constructor(private dCandidateService: CandidateService, private router: Router, private MatchmakerService: MatchmakerService) { }
  u: User = new User();
  isExist: boolean = true;
  allCandidate: User[];

  ngOnInit() {
    this.isExist = true;
    this.getAllCandidate();
  }


  Onsubmit() {


    this.dCandidateService.GetDetailsByUserId(this.u).subscribe((res: DetaileCandidate) => {

      alert("res");
      this.dCandidateService.cand = res;
      localStorage.setItem("userId", res.User.UserId.toString());
      localStorage.setItem("bym", "gbb");//אומר שמדובר בשדכן ולא מועמד רגיל


      this.router.navigate(['/detail-candidate']);

    },
      (err) => {
        this.isExist = false;

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

}



