import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  template: `
    <nz-layout>
      <app-header></app-header>
    </nz-layout>
    <nz-layout class="main-container">
      <app-sider></app-sider>
      <app-content></app-content>
    </nz-layout>
  `,
  styles: [
    `
      .main-container{
        right: 0;
        bottom: 0;
        left: 0;
        height: auto;
        position: absolute;
        top: 128px;
        display: flex;
        flex-direction: row;
      }

      @media (min-width: 768px) {
        .main-container{
          top: 64px;
        }
      }

      app-sider{
      }

      app-content{
        overflow: scroll;
        width: 100%;
      }


      .loader {
        margin: 50px auto 0;
        border: 16px solid #f3f3f3;
        border-top: 16px solid #3498db;
        border-radius: 50%;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
      }
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

    `
  ]
})
export class AppContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
