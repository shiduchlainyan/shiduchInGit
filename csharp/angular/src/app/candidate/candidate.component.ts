import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { CandidateService } from '../Services/candidate.service';
import { User } from '../models/user';
import { Router, ChildActivationEnd, Route, RouterEvent } from '@angular/router';
import { DetaileCandidate } from '../models/detaile-candidate';
import { CriterionComponent } from './components/criterion/criterion.component';
import { NgForm } from '@angular/forms';
import { Children } from '../models/children';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { MoreDetailesComponent } from './components/more-detailes/more-detailes.component';
import { Criterion } from '../models/criterion';
import Swal from 'sweetalert2';
import { dateToLocalArray } from '@fullcalendar/core/datelib/marker';


@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {
  user: User = new User();
  cand: DetaileCandidate;
  constructor(private dCandidateService: CandidateService,private router:Router,private PersonalDetailsComponent:PersonalDetailsComponent) { 
  }
  ngOnInit() {
    this.cand = this.dCandidateService.cand;
    
    // let username = localStorage.getItem("user");
    // let password = localStorage.getItem("pas");

    // this.user.Password = password;
    // this.user.UserName = username;

    //  if (username && password) {
    //   this.dCandidateService.login(this.dCandidateService.currentCandidate.User).subscribe((res: any) => {
    //  });
    // }
  
    this.getValueList();
    this.getCriteria();
  }

  getValueList() {
    this.dCandidateService.getAllValueList().subscribe((res) => {
      this.dCandidateService.arrValue = res;
    }, (err) => {

    });
  }

  getCriteria() {
    this.dCandidateService.getCriteria().subscribe((res) => {
      this.dCandidateService.criterionsArr = res;
    }, (err) => {});

  }

returnHomePage() {


  Swal.fire({
    title: 'חזרה לדף הבית !',
    text: "האם אתה בטוח שברצונך לחזור לדף הבית?",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'כן. שמור שינויים !',
    
    cancelButtonText: 'ביטול !',
  }).then((result) => {
    if (result.value) {
      this. saveDetailCandidate() ;
 
      this.router.navigate(['']);
    }
  })
}
saveDetailCandidate() {//שומר את פרטי המועמד
  if (this.cand.User.BornDate)
  new Date( this.cand.User.BornDate).setHours(10);
  for (let item of this.cand.Children)
  new Date( item.BornDate).setHours(10);
  for (let item of this.cand.Hospitalizations) {
    new Date( item.UntilDate).setHours(10);
    new Date( item.FromDate).setHours(10);
  }
  this.dCandidateService.saveDetailCandidate(this.cand).subscribe(res => {
  });



}

  
}