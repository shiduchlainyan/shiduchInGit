import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/Services/candidate.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-second-candidate',
  templateUrl: './second-candidate.component.html',
  styleUrls: ['./second-candidate.component.css']
})
export class SecondCandidateComponent implements OnInit {

  constructor(private dCandidateService: CandidateService, private router: Router) { }

  ngOnInit() {
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


