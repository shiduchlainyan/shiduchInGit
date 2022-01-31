import { Component, OnInit } from '@angular/core';
import { DetaileCandidate } from 'src/app/models/detaile-candidate';
import { CandidateService } from 'src/app/Services/candidate.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-confidentiality-waiver-form',
  templateUrl: './confidentiality-waiver-form.component.html',
  styleUrls: ['./confidentiality-waiver-form.component.css']
})
export class ConfidentialityWaiverFormComponent implements OnInit {
cand:DetaileCandidate;
today:Date=new Date();
  constructor(private dCandidateService:CandidateService,public bsModalRef: BsModalRef) { }
  ngOnInit() {
    this.cand = this.dCandidateService.cand;
    this.cand.User.FirstName
    this.cand.User.LastName
    this.cand.User.Tz
    this.cand.Candidate.ConfidentialityWaiverForm
    
  }

}
