import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { playeurs } from 'src/app/mock/mock';
import { StripeScriptTag } from "stripe-angular";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  lists = playeurs;
  paymentHandler:any = null;
  stripe : any;
  _totalAmount: number;
  card: any;
  cardError: string | undefined | null;

  @ViewChild('cardInfo') cardInfo: ElementRef | any;
  handler: any = null;

  constructor(private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<HomepageComponent>,) {
    this._totalAmount = data['totalAmount'];
  }

  ngOnInit(): void {
    this.sortList();
    this.invokeStripe();    
    //this.loadStripe();
    this.stripe = Stripe('pk_test_51ImKotFySxZUvgN6RoqPFmdhDAhDrj2sStm0sTbdbOpWOaBCtCPiLKAEnZF2EtT2Z4DeCOJh8WO7nSjHqz1bi1pA00qh7ZXnkh')
  }

  sortList (){
    this.lists.sort(function (a, b) {
      return b.score - a.score;
   });
  }

 makePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51ImKotFySxZUvgN6RoqPFmdhDAhDrj2sStm0sTbdbOpWOaBCtCPiLKAEnZF2EtT2Z4DeCOJh8WO7nSjHqz1bi1pA00qh7ZXnkh',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken)
        alert('Stripe token generated!');
      }
    });
  
    paymentHandler.open({
      name: 'Positronx',
      description: '3 widgets',
      amount: amount * 100
    });
  }

  invokeStripe() {
    console.log('hi')
    if(!window.document.getElementById('stripe-script')) {
      console.log('ho')
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51ImKotFySxZUvgN6RoqPFmdhDAhDrj2sStm0sTbdbOpWOaBCtCPiLKAEnZF2EtT2Z4DeCOJh8WO7nSjHqz1bi1pA00qh7ZXnkh',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
            alert('Payment has bhttps://checkout.stripe.com/checkout.jseen successfull!');
          }
        });
      }
        
      window.document.body.appendChild(script);
    }
  } 


}
