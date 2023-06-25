import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss']
})
export class TurnosComponent {
  @Input() finalizados = false;
}
