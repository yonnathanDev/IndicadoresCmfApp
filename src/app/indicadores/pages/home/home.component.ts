import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  styles: [`
    .container {
      margin-top: 50px;
      margin-bottom: 100px;
    }
`]
})
export class HomeComponent implements OnInit {

  style: string = 'background-color: #0a4275; margin-top: 50px; position: fixed; bottom: 0;width: 100%;';

  constructor() { }

  ngOnInit(): void {
  }

}
