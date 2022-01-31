import { Component, OnInit } from '@angular/core';
import { NgxPayPalModule } from 'ngx-paypal';
import {
  IPayPalConfig,
  ICreateOrderRequest
} from 'ngx-paypal';
@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  constructor() { }

  ngOnInit() {
    this.initConfig();
  }
  private initConfig(): void {

    this.payPalConfig = {
      currency: 'ILS',
      clientId: 'AUhGBeSLmePlSi5Wygi0ztTopiCj8pUsGoIzwsg4wkLWTvlQTBxd7ybkqnobI1s-TnXwl8M52DbWDfXz',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
       
        purchase_units: [{
          amount: {
            currency_code: 'ILS',
            value: '9.99',
          },
        }]
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        // this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        // this.showCancel = true;

      },
      onError: err => {
        console.log('OnError', err);
        // this.showError = true;
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        // this.resetStatus();
      },
    };







  }
}
