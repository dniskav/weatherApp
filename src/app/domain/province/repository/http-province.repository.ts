import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, map, catchError, of } from 'rxjs'
import { Province, ProvinceDetail, WeatherInfo, CommunityInfo } from '../model/province.model'
import { ProvinceRepository } from './province.repository'

const API_URL = 'https://www.el-tiempo.net/api/json/v2/provincias'

@Injectable({
  providedIn: 'root'
})
export class HttpProvinceRepository implements ProvinceRepository {
  private http = inject(HttpClient)

  /**
   * Obtiene todas las provincias desde la API
   */
  findAll(): Observable<Province[]> {
    return this.http.get<any>(API_URL).pipe(
      map((response) => {
        if (response && response.provincias) {
          return response.provincias
        }
        return []
      }),
      catchError((error) => {
        console.error('Error en la solicitud de provincias:', error)
        return of([])
      })
    )
  }

  /**
   * Obtiene una provincia específica por su ID desde la API
   * @param id El código de la provincia
   */
  findById(id: string): Observable<ProvinceDetail> {
    return this.http.get<any>(`${API_URL}/${id}`).pipe(
      map((response) => response),
      catchError((error) => {
        console.error(`Error en la solicitud de provincia ${id}:`, error)
        throw error // Re-lanzamos el error para que el llamador lo maneje
      })
    )
  }

  // /**
  //  * Mapea un array de datos de la API a objetos Province
  //  */
  // private mapToProvinces(data: any[]): Province[] {
  //   return data.map((item) => ({
  //     id: item.CODPROV,
  //     name: item.NOMBRE_PROVINCIA,
  //     community: item.COMUNIDAD_CIUDAD_AUTONOMA,
  //     communityId: item.CODAUTON,
  //     capital: item.CAPITAL_PROVINCIA
  //   }))
  // }

  //   /**
  //    * Mapea un objeto de la API a un objeto ProvinceDetail
  //    */
  //   private mapToProvinceDetail(data: any, provinceId: string): ProvinceDetail {
  //     // Extraer datos básicos de la provincia
  //     const provinceData = data.provincia || {}

  //     // Información de la provincia básica
  //     const provinceDetail: ProvinceDetail = {
  //       id: provinceData.CODPROV || provinceId,
  //       name: provinceData.NOMBRE_PROVINCIA || '',
  //       communityName: provinceData.COMUNIDAD_CIUDAD_AUTONOMA || '',
  //       communityId: provinceData.CODAUTON || '',
  //       capital: provinceData.CAPITAL_PROVINCIA || '',

  //       // Información detallada de la comunidad
  //       communityInfo: this.extractCommunityInfo(data),

  //       // Información meteorológica
  //       weather: this.extractWeatherInfo(data),

  //       // Información de pronóstico
  //       today: {
  //         description: data.today?.p || ''
  //       }
  //     }

  //     // Agregar pronóstico de mañana si está disponible
  //     if (data.tomorrow && data.tomorrow.p) {
  //       provinceDetail.tomorrow = {
  //         description: data.tomorrow.p
  //       }
  //     }

  //     return provinceDetail
  //   }

  //   /**
  //    * Extrae la información de la comunidad autónoma
  //    */
  //   private extractCommunityInfo(data: any): CommunityInfo {
  //     const community = data.comautonoma || {}
  //     return {
  //       id: community.ID || '',
  //       code: community.CODAUTON || '',
  //       communeCode: community.CODCOMUN || '',
  //       name: community.NOMBRE || ''
  //     }
  //   }

  //   /**
  //    * Extrae la información meteorológica
  //    */
  //   private extractWeatherInfo(data: any): WeatherInfo {
  //     return {
  //       maxTemperature: data.temperaturas?.max,
  //       minTemperature: data.temperaturas?.min,
  //       stateDescription: data.stateSky?.description,
  //       stateIcon: data.stateSky?.icon,
  //       humidity: data.humedad,
  //       wind: data.viento,
  //       rainfall: data.lluvia,
  //       forecast: data.today?.p,
  //       elaborationDate: data.elaborado
  //     }
  //   }
}
