import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { TableModule, TableRowSelectEvent } from 'primeng/table'
import { Router } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { PanelModule } from 'primeng/panel'
import { InputTextModule } from 'primeng/inputtext'
import { RippleModule } from 'primeng/ripple'
import { TooltipModule } from 'primeng/tooltip'
import { ProvinceFacade } from '../../domain/province/application/province.facade'
import { Province } from '../../domain/province/model/province.model'

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    PanelModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
    TooltipModule
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  // Inyección de dependencias
  private provinceFacade = inject(ProvinceFacade)
  private router = inject(Router)

  // Estado local del componente
  provinces = signal<Province[]>([])
  loading = signal<boolean>(true)

  // Valores computados
  totalProvinces = computed(() => this.provinces().length)

  constructor() {
    effect(() => {
      const facadeProvinces = this.provinceFacade.provinces$()
      this.provinces.set(facadeProvinces)

      if (facadeProvinces.length > 0) {
        this.loading.set(false)
      }
    })

    effect(() => {
      const isLoading = this.provinceFacade.isLoading$()
      if (!isLoading) {
        this.loading.set(false)
      }
    })
  }

  ngOnInit(): void {
    this.provinceFacade.loadAllProvinces()
  }

  onRowSelect(event: TableRowSelectEvent<Province>) {
    if (!event.data || Array.isArray(event.data)) {
      console.error('No se ha seleccionado una provincia válida')
      return
    }

    const province = event.data as Province

    this.provinceFacade.selectProvinceById(province.CODPROV)

    this.router.navigate(['/details', province.CODPROV])
  }

  deleteProvince(event: Event, id: string): void {
    event.stopPropagation()
    this.provinceFacade.removeProvince(id)
  }
}
