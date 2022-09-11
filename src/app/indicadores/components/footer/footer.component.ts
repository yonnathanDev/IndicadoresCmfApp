import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() style!: string;

  color: string = 'background-color: rgba(0, 0, 0, 0.2);';

  constructor() { }

  ngOnInit(): void {
  }

}
