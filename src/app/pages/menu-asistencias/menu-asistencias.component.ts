import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';


@Component({
  selector: 'app-menu-asistencias',
  templateUrl: './menu-asistencias.component.html',
  styleUrls: ['./menu-asistencias.component.scss'],
})
export class MenuAsistenciasComponent  implements OnInit {
  coursesList: any[] = [];
  selected: any = 'completed';
  constructor(
    public util: UtilService,

  ) {
    
  }

  ngOnInit() {}


  onBack() {
    this.util.onBack();
  }


  onPage(name: any) {
    this.util.navigateToPage(name);
  }
  changeSelected(name: any) {
    this.selected = name;
  }

}
