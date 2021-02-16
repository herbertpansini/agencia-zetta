import { SexoEnum } from "./sexo.enum";

export class UsuarioList {
  id: number;
  dataCadastro: Date;
  nome: string;
  cpf: string;
  dataNascimento: Date;
  sexo: SexoEnum;
  cargo: string;
}
