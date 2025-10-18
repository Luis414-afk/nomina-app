import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { ICalendarComponentOptions, CalendarComponent, ICalendarModalOptions } from '@heliomarpm/ion-calendar';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-selector-fechas',
  templateUrl: './selector-fechas.component.html',
  styleUrls: ['./selector-fechas.component.scss'],
})
export class SelectorFechasComponent implements OnInit {
  @ViewChild('calendar') calendar: CalendarComponent;
  @Input() selectedDates: string[]  = [];

  selectedValue: string[] | null = null;
  date: string | null = null; 
  today: Date = new Date();
  type: 'string';
  // Fechas límites
  inicial: Date;
  final: Date;

  optionsMulti: ICalendarModalOptions;
  currentOptions: ICalendarComponentOptions;

  constructor(private popoverController: PopoverController) {
    const anio = this.today.getFullYear();
    const mes = this.today.getMonth();
    const dia = this.today.getDate();

    // Límite: hoy hasta 6 meses después
    this.inicial = new Date(anio, mes, dia);
    this.final = new Date(anio, mes + 6, dia);

    this.optionsMulti = {
      from: this.inicial,
      to: this.final,
      defaultDate: this.today,
      defaultScrollTo: this.today,
      color: 'success',
      pickMode: 'single', // ✅ Permitir selección múltiple
      canBackwardsSelected: false,
      weekdays: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      weekStart: 1,
    };

    this.currentOptions = this.optionsMulti;
  }

  ngOnInit() {
    this.date = this.selectedDates ? this.selectedDates[0] : null;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.currentOptions = this.optionsMulti;
      this.calendar.options = this.currentOptions;
      this.calendar.showMonthPicker = false;
    });
  }

  // ✅ Recoge varias fechas seleccionadas
  onDateChange(event: any) {
    console.log(event)
    this.selectedValue = event || [];
  }

  confirmSelection() {
    this.popoverController.dismiss({ data: this.selectedValue });
  }

  dismiss() {
    this.popoverController.dismiss();
  }
}
