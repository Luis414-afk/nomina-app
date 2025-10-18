/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : E-Learning-1 This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    public util: UtilService
  ) { }

  ngOnInit() {
  }

  onPage(name: any) {
    this.util.navigateToPage(name);
  }


  onImageError(event: any) {
    event.target.src = '/assets/user.png';
  }

  
}
