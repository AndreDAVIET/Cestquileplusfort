import { Component, OnInit } from '@angular/core';
import { playeurs } from 'src/app/mock/mock';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  lists = playeurs;

  constructor() { }

  ngOnInit(): void {
    this.sortList();
  }

  sortList (){
    this.lists.sort(function (a, b) {
      return b.score - a.score;
   });
  }

}
