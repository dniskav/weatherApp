import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'fixEncoding',
  standalone: true
})
export class FixEncodingPipe implements PipeTransform {
  public transform(value: string): string {
    if (!value) return ''

    let result = value

    // Reemplazar caracteres mal codificados
    result = result.replace(/Ã¡/g, 'á')
    result = result.replace(/Ã©/g, 'é')
    result = result.replace(/Ã­/g, 'í')
    result = result.replace(/Ã³/g, 'ó')
    result = result.replace(/Ãº/g, 'ú')
    result = result.replace(/Ã±/g, 'ñ')
    result = result.replace(/Ã\u00ad/g, 'í') // mínimas
    result = result.replace(/dÃ©/g, 'dé')
    result = result.replace(/Ã¡x/g, 'áx')
    result = result.replace(/rÃ¡/g, 'rá')

    // Más reemplazos específicos para problemas vistos en la aplicación
    result = result.replace(/mÃnimas/g, 'mínimas')
    result = result.replace(/mÃ¡ximas/g, 'máximas')
    result = result.replace(/dÃa/g, 'día')
    result = result.replace(/dÃ©biles/g, 'débiles')
    result = result.replace(/avanzarÃ¡n/g, 'avanzarán')

    return result
  }
}
