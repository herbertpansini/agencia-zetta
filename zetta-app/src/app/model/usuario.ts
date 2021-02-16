import { Cargo } from "./cargo";
import { Perfil } from "./perfil";
import { SexoEnum } from "./sexo.enum";

export class Usuario {
  id: number;
  dataCadastro: Date;
  nome: string = '';
  cpf: string = '';
  dataNascimento: Date;
  sexo: SexoEnum;
  cargo: Cargo = new Cargo();
  perfis: Perfil[] = [];
}
