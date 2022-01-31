import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/Services/candidate.service';
import { DetaileCandidate } from 'src/app/models/detaile-candidate';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-match-maker',
  templateUrl: './match-maker.component.html',
  styleUrls: ['./match-maker.component.css']
})
export class MatchMakerComponent implements OnInit {
  cand: DetaileCandidate;
  
  constructor(private dCandidateService: CandidateService,private router:Router) { }

  ngOnInit() {
    // this.dCandidateService.getCand().subscribe(res => {
    //   // this.cand = res;
    //   this.dCandidateService.manager = res.User;

    // })
    this.getCriteria();
    this.getValueList();
  }

  getValueList() {
    this.dCandidateService.getAllValueList().subscribe((res) => {
      this.dCandidateService.arrValue = res;
    }, (err) => {

    });
  }

  getCriteria() {
    this.dCandidateService.getCriteria().subscribe((res) => {
      console.log(res); console.log("succes");
      this.dCandidateService.criterionsArr = res;
    }, (err) => { console.log(err); alert(err); });

  }
  returnHomePage() {


    Swal.fire({
      title: 'חזרה לדף הבית !',
      text: "האם אתה בטוח שברצונך לחזור לדף הבית?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'כן !',
      
      cancelButtonText: 'ביטול !',
    }).then((result) => {
      if (result.value) {
     
   
        this.router.navigate(['']);
      }
    })
  }
  
  
  

}
