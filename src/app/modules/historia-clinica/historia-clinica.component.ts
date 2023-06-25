import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Especialidad } from 'src/app/interfaces/especialidad';
import { DatoVariable, Estado, Turno } from 'src/app/interfaces/turno';
import { Usuario } from 'src/app/interfaces/usuario';
import { BaseDeDatosService } from 'src/app/services/base-de-datos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss'],
  providers: [DatePipe]
})
export class HistoriaClinicaComponent {

  private _turnos: Turno[] = [];
  public turnos: Turno[] = [];
  private sub?: Subscription;
  private _especialista?: Usuario;
  public especialidades: Especialidad[] = [];
  public especialidadSeleccionada = "";

  constructor(private db:BaseDeDatosService,
    private usuario: UsuarioService, 
    private datePipe: DatePipe,
    private http: HttpClient) { 
    if(this.usuario.datos?.tipo == "paciente"){
      this.paciente = this.usuario.datos.id;
    }
  }

  get datos(){
    return this.usuario.datos;
  }

  @Input() set especialista(value: Usuario | undefined){
    if(value && value.tipo == "especialista"){
      this._especialista = value;
    }
  }

  @Input() set paciente(value: string | undefined){
    if(value){
      this.sub = this.db.obtenerTurnosPaciente(value).subscribe(turnos => {
        this._turnos = [];
        for(let turno of turnos){
          if(turno.estado == Estado.realizado){
            if(this._especialista){
              if(turno.idEspecialista == this._especialista.id){
                this._turnos.push(turno);
              }
            }
            else{
              this._turnos.push(turno);
              if(this.validadEspecialidad(turno)){
                let especialidad = {
                  nombre: turno.tipo,
                  id: turno.id,
                  foto: ""
                }
                this.especialidades.push(especialidad)
              }
            }
          }
        }
        this._turnos.sort((a,b)=> {
          const dateA = new Date(a.fecha);
          const dateB = new Date(b.fecha);
          return dateB.getTime() - dateA.getTime();
        })
        this.turnos = this._turnos;
      });
    }
  }  

  ngDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

  validarDatoOpcional(dato?: DatoVariable){
    return dato != undefined && dato.clave != "" && dato.valor != "";
  }

  seleccionarEspecialidad(nombre: string){
    if(this.especialidadSeleccionada == nombre){
      this.especialidadSeleccionada = "";
    }
    else{
      this.especialidadSeleccionada = nombre;
    }

    this.filtrarPorEspecialidad(this.especialidadSeleccionada);
  }

  descargarHistoria(){
    const cardItems = this.turnos.map((item) => {
      const cardContent = [];
      
      cardContent.push({ text: `Fecha: ${this.datePipe.transform(item.fecha, 'd/M HH:mm', '-0300')}`, style: 'card' });
      cardContent.push({ text: `Especialista: ${item.nombreEspecialista}`, style: 'card' });
      cardContent.push({ text: `Consulta: ${item.tipo}`, style: 'card' });
      cardContent.push({ text: `Altura: ${item.historiaClinica?.altura}`, style: 'card' });
      cardContent.push({ text: `Peso: ${item.historiaClinica?.peso}`, style: 'card' });
      cardContent.push({ text: `Temperatura: ${item.historiaClinica?.temperatura}°C`, style: 'card' });
      cardContent.push({ text: `Presión: ${item.historiaClinica?.presionMax} / ${item.historiaClinica?.presionMin}`, style: 'card' });

      if (this.validarDatoOpcional(item.historiaClinica?.dato1)) {
        cardContent.push({ text: `${item.historiaClinica?.dato1?.clave}: ${item.historiaClinica?.dato1?.valor}`, style: 'card' });
      }
      
      if (this.validarDatoOpcional(item.historiaClinica?.dato2)) {
        cardContent.push({ text: `${item.historiaClinica?.dato2?.clave}: ${item.historiaClinica?.dato2?.valor}`, style: 'card' });
      }
      
      if (this.validarDatoOpcional(item.historiaClinica?.dato3)) {
        cardContent.push({ text: `${item.historiaClinica?.dato3?.clave}: ${item.historiaClinica?.dato3?.valor}`, style: 'card' });
      }
      cardContent.push({ text: '------------------------------------', style: 'separator' });
      return cardContent;
    });
    
    const flattenedCardItems = cardItems.reduce((result, cardContent) => {
      return result.concat(cardContent);
    }, []);
    
    const imagePath = '/assets/favicon/favicon-32x32.png';
    this.encodeImageToBase64(imagePath)
          .then((base64Image) => {
            const docDefinition: TDocumentDefinitions = {
              content: [
                { image: base64Image, width: 50, height: 50 },
                { text: "Historia Clinica " + this.especialidadSeleccionada + ": " + this.datos?.nombre + " " + this.datos?.apellido, style: 'header' },
                { text: "Fecha Emision: " + this.datePipe.transform(new Date(), 'd/M/YYYY HH:mm', '-0300')+" hs", style: 'header' },
                { text: '------------------------------------', style: 'separator' },
                ...flattenedCardItems,
              ],
              styles: {
                header: {
                  fontSize: 16,
                  bold: true,
                  alignment: 'center',
                  margin: [0, 10, 0, 10]
                },
                separator: {
                  fontSize: 10,
                  alignment: 'center',
                  margin: [0, 5, 0, 5]
                },
                card: {
                  fontSize: 14,
                  margin: [20, 5, 0, 5]
                }
              }
            };
            const fileName = 'historia-clinica-' + (this.especialidadSeleccionada !== "" ? this.especialidadSeleccionada + "-" : "") + this.datos?.nombre + "-" + this.datos?.apellido;
            pdfMake.createPdf(docDefinition).download(fileName);
          })
          .catch((error) => {
            console.error('Error encoding image:', error);
          });
  }

  private filtrarPorEspecialidad(nombre: string){
    this.turnos = [];
    for(let turno of this._turnos){
      if(turno.tipo == nombre){
        this.turnos.push(turno);
      }
    }
  }
  private validadEspecialidad(turno: Turno){
    for(let item of  this.especialidades){
      if(item.nombre == turno.tipo){
        return false;
      }
    }

    return true;
  }

  private encodeImageToBase64(path: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.http.get(path, { responseType: 'blob' })
        .subscribe((blob: Blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result as string;
            resolve(base64data);
          };
          reader.onerror = (error) => {
            reject(error);
          };
          reader.readAsDataURL(blob);
        }, (error) => {
          reject(error);
        });
    });
  }
}
