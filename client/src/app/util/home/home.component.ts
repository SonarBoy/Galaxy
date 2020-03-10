import { Component, OnInit } from '@angular/core';
import anime from 'animejs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    

  }

  ngAfterViewInit(){

  }

  animation = anime({
    targets: '.play-pause-demo .el',
    translateX: 270,
    delay: function(el, i) { return i * 100; },
    direction: 'alternate',
    loop: true,
    autoplay: false,
    easing: 'easeInOutSine'
  });

  public breaker(){
    anime({
      targets: '#cssSelector .el',
      translateX: 250,
      duration: 3000
    });
  }

}
