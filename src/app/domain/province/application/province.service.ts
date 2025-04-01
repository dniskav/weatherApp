import { Injectable, inject } from '@angular/core'
import { Observable, map, catchError, of } from 'rxjs'
import { Province, ProvinceDetail } from '../model/province.model'
import { HttpProvinceRepository } from '../repository/http-province.repository'

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {
  private provinceRepository = inject(HttpProvinceRepository)

  /**
   * Obtiene todas las provincias a través del repositorio
   * @returns Un Observable con un objeto que contiene las provincias
   */
  getAll(): Observable<{ provincias: Province[] }> {
    return this.provinceRepository.findAll().pipe(
      map((provinces) => ({ provincias: provinces })),
      catchError((error) => {
        console.error('Error en ProvinceService.getAll:', error)
        // Devolvemos un objeto vacío en caso de error para no romper los consumidores
        return of({ provincias: [] })
      })
    )
  }

  /**
   * Obtiene una provincia específica por su ID
   * @param id El código de la provincia
   * @returns Un Observable con los detalles de la provincia
   */
  getById(id: string): Observable<ProvinceDetail> {
    return this.provinceRepository.findById(id).pipe(
      catchError((error) => {
        console.error(`Error en ProvinceService.getById(${id}):`, error)
        throw error // Propagamos el error
      })
    )
  }
}
