import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TableModule } from 'primeng/table'
import { Router } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { RippleModule } from 'primeng/ripple'
import { ProvinceFacade } from '../../domain/province/application/province.facade'

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
  provinces = signal<any[]>([])
  loading = signal<boolean>(true)
  totalProvinces = computed(() => this.provinces().length)

  constructor() {
    // Inicializar los valores
  }

  ngOnInit(): void {
    // Configurar un callback para cuando se carguen las provincias
    const updateProvinces = () => {
      const facadeProvinces = this.provinceFacade.provinces$()
      this.provinces.set(facadeProvinces)

      // Actualizar el estado de carga
      const isLoading = this.provinceFacade.isLoading$()
      if (!isLoading && facadeProvinces.length > 0) {
        this.loading.set(false)
      }
    }

    // Verificar estado inicial
    updateProvinces()

    // Cargar las provincias
    this.provinceFacade.loadAllProvinces()

    // Verificar periódicamente hasta tener datos
    const maxChecks = 20 // Limitar a 20 intentos (10 segundos)
    let checkCount = 0
    const checkInterval = setInterval(() => {
      updateProvinces()
      checkCount++

      // Detener el intervalo si tenemos datos o alcanzamos el máximo de intentos
      if (this.provinces().length > 0 || checkCount >= maxChecks) {
        clearInterval(checkInterval)
        // Si llegamos al máximo de intentos sin datos, asumimos que no hay provincias
        if (checkCount >= maxChecks) {
          this.loading.set(false)
        }
      }
    }, 500)
  }

  onRowSelect(event: any) {
    // Seleccionar la provincia en el facade
    this.provinceFacade.selectProvinceById(event.data.CODPROV)

    // Navegar a la página de detalles
    this.router.navigate(['/details', event.data.CODPROV])
  }

  onGlobalFilter(event: any) {
    const value = event.target.value
    console.log('Filtrando por:', value)
  }
}
