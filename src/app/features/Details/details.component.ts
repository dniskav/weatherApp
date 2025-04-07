import { Component, inject, Signal, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PanelModule } from 'primeng/panel'
import { CardModule } from 'primeng/card'
import { ActivatedRoute } from '@angular/router'

import { ProvinceFacade } from '../../domain/province/application/province.facade'
import { ProvinceDetail } from '../../domain/province/model/province.model'

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, PanelModule, CardModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  private readonly provinceFacade = inject(ProvinceFacade)
  private readonly route = inject(ActivatedRoute)
  province = this.provinceFacade.selectedProvince$

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id']
      if (id) {
        this.provinceFacade.selectProvinceById(id)
      }
    })
  }

  // Método para convertir temperatura de string a número
  parseTemp(temp: string): number {
    return parseInt(temp, 10)
  }

  // Función para obtener el ícono según la temperatura mínima
  getTemperatureIcon(minTemperature?: number): string {
    if (minTemperature === undefined) return 'assets/cloud.png'

    if (minTemperature < 0) {
      return 'assets/ice.png'
    } else if (minTemperature <= 10) {
      return 'assets/cloud.png'
    } else {
      return 'assets/sun.png'
    }
  }
}
