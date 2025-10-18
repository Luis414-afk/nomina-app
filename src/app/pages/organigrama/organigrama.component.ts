import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import Graph from 'graphology';
import Sigma from 'sigma';
import { NodePictogramProgram } from '@sigma/node-image';
import ForceSupervisor from 'graphology-layout-force/worker';
import { PopoverController } from '@ionic/angular';
import { DetallePopoverComponent } from './detalle-popover/detalle-popover.component';

function randomName() { 
  const firstNames = ['John','Mary','Peter','Susan','Alice','Robert','Linda','James','Karen','Michael'];
  const lastNames = ['Smith','Johnson','Brown','Williams','Jones','Miller','Davis'];
  return `${firstNames[Math.floor(Math.random()*firstNames.length)]} ${lastNames[Math.floor(Math.random()*lastNames.length)]}`;
}

function randomPhone() { 
  return '+52 ' + Math.floor(100000000 + Math.random()*900000000); 
}

function randomEmail(name: string) { 
  const domains = ['example.com','company.com','mail.com'];
  return name.toLowerCase().replace(' ','') + '@' + domains[Math.floor(Math.random()*domains.length)];
}

@Component({
  selector: 'app-organigrama',
  templateUrl: './organigrama.component.html',
  styleUrls: ['./organigrama.component.scss'],
})
export class OrganigramaComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sigmaContainer', { static: true }) sigmaContainer!: ElementRef<HTMLDivElement>;
  private layout: any;
  private renderer: any;
  private graph: Graph;

  PRIMARY_COLOR = getComputedStyle(document.documentElement)
  .getPropertyValue('--ion-color-primary')
  .trim();

  SECONDARY_COLOR = getComputedStyle(document.documentElement)
    .getPropertyValue('--ion-color-secondary')
    .trim();

  TERTIARY_COLOR = getComputedStyle(document.documentElement)
    .getPropertyValue('--ion-color-tertiary')
    .trim();


  constructor(private popoverController: PopoverController) {}

  ngAfterViewInit() {
    setTimeout(() => this.initSigma(), 0);
  }

  private initSigma() {
    const container = this.sigmaContainer.nativeElement;
    this.graph = new Graph();
    const graph = this.graph;

    // Nodo central
    graph.addNode('Central', { x: 0, y: 0, size: 40, label: 'Empresa', type: 'pictogram', image: 'https://icons.getbootstrap.com/assets/icons/building.svg',  color: this.TERTIARY_COLOR });

    // Áreas y empleados
    for (let i = 1; i <= 5; i++) {
      const areaId = `Area${i}`;
      graph.addNode(areaId, { x: 0, y: 0, size: 30, label: `Área ${i}`, type: 'pictogram', image: 'https://icons.getbootstrap.com/assets/icons/building.svg', color: this.SECONDARY_COLOR });
      graph.addEdge('Central', areaId, { size: 2 });

      for (let j = 1; j <= 5; j++) {
        const empId = `${areaId}-Emp${j}`;
        const name = randomName();
        const email = randomEmail(name);
        const phone = randomPhone();

        graph.addNode(empId, {
          size: 20,
          label: name,
          type: 'pictogram',
          image: 'https://icons.getbootstrap.com/assets/icons/person.svg',
          color: this.PRIMARY_COLOR,
          details: { name, email, phone }
        });

        graph.addEdge(areaId, empId, { size: 1 });
      }
    }

    // Posiciones circulares
    graph.nodes().forEach((node, i) => {
      const angle = (i * 2 * Math.PI) / graph.order;
      const radius = node === 'Central' ? 0 : 100 + Math.random() * 50;
      graph.setNodeAttribute(node, 'x', radius * Math.cos(angle));
      graph.setNodeAttribute(node, 'y', radius * Math.sin(angle));
    });

    // Renderer Sigma usando NodePictogramProgram
    this.renderer = new Sigma(graph, container, {
      defaultNodeType: 'pictogram',
      nodeProgramClasses: {
        pictogram: NodePictogramProgram
      },
      renderEdgeLabels: false,
      allowInvalidContainer: true
    });

    // Layout de fuerza
    this.layout = new ForceSupervisor(graph);
    this.layout.start();

    // Click en nodos para popover
    this.renderer.on('clickNode', ({ node }: { node: string }) => {
      const nodeData: any = graph.getNodeAttributes(node);
      const data = nodeData.details;
      if (data) {
        this.openDetailPopover(`Nombre: ${data.name}\nEmail: ${data.email}\nTeléfono: ${data.phone}`);
      }
    });
  }

  ngOnDestroy() {
    if (this.layout) { this.layout.kill(); this.layout = null; }
    if (this.renderer) { this.renderer.kill(); this.renderer = null; }
  }

  async openDetailPopover(details: any) {
    const popover = await this.popoverController.create({
      component: DetallePopoverComponent,
      alignment: 'center',
      cssClass: 'full-screen-popover',
      componentProps: { details }
    });
    return await popover.present();
  }
}
