import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/Services/candidate.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { DetaileCandidate } from 'src/app/models/detaile-candidate';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-complete-register',
  templateUrl: './complete-register.component.html',
  styleUrls: ['./complete-register.component.css']
})
export class CompleteRegisterComponent implements OnInit {

  constructor(private dCandidateService: CandidateService, private router: Router) { }
  u: User = new User();
  isExist: boolean = true;


  ngOnInit() {
    this.isExist = true;
  }



  Onsubmit() {


    this.dCandidateService.GetDetailsByUserId(this.u).subscribe((res: DetaileCandidate) => {
      alert("res");
      this.dCandidateService.cand = res;
      localStorage.setItem("userId", res.User.UserId. toString());
      localStorage.setItem("bym", "gbb");
     

      this.router.navigate(['/detail-candidate']);

    },
    (err) => {
      this.isExist = false;

    });

}


}
