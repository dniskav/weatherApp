import { Injectable, inject, signal } from '@angular/core'
import { ProvinceService } from './province.service'

@Injectable({
  providedIn: 'root'
})
export class ProvinceFacade {
  // Servicios
  private provinceService = inject(ProvinceService)

  // Estado interno con signals
  private provinces = signal<any[]>([])
  private selectedProvince = signal<any>(null)
  private isLoading = signal<boolean>(false)

  // Estado público expuesto como solo lectura
  public provinces$ = this.provinces.asReadonly()
  public selectedProvince$ = this.selectedProvince.asReadonly()
  public isLoading$ = this.isLoading.asReadonly()

  constructor() {}

  // Métodos públicos
  loadAllProvinces() {
    // Evitar cargar múltiples veces si ya tenemos datos
    if (this.provinces().length > 0) {
      return
    }

    // Indicar que estamos cargando
    this.isLoading.set(true)

    this.provinceService.getAll().subscribe({
      next: (data) => {
        // Solo actualizar si la respuesta tiene datos
        if (data && data.provincias) {
          this.provinces.set(data.provincias)
        }
        this.isLoading.set(false)
      },
      error: (err) => {
        console.error('Error cargando provincias:', err)
        this.isLoading.set(false)
      }
    })
  }

  selectProvinceById(id: string) {
    this.provinceService.getById(id).subscribe({
      next: (data) => {
        this.selectedProvince.set(data)
      },
      error: (err) => {
        console.error(`Error cargando provincia ${id}:`, err)
      }
    })
  }

  getSelectedProvince() {
    return this.selectedProvince$
  }

  getAllProvinces() {
    return this.provinces$
  }
}
