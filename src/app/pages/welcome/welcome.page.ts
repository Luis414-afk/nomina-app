import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { register } from 'swiper/element';
import Swiper from 'swiper';

register();

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  @ViewChild("swiper") swiper?: ElementRef<{ swiper: Swiper }>;
  show:boolean = false;
  index: number = 0;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
  };
  isEnd: boolean = true;
  items: number[] = [0, 1, 2];

  constructor(public util: UtilService) { }

  ngOnInit() {
    // Inicializa los botones aquí si es necesario
  }

  ionViewDidEnter() {
    // Habilita los botones cada vez que la vista es presentada
    this.evaluarBotones();
    setTimeout(() => {
      this.show =true;
    }, 1000);
    
  }


  slideChanged(event: any) {
    this.index = this.swiper?.nativeElement.swiper.activeIndex || 0; // Usar activeIndex directamente
    this.evaluarBotones();
  }

  nextSlide() {
    this.swiper?.nativeElement.swiper.slideNext();
  }

  onAuth() {
    this.util.navigateToPage('/login');
  }

  evaluarBotones() {
    // Habilitar o deshabilitar botones según el índice actual
    this.isEnd = this.index != (this.items.length-1); // Verifica si es el último slide
  }
}
