import { SelectItem } from "primeng/api";

export class SexoEnum {
    static MASCULINO = 'M';
    static FEMININO = 'F';

    static generos: SelectItem[] = [
        { value: null, label: 'Selecione' },
        { value: SexoEnum.MASCULINO, label: 'Masculino' },
        { value: SexoEnum.FEMININO, label: 'Feminino' }
    ];
}
