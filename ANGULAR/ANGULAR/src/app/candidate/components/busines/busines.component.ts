import { Component, OnInit, OnDestroy } from '@angular/core';
import { CandidateService } from 'src/app/Services/candidate.service';
import { DetaileCandidate } from 'src/app/models/detaile-candidate';
import { ValueList } from 'src/app/models/value-list';
import { ValueListCandidate } from 'src/app/models/value-list-candidate';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busines',
  templateUrl: './busines.component.html',
  styleUrls: ['./busines.component.css']
})
export class BusinesComponent implements OnInit, OnDestroy {

  cand: DetaileCandidate;
  valueListID: number;
  numOccupation: number;

  constructor(public dCandidateService: CandidateService, public Router: Router) { }

  ngOnInit() {
    this.cand = this.dCandidateService.cand;
    this.numOccupation=this.cand.ValueListCandidate.filter(p=>p.CriteriaId==30).length;
  }
  ngOnDestroy() {
  }

  addOccupation() {

    let paar = this.cand.ValueListCandidate.filter(P => P.CriteriaId == 30).length - this.numOccupation;
    if (this.cand.ValueListCandidate.filter(P => P.CriteriaId == 30).length > this.numOccupation)
      //this.cand.ValueListCandidate = this.cand.ValueListCandidate.filter(P => P.CriteriaId == 30).splice(0, this.numOccupation);
      while(this.cand.ValueListCandidate.filter(P => P.CriteriaId == 30 && P.isSelf == true).length > this.numOccupation)
      {
        this.cand.ValueListCandidate = this.cand.ValueListCandidate.filter(p =>p!= this.cand.ValueListCandidate.find(o=>o.CriteriaId == 30 && o.isSelf == true) )
      }
    else
      for (let i = 0; i < paar * -1; i++) {

        var currntValueList = new ValueListCandidate();

        currntValueList.CriteriaId = 30;
        currntValueList.isSelf = true;
        this.cand.ValueListCandidate.push(currntValueList);
      }
  }
  getCritMoreOccupation() {
    return this.cand.ValueListCandidate.filter(p => p.CriteriaId == 30);
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

    //setActivePage('products')
    // this.router.navigate(['desc'], {relativeTo: this.activatedRoute});
    this.Router.navigate(['/detail-candidate/moreDetailes']);
  }
  //id=idשל רשימת ערכים
  //crit=לקריטריון הנוכחי
  //ברגע שמשנה ערך של קריטריון
  changeValue(crit: number, id: any) {
    if (this.cand.ValueListCandidate.find(p => p.CriteriaId == crit) == null) {
      var currntValueList = new ValueListCandidate();
      currntValueList.ValueListId = id;//id.currentTarget.value;
      currntValueList.CriteriaId = crit;
      currntValueList.isSelf = true;
      this.cand.ValueListCandidate.push(currntValueList);
    }
    else {
      this.cand.ValueListCandidate.find(p => p.CriteriaId == crit).ValueListId = id;//.currentTarget.value;
    }
  }
  f(DegreeKind) {
    console.log(DegreeKind);
  }
}
