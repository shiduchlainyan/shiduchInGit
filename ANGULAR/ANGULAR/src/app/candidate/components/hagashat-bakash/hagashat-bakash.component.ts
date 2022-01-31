import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfidentialityWaiverFormComponent } from '../confidentiality-waiver-form/confidentiality-waiver-form.component';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
import { CandidateService } from 'src/app/Services/candidate.service';
import { DetaileCandidate } from 'src/app/models/detaile-candidate';
import { Router } from '@angular/router';
declare let paypal: any;
@Component({
  selector: 'app-hagashat-bakash',
  templateUrl: './hagashat-bakash.component.html',
  styleUrls: ['./hagashat-bakash.component.css']
})
export class HagashatBakashComponent implements OnInit {
  payPalConfig;
  bsModalRef: BsModalRef;
  cand: DetaileCandidate;
  @ViewChild('frm', { static: true }) public form: NgForm;
  constructor(private modalService: BsModalService, private dCandidateService: CandidateService, private router: Router) { }

  ngOnInit() {

    this.cand = this.dCandidateService.cand;
    this.cand.Candidate.ConfidentialityWaiverForm
    this.cand.Candidate.payPal
    this.fillPaypal();
    setTimeout(() => {
      paypal.Button.render(this.payPalConfig, '#paypal-checkout-btn');
    }, 200);
  }

  // ==============paypal==============================
  fillPaypal() {

    this.payPalConfig = {
      env: 'sandbox',
      client: { sandbox: 'AUhGBeSLmePlSi5Wygi0ztTopiCj8pUsGoIzwsg4wkLWTvlQTBxd7ybkqnobI1s-TnXwl8M52DbWDfXz' },
      commit: true,
      payment: (data, actions) => {
        return actions.payment.create({
          payment: {
            transactions: [
              { amount: { total: 80, currency: 'ILS' } }
            ]

          }
        });
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onAuthorize: (data, actions) => {

        return actions.payment.execute().then((payment) => {//לכאן הוא מגיע כאשר הכן נסלק הכסף
          console.log(payment)
          this.cand.Candidate.payPal = true;
          /// this.pay( data, payment);
        });
      }
    };
  }


  pay(data = {}, details = {}) {
    //this.global.showProgress();
    var transaction = details['transactions'][0];
    if (transaction == null) {
      // this.global.alert.error("תקלה")
      return;
    }
    var p = {
      id: 0,//payment id
      rentId: 0,// who payed
      price: 80,//price
      orderId: data['orderID'],
      payerId: data['payerID'],
      payPalId: transaction.related_resources[0].sale.id,
      firstName: details['payer'] == null ? null : details['payer'].payer_info.first_name,
      lastName: details['payer'] == null ? null : details['payer'].payer_info.last_name,
      currency: transaction.amount.currency,
    }
  }


  //===================modal=================
  confidentialityWaiverForm() {//חתימה על טופס ויתור סודיות
    this.bsModalRef = this.modalService.show(ConfidentialityWaiverFormComponent);
  }
  //===============hagasha==========================================
  hagashatBakasha() {// c sharp פונקצית הגשת בקשה  שליחת מייל לשדכן לקביעת פגישה וכן שמירת פרטיו ב
    if (this.cand.User.BornDate)
    this.cand.User.BornDate.setHours(10);
    for (let item of this.cand.Children)
      item.BornDate.setHours(10);
    for (let item of this.cand.Hospitalizations) {
      item.UntilDate.setHours(10);
      item.FromDate.setHours(10);
    }
    localStorage.setItem("firstEnter", "2");
    this.dCandidateService.hagashatBakasha(this.cand).subscribe(res => {
      Swal.fire({
        type: 'success',
        title: 'נכנסת בהצלחה למערכת',
        text: 'בקרוב השדכן יצור איתך קשר לצורך המשך התהליך',
        showConfirmButton: false,
        timer: 3500
      })
      setTimeout(function(){this.router.navigate['']},3500)
    });
  }



  submitAll() {
    //if(!this.cand.Candidate.payPal||!this.cand.Candidate.ConfidentialityWaiverForm||this.cand.Candidate.ConfidentialityWaiverForm=="")
    // return;
    this.dCandidateService.forms.hagasha = this.form.valid;
    for (var field in this.dCandidateService.forms) {
      var valid = this.dCandidateService.forms[field];
      if (!valid) {
        Swal.fire({
          type: 'error',
          title: '...הטופס אינו תקין ',
          text: '! OK לתיקון הטופס לחץ על',
          footer: '      '
        })
        switch (field) {
          case 'person':
            this.router.navigate(['/detail-candidate/pro']);
            return false;
          default:
            return false;
        }
      }
    
    }
    if (this.dCandidateService.allowAcceess == 1)
      this.hagashatBakasha();
      return true
  }



  finishByMatcMaker() {
    if (this.cand.User.BornDate)
    this.cand.User.BornDate.setHours(10);
    for (let item of this.cand.Children)
      item.BornDate.setHours(10);
    for (let item of this.cand.Hospitalizations) {
      item.UntilDate.setHours(10);
      item.FromDate.setHours(10);
    }
    if (this.submitAll() != false) {
      this.dCandidateService.finishCompliteDetails(this.cand).subscribe(res => {
        let userId = this.dCandidateService.manager.UserId ? this.dCandidateService.manager.UserId : 89;
        localStorage.setItem("userId", userId.toString());
        this.router.navigate(['/MatcMaker']);
      });

    }

  }

  f(p) { console.log(p) }

}
