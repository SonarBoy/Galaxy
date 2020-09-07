import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shell-sort',
  templateUrl: './shell-sort.component.html',
  styleUrls: ['./shell-sort.component.css']
})
export class ShellSortComponent implements OnInit {

  private number;

  constructor() { }

  ngOnInit() {
    this.number = 0;
  }

  public increase(){
    this.number++;
    alert(this.number);
  }

  public decrease(){
    this.number--;
    alert(this.number);
  }

}
