import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('lineChart', { static: false }) lineChart?: ElementRef;
  @ViewChild('scatter', { static: false }) scatter?: ElementRef;

  bars: any;
  primaryColor: string;
  secondaryColor: string;

  constructor(private iab: InAppBrowser) { 
    Chart.register(...registerables);
    this.primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-primary');
    this.secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-secondary');
  }

  ngOnInit() {}

  ngAfterViewInit() {
    // Initialize the chart after the view has been fully initialized
    setTimeout(() => {
      this.createLineChart();
    });
  }

  createLineChart() {
    if (!this.lineChart || this.bars) {
      return;
    }

    const ctx = this.lineChart.nativeElement.getContext('2d');
    
    // Configuración de los datos y opciones del gráfico
    const data = {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: '# Total: $',
        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 60)),
        backgroundColor: 'rgba(61, 194, 255, 0.2)',
        borderColor: this.primaryColor,
        borderWidth: 2,
        fill: true,
        pointStyle: 'circle',
        pointRadius: 10,
        pointBackgroundColor: '#fff',
        tension: 0.3
      }]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          enabled: true
        },
        filler: {
          propagate: false
        },
        title: {
          display: true,
          text: (ctx:any) => 'Grafica de Pagos' 
        },
        legend: {
          display: false
        },
      },
      interaction: {
        intersect: false
      },
      scales: {
        y: {
          display: false
        },
        x: {
          display: true,
          ticks: {
            color: this.secondaryColor
          }
        }
      }
    };

    const config:any = {
      type: 'line',
      data: data,
      options: options
    };

    // Crear el gráfico
    this.bars = new Chart(ctx, config);
  }
}
