import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TableModule, TableRowSelectEvent } from 'primeng/table'
import { Router } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { RippleModule } from 'primeng/ripple'
import { ProvinceFacade } from '../../domain/province/application/province.facade'
import { Province } from '../../domain/province/model/province.model'

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, InputTextModule, RippleModule],
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

  ngOnInit(): void {
    // Actualizar el componente cuando cambien las provincias
    this.provinces.set(this.provinceFacade.provinces$())
    this.loading.set(this.provinceFacade.isLoading$())

    // Cargar las provincias
    this.provinceFacade.loadAllProvinces()
  }

  onRowSelect(event: TableRowSelectEvent<Province>) {
    if (!event.data || Array.isArray(event.data)) {
      console.error('No se ha seleccionado una provincia válida')
      return
    }

    const province = event.data as Province

    // Seleccionar la provincia en el facade
    this.provinceFacade.selectProvinceById(province.id)

    // Navegar a la página de detalles
    this.router.navigate(['/details', province.id])
  }
}
