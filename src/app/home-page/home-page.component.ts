import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  template:
    '<div class="container"><h2>Navigate to <code>/m/:id</code> to see the messenger</h2></div>',
  styles: [
    `
      .container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
})
export class HomePageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
