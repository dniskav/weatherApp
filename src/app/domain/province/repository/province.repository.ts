import { Observable } from 'rxjs'
import { Province, ProvinceDetail } from '../model/province.model'

/**
 * Define el contrato para acceder a los datos de las provincias
 * independientemente de la fuente de datos
 */
export interface ProvinceRepository {
  /**
   * Obtiene todas las provincias
   * @returns Un Observable con un array de objetos Province
   */
  findAll(): Observable<Province[]>

  /**
   * Obtiene una provincia por su ID con información detallada
   * @param id El código de la provincia
   * @returns Un Observable con los detalles de la provincia
   */
  findById(id: string): Observable<ProvinceDetail>
}
