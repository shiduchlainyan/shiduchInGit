
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import { ICreateOrderRequest } from 'ngx-paypal';
declare let paypal: any;


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  payPalConfig;
  constructor(private router: Router) { }

  ngOnInit() {
    // this.initAutocomplete();
    // this.fillPaypal();
    // setTimeout(() => {
    //   paypal.Button.render(this.payPalConfig, '#paypal-checkout-btn');
    // }, 2000);
  //  this.initConfig();
  }

  // private initConfig(): void {
  //   this.payPalConfig = {
  //       currency: 'EUR',
  //       clientId: 'AUhGBeSLmePlSi5Wygi0ztTopiCj8pUsGoIzwsg4wkLWTvlQTBxd7ybkqnobI1s-TnXwl8M52DbWDfXz',
  //       env:'sandbox',
  //       createOrder: (data) => < ICreateOrderRequest > {
  //           intent: 'CAPTURE',
  //           purchase_units: [{
  //               amount: {
  //                   currency_code: 'ILS',
  //                   value: '9.99',
  //                   breakdown: {
  //                       item_total: {
  //                           currency_code: 'ILS',
  //                           value: '9.99'
  //                       }
  //                   }
  //               },
  //               items: [{
  //                   name: 'Enterprise Subscription',
  //                   quantity: '1',
  //                   category: 'DIGITAL_GOODS',
  //                   unit_amount: {
  //                       currency_code: 'ILS',
  //                       value: '9.99',
  //                   },
  //               }]
  //           }]
  //       },
  //       advanced: {
  //           commit: 'true'
  //       },
  //       style: {
  //           label: 'paypal',
  //           layout: 'vertical'
  //       },
  //       onApprove: (data, actions) => {
  //           // console.log('onApprove - transaction was approved, but not authorized', data, actions);
  //           // actions.order.get().then(details => {
  //           //     console.log('onApprove - you can get full order details inside onApprove: ', details);
  //           // });

  //           actions.payment.execute().then((payment) => {
  //             console.log(payment)
  //             this.pay( data, payment);
  //           });

  //       },
  //       onClientAuthorization: (data) => {
  //           console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            
  //       },
  //       onCancel: (data, actions) => {
  //           console.log('OnCancel', data, actions);
         

  //       },
  //       onError: err => {
  //           console.log('OnError', err);
          
  //       },
  //       onClick: (data, actions) => {
  //           console.log('onClick', data, actions);
          
  //       },
  //   };
  // }

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
       
        return actions.payment.execute().then((payment) => {
          console.log(payment)
          this.pay( data, payment);
        });
      }
    };
  }

  
   pay( data = {}, details = {}) {
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
    // שמירה לשרת

    // var res = <AjaxResult>await this.http.post('/api/rents/SavePayment',
    //   this.global.appendData(p)).toPromise()
    //   .catch((err) => {
    //     return this.global.httpError(err);
    //   });
    // this.global.hideProgress();
    // if (res.success) {
    //   this.global.alert.success(res.value);
    //   this.payment.isPayed = true;
    // }
    // else
    //   this.global.alert.error(this.global.getErrorMsg(res.value))

  }
  
  enter(){
    localStorage.clear();

    this.router.navigate(['/enter']);
  }
  register(){
    localStorage.clear();

    this.router.navigate(['/register']);
  }

  calander(){
    this.router.navigate(['/calander']);
  }
  matcMacker(){
    this.router.navigate(['/MatcMaker']);
  }
  paypal(){
    this.router.navigate(['/paypal']);
  }
  aboutProject(){
    this.router.navigate(['/aboutProject']);
  }
  stikytop(){
    this.router.navigate(['/stikyTop']);
  }

 //===========================
 // This sample uses the Autocomplete widget to help the user select a
// place, then it retrieves the address components associated with that
// place, and then it populates the form fields with those details.
// This sample requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

//  placeSearch;
//   autocomplete;

//  componentForm = {
//   street_number: 'short_name',
//   route: 'long_name',
//   locality: 'long_name',
//   administrative_area_level_1: 'short_name',
//   country: 'long_name',
//   postal_code: 'short_name'
// };

//  initAutocomplete() {
//   // Create the autocomplete object, restricting the search predictions to
//   // geographical location types.
//   // this.autocomplete = new google.maps.places.Autocomplete(
//   //     document.getElementById('autocomplete'), {types: ['geocode']});

//   // Avoid paying for data that you don't need by restricting the set of
//   // place fields that are returned to just the address components.
//   this.autocomplete.setFields(['address_component']);

//   // When the user selects an address from the drop-down, populate the
//   // address fields in the form.
//   this.autocomplete.addListener('place_changed',()=>{
//     var place = this.autocomplete.getPlace();

//     // for (var component in this.componentForm) {
//     //   document.getElementById(component)['value'] = '';
//     //   document.getElementById(component)['disabled'] = false;
//     // }
  
//     // Get each component of the address from the place details,
//     // and then fill-in the corresponding field on the form.
//     // for (var i = 0; i < place.address_components.length; i++) {
//     //   var addressType = place.address_components[i].types[0];
//     //   if (this.componentForm[addressType]) {
//     //     var val = place.address_components[i][this.componentForm[addressType]];
//     //     document.getElementById(addressType)['value'] = val;
//     //   }
//     // }
//   } );
// }

 fillInAddress() {
  // Get the place details from the autocomplete object.
  
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
//  geolocate() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var geolocation = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       };
//       var circle = new google.maps.Circle(
//           {center: geolocation, radius: position.coords.accuracy});
//       this.autocomplete.setBounds(circle.getBounds());
//     });
//   }
// }
  
}
