import { Pipe, PipeTransform } from '@angular/core';
import { SexoEnum } from '../model/sexo.enum';

@Pipe({
  name: 'sexo'
})
export class SexoPipe implements PipeTransform {
    transform(value: any) {
        if (value == null || value === '') {
            return null;
        }
        return SexoEnum.generos.find( item => item.value === value).label;
    }
}
