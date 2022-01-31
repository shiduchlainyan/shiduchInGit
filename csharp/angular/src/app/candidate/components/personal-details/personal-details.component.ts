import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DetaileCandidate } from 'src/app/models/detaile-candidate';
import { Parent } from 'src/app/models/parent';
import { Mechutanim } from 'src/app/models/mechutanim';
import { Children } from 'src/app/models/children';
import { CandidateService } from 'src/app/Services/candidate.service';
import { Criterion } from 'src/app/models/criterion';
import { Router } from '@angular/router';
import { ValueListCandidate } from 'src/app/models/value-list-candidate';
import { NgForm } from '@angular/forms';
import { NumberFormatStyle } from '@angular/common';
@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit, OnDestroy {
  firstEnter: number;//לבדיקת תקינות
  selected: string;
  cand: DetaileCandidate;
  numChildren: number;
  numLanguage: number=0;
  numParents: number;
  numMechutanim: number;
  isParent: boolean;
  Islicense: boolean;
  isMechutanim: boolean;
  criteriondescription: Criterion[] = [];
  isChildren: boolean;
  criterionSector: Criterion[] = [];//מכיל קריטריונים השייכים רק לסקטור
  criterionLanguage: Criterion[] = [];//מכיל קריטריונים השייכים רק לשפות
  myValueList = [];//מכיל את רשימת הקרריטריונים שאותו בן אדם בחר בפעם שעברה
  tzValid: boolean;
  today=new Date();
  @ViewChild('frm', { static: true }) public form: NgForm;
  constructor(public dCandidateService: CandidateService, public Router: Router) { }

  f1(ts) {
    console.log(ts);
  }
  GetValueList(id) {//מחזיר את רשימת הערכים של קוד הקריטריון שקיבל כפרמטר

    return this.dCandidateService.GetValueList(id);
  }
  valueListID: number;

  GetIDListById(id) {//מחזיר את הערך שלו ע"פ קוד הערך הקריטריון שקיבל כפרמטר
    let x;
    let item = this.cand.ValueListCandidate.find(p => p.CriteriaId == id);//מגיע לקוד הערך 
    if (item)
      x = item.ValueListId;//מגיע לקוד הערך 
    return x;
  }

  GetValueListById(id) {//מחזיר את הערך ע"פ קוד הערך הקריטריון שקיבל כפרמטר
    let x
    const item = this.cand.ValueListCandidate.find(p => p.CriteriaId == id);//מגיע לקוד הערך 
    x = item.ValueListId
    return this.dCandidateService.arrValue.find(e => e.ValueListId == x).ValueListId;

  }

  init1() {
    this.firstEnter = Number(localStorage.getItem("firstEnter"));
    this.cand = this.dCandidateService.cand;
    this.validTz()
    this.numChildren = this.cand.Children.length;
    this.numParents = this.cand.Parents.length;
    this.numMechutanim = this.cand.Mechutanim.length;
    this.isParent = this.cand.Parents.length != 0;
    this.isMechutanim = this.cand.Mechutanim.length != 0;
    if (this.cand.ValueListCandidate.length != 0) {
      this.numLanguage = this.cand.ValueListCandidate.filter(p => p.CriteriaId == 29 && p.isSelf == true).length;
    }
    this.isChildren = this.cand.Children.length != 0;
    this.dCandidateService.getCriteria().subscribe((res) => {
      this.dCandidateService.criterionsArr = res;
      this.criterionSector = this.dCandidateService.criterionsArr.filter(r => r.category == 1);//מילוי קריטריוני סקטור
      this.criterionLanguage = this.dCandidateService.criterionsArr.filter(r => r.category == 2);//מילוי קריטריוני שפות
    }, (err) => { });


  }

  ngOnInit() {
    this.init1();

    // this.dCandidateService.onLogined.subscribe(() => {
    //   this.init1();
    // })

  }

  addChild() {

    let paar = this.cand.Children.length - this.numChildren;
    if (this.cand.Children.length > this.numChildren)
      this.cand.Children = this.cand.Children.splice(0, this.numChildren);
    else
      for (let i = 0; i < paar * -1; i++)
        this.cand.Children.push(new Children());

  }
  addParent() {
    let par = this.cand.Parents.length - this.numParents;
    if (this.cand.Parents.length > this.numParents)
      this.cand.Parents = this.cand.Parents.splice(0, this.numParents);
    else
      for (let i = 0; i < par * -1; i++)
        this.cand.Parents.push(new Parent());
  }
  addMechutanim() {
    let par = this.cand.Mechutanim.length - this.numMechutanim;
    if (this.cand.Mechutanim.length > this.numMechutanim)
      this.cand.Mechutanim = this.cand.Mechutanim.splice(0, this.numMechutanim);
    else
      for (let i = 0; i < par * -1; i++)
        this.cand.Mechutanim.push(new Mechutanim());
  }


  addLanguage() {

    let paar = this.cand.ValueListCandidate.filter(P => P.CriteriaId == 29 && P.isSelf == true).length - this.numLanguage;
    if (this.cand.ValueListCandidate.filter(P => P.CriteriaId == 29 && P.isSelf == true).length > this.numLanguage)
      this.cand.ValueListCandidate = this.cand.ValueListCandidate.filter(P => P.CriteriaId == 29).splice(0, this.numLanguage);
    else
      for (let i = 0; i < paar * -1; i++) {

        var currntValueList = new ValueListCandidate();

        currntValueList.CriteriaId = 29;
        currntValueList.isSelf = true;
        this.cand.ValueListCandidate.push(currntValueList);
      }
    this.dCandidateService.cand = Object.assign({}, this.cand);;
  }



  saveDetailCandidate() {//שומר את פרטי המועמד
    if (this.cand.User.BornDate)
    this.cand.User.BornDate.setHours(10);
    for (let item of this.cand.Children)
      item.BornDate.setHours(10);
    for (let item of this.cand.Hospitalizations) {
      item.UntilDate.setHours(10);
      item.FromDate.setHours(10);
    }
    this.dCandidateService.saveDetailCandidate(this.cand).subscribe(res => {
    });



  }

  saveAndContinue() {//שומר את פרטי המועמד וממשיך לתאב הבא
    if (this.cand.User.BornDate)
    this.cand.User.BornDate.setHours(10);
    for (let item of this.cand.Children)
      item.BornDate.setHours(10);
    for (let item of this.cand.Hospitalizations) {
      item.UntilDate.setHours(10);
      item.FromDate.setHours(10);
    }
    this.dCandidateService.saveDetailCandidate(this.cand).subscribe(res => {
      alert(res);
    });

    this.Router.navigate(['/detail-candidate/desc']);
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


  f(event) {
    return event.keyCode<48||event.keyCode>57
  }

  ngOnDestroy() {

    this.dCandidateService.forms.person = this.form.valid;

  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  validTz() {
    if (this.cand.User.Tz == null || this.cand.User.Tz == "")
      this.tzValid = true;
    this.tzValid = this.isValidIsraeliID(this.cand.User.Tz);
  }
  isValidIsraeliID(tz1): boolean {
    let id = String(tz1).trim();
    if (id.length > 9 || id.length < 5 || isNaN(Number(id)))
      return false;

    // Pad string with zeros up to 9 digits
    id = id.length < 9 ? ("00000000" + id).slice(-9) : id;

    return Array.from(id, Number)
      .reduce((counter, digit, i) => {
        const step = digit * ((i % 2) + 1);
        return counter + (step > 9 ? step - 9 : step);
      }) % 10 === 0;
  }

}

