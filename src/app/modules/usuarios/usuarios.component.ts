import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {

  constructor(private router: Router) { }
  public usuario?: Usuario;
  public usuariosLita: Usuario[] = [];
  public mostrandoHistoria = false;
  
  onSeleccion(usuario: Usuario) {
    this.usuario = usuario;
  }

  onListaNueva(lista: Usuario[]) {
    this.usuariosLita = lista;
  }

  enviarARegistro(){
    this.router.navigate(["/registro"]);
  }

  descargarExcel(){
    const nombre = "datos-usuarios"
    const datosFormateados = this.formatearDatos(this.usuariosLita);
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosFormateados);
    const workbook: XLSX.WorkBook = { Sheets: { [nombre]: worksheet }, SheetNames: [nombre] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.generarArchivoExcel(excelBuffer, `${nombre}.xlsx`);
  }

  private formatearDatos(lista: Usuario[]) {
    return lista.map((usuario) => ({
      id: usuario.id,
      tipo: usuario.tipo,
      habilitado: usuario.habilitado === undefined ? "" :  usuario.habilitado ? "SI" : "NO",
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      dni: usuario.dni,
      edad: usuario.edad,
      obraSocial: usuario.obraSocial || '',
      especialidades: usuario.especialidades ? usuario.especialidades.join(', ') : '',
      email: usuario.email,
      imagen1: usuario.imagen1,
      imagen2: usuario.imagen2
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

  onMostrarHistoria(usuario: Usuario){
    this.usuario = usuario;
    this.mostrandoHistoria = true;
  }

  volver(){
    this.mostrandoHistoria = false;
  }
}
