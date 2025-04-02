import { Breadcrumb, Origen, Province } from './province.model'

export interface ProvinceDetailResponse {
  origen: Origen
  elaborado: string
  title: string
  today: {
    p: string
  }
  tomorrow?: {
    p: string
  }
  temperatura: {
    max: string
    min: string
  }
  stateSky: {
    description: string
    icon: string
  }
  viento: string
  humedad: string
  lluvia: string
  provincia: Province
  comautonoma: {
    ID: string
    CODAUTON: string
    CODCOMUN: string
    NOMBRE: string
  }
  metadescripcion: string
  keywords: string
  breadcrumb: Breadcrumb[]
}
