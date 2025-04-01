/**
 * Representa una provincia de España en el modelo de dominio
 * Basado en la API: https://www.el-tiempo.net/api/json/v2/provincias
 */
export interface Province {
  id: string // CODPROV
  name: string // NOMBRE_PROVINCIA
  community: string // COMUNIDAD_CIUDAD_AUTONOMA
  communityId: string // CODAUTON
  capital: string // CAPITAL_PROVINCIA
}

/**
 * Información sobre la Comunidad Autónoma
 * Basado en la API: https://www.el-tiempo.net/api/json/v2/provincias/[id]
 */
export interface CommunityInfo {
  id: string // ID
  code: string // CODAUTON
  communeCode: string // CODCOMUN
  name: string // NOMBRE
}

/**
 * Información meteorológica
 * Basado en la API: https://www.el-tiempo.net/api/json/v2/provincias/[id]
 */
export interface WeatherInfo {
  maxTemperature?: number // temperaturas.max
  minTemperature?: number // temperaturas.min
  stateDescription?: string // stateSky.description
  stateIcon?: string // stateSky.icon
  humidity?: number // humedad
  wind?: string // viento
  rainfall?: number // lluvia
  forecast?: string // today.p (descripción del pronóstico)
  elaborationDate?: string // elaborado (fecha de elaboración)
}

/**
 * Detalles extendidos de una provincia para la vista de detalles
 * Basado en la API: https://www.el-tiempo.net/api/json/v2/provincias/[id]
 */
export interface ProvinceDetail extends Omit<Province, 'community'> {
  communityName: string // Nombre de la comunidad (del objeto Province original)
  communityInfo: CommunityInfo // Información detallada de la comunidad autónoma
  weather: WeatherInfo
  today: {
    description: string // today.p
  }
  tomorrow?: {
    description: string // tomorrow.p
  }
}
