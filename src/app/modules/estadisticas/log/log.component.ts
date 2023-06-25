import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Log } from 'src/app/interfaces/log';
import { BaseDeDatosService } from 'src/app/services/base-de-datos.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent {
  public logs: Observable<Log[]>;
  constructor(private db: BaseDeDatosService) {
    this.logs = this.db.obtenerLogs();
   }
}
