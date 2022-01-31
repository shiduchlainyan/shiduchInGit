import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stiky-top',
  templateUrl: './stiky-top.component.html',
  styleUrls: ['./stiky-top.component.css']
})
export class StikyTopComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  returnHomePage(){
    
    this.router.navigate(['']);
  }
}
