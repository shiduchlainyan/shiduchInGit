import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ValueListCandidate } from 'src/app/models/value-list-candidate';
import { CandidateService } from 'src/app/Services/candidate.service';
import { DetaileCandidate } from 'src/app/models/detaile-candidate';
import { Criterion } from 'src/app/models/criterion';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-criterion',
  templateUrl: './criterion.component.html',
  styleUrls: ['./criterion.component.css']
})
export class CriterionComponent implements OnInit, OnDestroy {

  selectedCrit: number;
  criterionsArrNotInteresting: Criterion[] = []//מכיל רק את רשימת הקריטריונים של לא מעונין
  criterionsArrInteresting: Criterion[] = []//מכיל את רשימת הקריטריונים למעונין
  cand: DetaileCandidate;

  @ViewChild('frm', { static: true }) public form: NgForm;
  constructor(private dCandidateService: CandidateService, public router: Router) { }

  ngOnInit() {
    this.init1();
    // this.dCandidateService.onLogined.subscribe(res => {
    //   this.init1();

    // })
  }
  ngOnDestroy() {
  }
  getCriteria() {
    this.dCandidateService.getCriteria().subscribe((res) => {

      this.dCandidateService.criterionsArr = res;
    }, (err) => { });

  }


  init1() {
    this.cand = this.dCandidateService.cand;
    this.dCandidateService.getCriteria().subscribe((res) => {
      this.dCandidateService.criterionsArr = res;
      this.criterionsArrNotInteresting = this.dCandidateService.criterionsArr.filter(p => p.Interested == 2 || p.Interested == 3 || p.Interested == 5);
      this.criterionsArrInteresting = this.dCandidateService.criterionsArr.filter(p => p.Interested == 1 || p.Interested == 2 || p.Interested == 5);
      this.cand.ValueListCandidate.filter(l => l.isSelf == false).forEach(o => this.interested(this.dCandidateService.criterionsArr.find(p => p.CriterionId == o.CriteriaId)));

    }, (err) => { });
  }

  //(ברגע שבחר קריטריון נוסף(עדיין לא בחר לו ערך
  addCriteronList(toInclude: number) {
    //debugger
    let newVal = new ValueListCandidate();
    newVal.CriteriaId = +this.selectedCrit;
    newVal.isSelf = false;
    newVal.isInclude = toInclude == 1 ? true : false;
    this.cand.ValueListCandidate.push(newVal);

    let removeCrit = this.dCandidateService.criterionsArr.find(p => p.CriterionId == this.selectedCrit);
    this.interested(removeCrit);
  }
  interested(removeCrit: Criterion) {//משנה את מערכי המעונין/לא מעונין ברשימת הקריטריונים
    if (!removeCrit.multipleChoice) {
      if (removeCrit.Interested == 2 || removeCrit.Interested == 3 || removeCrit.Interested == 5)
        this.criterionsArrNotInteresting.splice(this.criterionsArrNotInteresting.indexOf(removeCrit), 1);
      if (removeCrit.Interested == 1 || removeCrit.Interested == 2 || removeCrit.Interested == 5)
        this.criterionsArrInteresting.splice(this.criterionsArrInteresting.indexOf(removeCrit), 1);

    }
  }


  getKindCriterion(id: number) {
    let kindID = null;
    let found = this.dCandidateService.criterionsArr
      .find(p => p.CriterionId == id);
    if (found) {
      kindID = found.KindCriterion;
    }
    return kindID;
  }

  getCriterionName(id) {
    let name = "";
    let found = this.dCandidateService.criterionsArr.find(p => p.CriterionId == +id);
    if (found) {
      name = found.NameCriterion;
    }
    return name;
  }



  saveDetailCandidate() {//שומר את פרטי המועמד

    this.dCandidateService.saveDetailCandidate(this.cand).subscribe(res => {
      alert(res);
    });


  }

  saveAndContinue() {//שומר את פרטי המועמד וממשיך לתאב הבא
    this.dCandidateService.saveDetailCandidate(this.cand).subscribe(res => {
      alert(res);
    });
    this.router.navigate(['/detail-candidate/hagasha']);
  }





  removeCrit(item: ValueListCandidate) {
    this.cand.ValueListCandidate = this.cand.ValueListCandidate.filter(p => p.ValueListCandidateId != item.ValueListCandidateId||item.ValueListCandidateId==null&&!(p.CriteriaId==item.CriteriaId&&p.isSelf==false));
    
  }


}