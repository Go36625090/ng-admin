import {Component, OnInit} from '@angular/core';
import {ThemeService} from "../../service/theme.service";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private themeService: ThemeService,
              private userService: UserService) { }

  ngOnInit(): void {
  }
  logout(){
    this.userService.logout();
  }

  switchLanguage(id: string){
  }


  toggleTheme(): void {
    this.themeService.toggleTheme().then();
  }


}
