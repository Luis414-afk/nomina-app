import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-mi-dashboard',
  templateUrl: './mi-dashboard.component.html',
  styleUrls: ['./mi-dashboard.component.scss'],
})
export class MiDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('lineChart', { static: false }) lineChart?: ElementRef;

  private chartInstance: any;
  private colors = {
    verde: 'rgba(75, 192, 192, 1)',      // verde brillante
    rojo: 'rgba(255, 99, 132, 1)',       // rojo profesional
    amarillo: 'rgba(255, 206, 86, 1)',   // amarillo tipo Chart.js
  };
  

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.initializeChart();
  }

  private initializeChart() {
    if (!this.lineChart) return;

    const ctx = this.lineChart.nativeElement.getContext('2d');
    if (this.chartInstance) {
      this.chartInstance.destroy(); // Destruir el gráfico existente si ya existe
    }

    this.chartInstance = new Chart(ctx, {
      type: 'line',
      data: this.generateChartData(),
      options: this.getChartOptions(),
    });
  }

  private generateChartData() {
    const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'];
    const datasets = [
      {
        label: 'Asistencia Buena',
        data: this.generateRandomData(),
        borderColor: this.colors.verde,
        backgroundColor: 'rgba(75, 192, 192, 0.3)', // versión transparente
        borderWidth: 2,
        fill: true, // si quieres que tenga relleno debajo de la línea
      },
      {
        label: 'Asistencia Falta',
        data: this.generateRandomData(),
        borderColor: this.colors.rojo,
        backgroundColor: 'rgba(255, 99, 132, 0.3)',
        borderWidth: 2,
        fill: true,
      },
      {
        label: 'Retardo',
        data: this.generateRandomData(),
        borderColor: this.colors.amarillo,
        backgroundColor: 'rgba(255, 206, 86, 0.3)',
        borderWidth: 2,
        fill: true,
      },
    ];
    

    return { labels, datasets };
  }

  private generateRandomData() {
    const DATA_COUNT = 7;
    return Array.from({ length: DATA_COUNT }, () => Math.floor(Math.random() * 100));
  }

  private getChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: { enabled: true },
        title: { display: true, text: 'Gráfica de Asistencia y Retardo' },
        legend: { display: true },
      },
      interaction: { intersect: false },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Porcentaje' },
          ticks: {
            font: { size: 14 },
          },
        },
        x: {
          display: true,
          ticks: {
            maxRotation: 90,
            minRotation: 90,
            font: { size: 12 },
          },
        },
      },
    };
  }
}