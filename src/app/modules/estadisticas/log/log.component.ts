import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Log } from 'src/app/interfaces/log';
import { BaseDeDatosService } from 'src/app/services/base-de-datos.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
  providers: [DatePipe]
})
export class LogComponent {
  public logs: Log[] = [];
  private sub?: Subscription;

  constructor(private db: BaseDeDatosService, private datePipe: DatePipe) {
    this.sub = this.db.obtenerLogs().subscribe(logs=>{
      logs.sort((a,b)=>{
        return (new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
      });
      this.logs = logs;
    });
   }

   descargarExcel(){
    const nombre = "log-accesos"
    const datosFormateados = this.formatearDatos(this.logs);
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosFormateados);
    const workbook: XLSX.WorkBook = { Sheets: { [nombre]: worksheet }, SheetNames: [nombre] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.generarArchivoExcel(excelBuffer, `${nombre}.xlsx`);
  }

  ngDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

  private formatearDatos(lista: Log[]) {
    return lista.map((log) => ({
      id: log.id,
      tipo: log.tipo,
      dni: log.dni,
      nombre: log.nombre,
      fecha: this.datePipe.transform(log.fecha, 'Y/M/d-HH:mm', '-0300')
    }));
  }


  private generarArchivoExcel(buffer: any, nombre: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    const link: HTMLAnchorElement = document.createElement('a');
    link.href = window.URL.createObjectURL(data);
    link.download = nombre;
    link.click();

    setTimeout(() => {
      window.URL.revokeObjectURL(link.href);
    }, 100);
  }


}
