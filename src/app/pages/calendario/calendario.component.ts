import { Component, ViewChild,OnInit,ElementRef, AfterViewInit } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { CalendarMode, QueryMode, Step } from 'ionic2-calendar';
import { UtilService } from 'src/app/services/util.service';
import { PopoverController } from '@ionic/angular';
import { DetallePopoverComponent } from './detalle-popover/detalle-popover.component'
export interface Calendariointerface {
  mode: string;
  currentDate: Date;
  step: number;
}

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
})
export class CalendarioComponent implements OnInit, AfterViewInit{
  @ViewChild(CalendarComponent) myCalendar!: CalendarComponent;
  modal_filtro?: HTMLIonModalElement;
 

  constructor( public util: UtilService,private popoverController: PopoverController) {
    this.isToday = false;
  }


  randomNameList = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Eve',
    'Frank',
    'Grace',
    'Hank',
    'Ivy',
    'Jack',
    'Karen',
    'Liam',
    'Max',
    'Nina',
    'Olivia',
    'Paul',
    'Quincy',
    'Rita',
    'Sara',
    'Tina',
  ];

  eventSource: any = [];
  viewTitle: any;

  isToday: boolean;
  calendar = {
    mode: 'month' as CalendarMode,
    queryMode: 'local' as QueryMode,
    step: 30 as Step,
    currentDate: new Date(),
    dateFormatter: {
      formatMonthViewDay: function (date: Date) {
        return date.getDate().toString();
      },
      formatMonthViewDayHeader: function (date: Date) {
        const options: any = { weekday: 'short' };
        return new Intl.DateTimeFormat('es-ES', options).format(date);
      },
      formatMonthViewTitle: function (date: Date) {
        const options: any = { year: 'numeric', month: 'long' };
        return new Intl.DateTimeFormat('es-ES', options).format(date);
      },
      formatWeekViewDayHeader: function (date: Date) {
        const options: any = { weekday: 'short' };
        return new Intl.DateTimeFormat('es-ES', options).format(date);
      },
      formatWeekViewTitle: function (date: Date) {
        const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('es-ES', options).format(date);
      },
      formatWeekViewHourColumn: function (date: Date) {
        return new Intl.DateTimeFormat('es-ES', { hour: 'numeric', minute: 'numeric', hour12: false }).format(date);
      },
      formatDayViewHourColumn: function (date: Date) {
        return new Intl.DateTimeFormat('es-ES', { hour: 'numeric', minute: 'numeric', hour12: false }).format(date);
      },
      formatDayViewTitle: function (date: Date) {
        const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('es-ES', options).format(date);
      },
    },
    formatDay: "'Día' dd",
    formatDayHeader: "'Día' EEE",
    formatDayTitle: "'Día' d MMMM yyyy",
    formatWeekTitle: "'Semana' w",
    formatWeekViewDayHeader: "'Día' EEE d",
    formatHourColumn: "'hr' ha",
    showEventDetail: false,
    startingDayMonth: 2,
    startingDayWeek: 2,
    allDayLabel: 'Todo el día',
    noEventsLabel: 'Sin eventos',
    timeInterval: 15,
    autoSelect: false,
    locale: 'es-ES',
    dir: 'ltr',
    scrollToHour: 11,
    preserveScrollPosition: false,
    lockSwipes: false,
    startHour: 3,
    endHour: 16,
    sliderOptions: {
      spaceBetween: 10,
     
    },
    dayviewCategorySource: new Set(this.randomNameList),
    dayviewShowCategoryView: true,
  };

  loadEvents() {
    this.eventSource = this.desabilitarFINsemana();

  

  }


  onPage(name: any) {
    this.util.navigateToPage(name);
  }


  onPageSolicitudVacaciones(name: any) {
    this.util.navigateToPage(name);
  }

  onPageSolicitudPermiso(name: any) {
    this.util.navigateToPage(name);
  }

  ngAfterViewInit() {
        this.myCalendar.lockSwipes = true;
        this.myCalendar.allDayLabel = 'Todo el día';
        this.myCalendar.noEventsLabel = 'Sin eventos';
        this.myCalendar.formatWeekTitle = "MMMM, 'Semana' w ";
  }


  onViewTitleChanged(title: string) {
    this.viewTitle = title;
    console.log('view title changed: ' + title + ', this.viewTitle: ' + this.viewTitle);
  }

  onEventSelected(event: any) {
    console.log(
      'Event selected:' +
      event.startTime +
      '-' +
      event.endTime +
      ',' +
      event.title +
      ',' +
      event.categoryId
    );

    this.openDetailPopover();
  }

  changeMode(mode: any) {
    this.calendar.mode = mode;
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev: any) {
    console.log(
      'Selected time: ' +
      ev.selectedTime +
      ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) +
      ', disabled: ' +
      ev.disabled +
      ', categoryId: ' +
      ev.category?.categoryId +
      ', categoryName: ' +
      ev.category?.categoryName
    );
  }

  onCurrentDateChanged(ev: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    ev.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === ev.getTime();
    console.log('Currently viewed date: ' + ev);
  }

  

  onRangeChanged(ev: any) {
    console.log(
      'range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime
    );
    //this.eventSource = this.createRandomEvents();
  }

  onDayHeaderSelected = (ev: {
    selectedTime: Date;
    events: any[];
    disabled: boolean;
  }) => {
    console.log(
      'Selected day: ' +
      ev.selectedTime +
      ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) +
      ', disabled: ' +
      ev.disabled
    );
  };

  markDisabled = (date: Date) => {
    const current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };


  goToPreviousDate() {
    const newDate = new Date(this.calendar.currentDate);

    
  if (this.calendar.mode === "week") {
    // Restar 7 días a la fecha actual para ir a la semana anterior
    newDate.setDate(newDate.getDate() - 7);
    this.calendar.currentDate = newDate;
  } else {
    // Cambiar al mes anterior en modo de vista de mes
    newDate.setMonth(newDate.getMonth() - 1);
    this.calendar.currentDate = newDate;
  }

 
   // this.myCalendar.loadEvents(); // Re-cargar eventos si es necesario
  }

  goToNextDate() {
    const newDate = new Date(this.calendar.currentDate);
    if (this.calendar.mode === "week") {
      // Restar 7 días a la fecha actual para ir a la semana anterior
      newDate.setDate(newDate.getDate() + 7);
      this.calendar.currentDate = newDate;
    } else {
      // Cambiar al mes anterior en modo de vista de mes
      newDate.setMonth(newDate.getMonth() + 1);
      this.calendar.currentDate = newDate;
    }
  }

  
  ngOnInit() {
    this.loadEvents();
  }

  onBack() {
    this.util.onBack();
  }



  /* GENERAMOS EVENTOS  */

  desabilitarFINsemana() {
    const events = [];
    const currentDate = new Date();
  
    // Establecer el rango de fechas desde el año pasado hasta cinco años en el futuro
    const startYear = currentDate.getFullYear() - 1;
    const endYear = currentDate.getFullYear() + 5;
  
    for (let year = startYear; year <= endYear; year++) {
      for (let month = 0; month < 12; month++) {
        // Obtener el número de días en el mes actual
        const daysInMonth = new Date(year, month + 1, 0).getDate();
  
        for (let day = 1; day <= daysInMonth; day++) {
          const eventDate = new Date(year, month, day);
  
          // Omitir sábados (6) y domingos (0)
          if (eventDate.getDay() === 0 || eventDate.getDay() === 6) {
            continue;
          }
  
          // Definir el horario del evento de 9 AM a 5 PM
          const startTime = new Date(
            eventDate.getFullYear(),
            eventDate.getMonth(),
            eventDate.getDate(),
            9, // Hora de inicio
            0
          );
  
          const endTime = new Date(
            eventDate.getFullYear(),
            eventDate.getMonth(),
            eventDate.getDate(),
            18, // Hora de fin
            0
          );
  
          events.push({
            title: 'Jornada Laboral',
            startTime: startTime,
            endTime: endTime,
            allDay: false,
            color: 'grey'
          });
        }
      }
    }
  
    return events;
  }
  


  async openDetailPopover() {
   
    
    const popover = await this.popoverController.create({
      component: DetallePopoverComponent,
      alignment: 'center', // Centra el popover
      cssClass: 'full-screen-popover',
      componentProps: {
        //details: object // ✅ Pasamos como "details" para accederlo en el popover
      }
    });

    //console.log(object)
  
    return await popover.present();
  }

}
