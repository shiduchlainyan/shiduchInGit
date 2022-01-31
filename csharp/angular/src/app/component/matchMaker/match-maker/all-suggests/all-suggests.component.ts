import { Component, OnInit } from '@angular/core';
import { MatchmakerService } from 'src/app/Services/matchmaker.service';
import { Meeting } from 'src/app/models/meeting';
import { User } from 'src/app/models/user';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DetaileCandidate } from 'src/app/models/detaile-candidate';
import { DetailsComponent } from 'src/app/component/second-candidate/details/details.component';
import { FullNameToSuggest } from 'src/app/models/full-name-to-suggest';

@Component({
  selector: 'app-all-suggests',
  templateUrl: './all-suggests.component.html',
  styleUrls: ['./all-suggests.component.css']
})
export class AllSuggestsComponent implements OnInit {
  AllMeeting: Meeting[];
  filterAllMeeting: Meeting[];
  tzGroom: string;
  tzBride: string;
  bsModalRef: BsModalRef;
  showMe: boolean;
 fullNames:FullNameToSuggest[];
  constructor(private modalService: BsModalService,private MatchmakerService: MatchmakerService) { }

  ngOnInit() {
    this.showMe = false;
  
   this.getAllSuggests();
    
   this. GetNameFromTz();
  }


  show() {
    this.showMe = !this.showMe;
  }



  getAllSuggests() {
    this.MatchmakerService.GetAllSuggest().subscribe(res => {
      this.AllMeeting = res;
      alert(res);
    });
  }
  editMeeting(m) {//שמירת שינויים של פגישה
    this.MatchmakerService.EditMeeting(m).subscribe(res => {
      console.log(res);
    });
  }
  // Details(tz)//מפנה למודל של המראה את פרטי המועמד ע"פ הת.ז.
  // {
  //   let u = new User();;
  //   u.Tz = tz;
  //   this.MatchmakerService.GetDetailsByTz(u).subscribe(res => {
  //     console.log(res);
  //   });
  // }
  onkeyupMethod() {
    this.filterAllMeeting = this.AllMeeting;
    if (this.tzBride != null && this.tzBride != "")
      this.filterAllMeeting = this.filterAllMeeting.filter(p => p.tzBride.indexOf(this.tzBride) != -1);
    if (this.tzGroom != null && this.tzGroom != "")
      this.filterAllMeeting = this.filterAllMeeting.filter(p => p.tzGroom.indexOf(this.tzGroom) != -1);
    return this.filterAllMeeting;

  }

  openModalWithComponent(tz) {//פותח מודל המביא את פרטי המועמד
    let u = new User();;
    u.Tz = tz;
    this.MatchmakerService.GetDetailsByTz(u).subscribe(res => {
      console.log(res);
      const initialState = {
        cand: res,
      };
      this.bsModalRef = this.modalService.show(DetailsComponent, { initialState });
      
    });
   
  }
  GetNameFromTz(){

   this.MatchmakerService.GetNameFromTz().subscribe((res:FullNameToSuggest[])=> {
      this.fullNames= res;
      console.log(this.fullNames)
    }
      );

  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

}
