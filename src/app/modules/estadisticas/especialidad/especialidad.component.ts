import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Chart, registerables} from 'node_modules/chart.js';
import { Subscription } from 'rxjs';
import { Turno } from 'src/app/interfaces/turno';
import { BaseDeDatosService } from 'src/app/services/base-de-datos.service';
import { jsPDF} from "jspdf";
import html2canvas from 'html2canvas';
import { DatePipe } from '@angular/common';
Chart.register(...registerables);

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.scss'],
  providers: [DatePipe]
})
export class EspecialidadComponent {

  @ViewChild('pieChart') pieChart: ElementRef<HTMLCanvasElement> | undefined;
  @ViewChild('contenido', {static: false}) grafico!: ElementRef;

  public chart: any;
  public turnos: any[] = [];
  private sub?: Subscription;
  public generando: boolean = true;

  constructor(private db: BaseDeDatosService, private datePipe: DatePipe) {}

  ngAfterViewInit() {
    this.sub = this.db.obtenerTurnosAdmin().subscribe(turnos => {
      this.contarTurnosPorEspecialidad(turnos);
      this.generarGrafica();
    })
  }

  ngDestroy(){
    if(this.sub)
      this.sub.unsubscribe();
  }

  private contarTurnosPorEspecialidad(turnos: Turno[]): void {
    const arrayContadores = new Map();
    const colorMap = new Map();

    turnos.forEach(item => {
      const valor = item.tipo;
      const contador = arrayContadores.get(valor) || 0;
      arrayContadores.set(valor, contador + 1);

      if (!colorMap.has(valor)) {
        const randomColor = this.getRandomColor();
        colorMap.set(valor, randomColor);
      }
    });

    this.turnos = Array.from(arrayContadores.entries()).map(([valor, contador]) => ({
      nombre: valor,
      contador: contador,
      color: colorMap.get(valor)
    }));
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  generarGrafica(): void {
    if(this.pieChart){
      this.pieChart.nativeElement.width = 450;
      this.pieChart.nativeElement.height = 450;
      const ctx = this.pieChart.nativeElement.getContext('2d');
      if(ctx){
        this.chart = new Chart(ctx, {
          type: 'pie',
          data: {
            datasets: [{
              data: this.turnos.map(item => item.contador),
              backgroundColor: this.turnos.map(item => item.color),
            }],
            labels: this.turnos.map(item => item.nombre),
          },
          options: {
            responsive: false,
            animation: {
              onComplete: (animation) => {
                this.generando = false;
              }
          }
          },
        });
      }
    }
  }

  generarPdf() {
    const pdf = new jsPDF();

    const nombre = "turnos-por-especialidad";
  
    const graficoElement = this.grafico.nativeElement;
  
    const options = {
      backgroundColor: '#ffffff'
    };
  
    const faviconImage = new Image();
    faviconImage.src = 'assets/favicon/favicon-32x32.png';
  
    faviconImage.onload = () => {
      html2canvas(graficoElement, options).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
  
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.addImage(faviconImage, 'PNG', 10, 10, 16, 16);
  
        const currentDate = this.datePipe.transform(new Date(), 'd/M/YYYY HH:mm', '-0300');
        const text = "Gráfico Generado el: " + currentDate;
        const margin = 20;
        const textX = 2;
        const textY = pdfHeight + margin;
        pdf.text(text, textX, textY);
  
        pdf.save(nombre + "-" + currentDate);
      });
    };
  }
} 
