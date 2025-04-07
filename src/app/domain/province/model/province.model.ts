/**
 * Representa una provincia de España en el modelo de dominio
 * Basado en la API: https://www.el-tiempo.net/api/json/v2/provincias
 */
export interface Province {
  id: string
  CODPROV: string
  NOMBRE_PROVINCIA: string
  CODAUTON: string
  COMUNIDAD_CIUDAD_AUTONOMA: string
  CAPITAL_PROVINCIA: string
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
 * ID de un municipio
 */
export interface CityId {
  '0': string
}

/**
 * Estado del cielo
 */
export interface StateSky {
  description: string // Descripción del estado del cielo
  id: string // ID del estado del cielo
}

/**
 * Información de temperaturas
 */
export interface Temperature {
  max: string // Temperatura máxima
  min: string // Temperatura mínima
}

/**
 * Representa una ciudad/municipio destacado con su información meteorológica
 * Basado en la API: https://www.el-tiempo.net/api/json/v2/provincias/[id]
 */
export interface City {
  id: CityId // ID del municipio
  idProvince: string // ID de la provincia
  name: string // Nombre del municipio
  nameProvince: string // Nombre de la provincia
  stateSky: StateSky
  temperatures: Temperature
}

/**
 * Datos de provincia según formato de la API
 * Basado en la respuesta original del endpoint provincia
 */
export interface ProvinciaData {
  CODPROV: string
  NOMBRE_PROVINCIA: string
  CODAUTON: string
  COMUNIDAD_CIUDAD_AUTONOMA: string
  CAPITAL_PROVINCIA: string
}

/**
 * Información de pronóstico
 */
export interface Forecast {
  description: string // Descripción del pronóstico (today.p o tomorrow.p)
}

/**
 * Detalles extendidos de una provincia para la vista de detalles
 * Basado en la API: https://www.el-tiempo.net/api/json/v2/provincias/[id]
 */
export interface ProvinceDetail extends Omit<Province, 'community'> {
  title: string // Título descriptivo de la provincia (ej: "El tiempo en la provincia de Salamanca")
  communityName: string // Nombre de la comunidad (del objeto Province original)
  communityInfo: CommunityInfo // Información detallada de la comunidad autónoma
  weather: WeatherInfo
  today: Forecast
  tomorrow?: Forecast
  ciudades?: City[] // Listado de ciudades/municipios destacados
  provincia: ProvinciaData // Datos originales de la provincia según la API
}

/**
 * Información del origen de los datos
 */
export interface Origen {
  productor: string
  web: string
  language: string
  copyright: string
  nota_legal: string
  descripcion: string
}

/**
 * Estructura de navegación (miga de pan)
 */
export interface Breadcrumb {
  name: string
  url: string | null
  title: string
}

/**
 * Respuesta completa del listado de provincias
 */
export interface ProvincesResponse {
  origen: Origen
  title: string
  provincias: Province[]
  metadescripcion: string
  keywords: string
  breadcrumb: Breadcrumb[]
}
