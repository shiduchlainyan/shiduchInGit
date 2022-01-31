import { Component, OnInit, Input } from '@angular/core';
import { DetaileCandidate } from '../models/detaile-candidate';
import { User } from '../models/user';
import { CandidateService } from '../Services/candidate.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.css']
})
export class EnterComponent implements OnInit {
  hasErorr: boolean;
  src: string = "../../assets/view.png" 
  constructor(private dCandidateService: CandidateService, private router: Router) { }

  ngOnInit() {
    this.hasErorr = false;
  }
  u: User = new User();
  // cand: DetaileCandidate = new DetaileCandidate(new User(),
  //   new Candidate(), [new Children()],
  //   [new Parent()], [new Mechutanim()], [new CriteronCandidate()], [new Docs()],
  //   [new Hospitalizition()], [new MigbalaCandidate()])


  submitloginForm() {
    this.hasErorr = false;

    localStorage.setItem("firstEnter", "2");//בשביל בדיקות תקינות 

    this.dCandidateService.GetDetailsByUserId(this.u).subscribe((r: DetaileCandidate) => {

      if (this.dCandidateService.allowAcceess == 1) {

        let enterIn = this.dCandidateService.cand.Candidate.EnterIn;

        if (!this.dCandidateService.cand.Candidate || enterIn == 1)
          this.router.navigate(['/detail-candidate']);

        if (enterIn == 2) {
          this.router.navigate(['/second-candidate']);
        }

        if (enterIn == 3) {

          Swal.fire({

            type: 'success',
            title: 'מזל טוב !',
            text: '(: כבר התארסת',
            showConfirmButton: false,
            timer: 3000,
            customClass: {
              popup: 'animated tada'
            }
          })
        };

      } else {
        if (this.dCandidateService.allowAcceess == 2 || this.dCandidateService.allowAcceess == 3) {
          this.router.navigate(['/MatcMaker']);
        }
      }
    }, error => {

      Swal.fire({
        type: 'error',
        title: 'שגיעה...',
        text: 'אחד מהנתונים שהוקשו שגוי!',
        footer: 'נסה שנית',
        confirmButtonText: 'אישור'
      })
    });
  }


  // localStorage.setItem("allowAccess", btoa(res.toString()));

  // this.dCandidateService.login(this.u).subscribe((res: any) => {
  //   alert(res);
  //   localStorage.setItem("user", this.u.UserName);
  //   localStorage.setItem("pas", this.u.Password);
  //   this.dCandidateService.cand = res;
  //   this.dCandidateService.allowAcceess = res.User.allowAcceess;
  //   this.router.navigate(['/detail-candidate']);
  //   alert(res);
  // });


  showPassword() {
    var e:HTMLElement=document.getElementById("showHide")
    var x: HTMLElement = document.getElementById("eye");
    if ((x as HTMLInputElement).type === "password") {
      (x as HTMLInputElement).type = "text";
      (e as HTMLInputElement).src="../../assets/hide.png";
    } else {
      (x as HTMLInputElement).type = "password";
      (e as HTMLInputElement).src="../../assets/view.png";
    }
  }

  returnHomePage(){
    
    this.router.navigate(['']);
  }
}

