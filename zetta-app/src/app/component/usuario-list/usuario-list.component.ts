import { Component } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { PageableUtil } from 'src/app/util/pageable.util';
import { UsuarioFiltro } from 'src/app/model/usuario-filtro';
import { MensagemUtil } from 'src/app/util/mensagem.util';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css'],
  providers: [ MessageService, ConfirmationService ]
})
export class UsuarioListComponent {

  @BlockUI() blockUI: NgBlockUI;

  usuarioDialog: boolean;

  usuarios: Usuario[];

  usuario: Usuario;

  usuarioFiltro: UsuarioFiltro = new UsuarioFiltro();

  totalRecords: number;

  submitted: boolean;

  colunas: { field: string, label: string, sort: string, width: string }[] = [
      { field: 'id', label: '#', sort: 'id', width: '10%' },
      { field: 'nome', label: 'Nome', sort: 'nome', width: '80%' },
  ];

  constructor(private usuarioService: UsuarioService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  loadUsuariosByPage(event?) {
        this.blockUI.start(MensagemUtil.BLOCKUI_CARREGANDO);
        const pageable = PageableUtil.buildPageable(event);
        this.usuarioService.findAll(this.usuarioFiltro, pageable)
        .pipe(finalize(() => this.blockUI.stop()))
        .subscribe(response => {
            this.usuarios = response.content;
            this.totalRecords = response.totalElements;
        });
  }

  openNew() {
      this.usuario = new Usuario();
      this.submitted = false;
      this.usuarioDialog = true;
  }

  editUsuario(usuario: Usuario) {
      this.usuario = {...usuario};
      this.usuarioDialog = true;
  }

  deleteUsuario(usuario: Usuario) {
      this.confirmationService.confirm({
          message: 'Você deseja excluir usuário: ' + usuario.nome + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.usuarioService.delete(usuario.id).subscribe(
              response => {
                this.usuarios = this.usuarios.filter(val => val.id !== usuario.id);
              });
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Usuário excluído', life: 3000});
          }
      });
  }

  hideDialog() {
      this.usuarioDialog = false;
      this.submitted = false;
  }

  saveCargo() {
      this.submitted = true;

      if (this.usuario.nome.trim()) {
          if (this.usuario.id) {
              this.usuarioService.update(this.usuario.id, this.usuario).subscribe(response => {
                this.usuario = response;
                this.usuarios[this.findIndexById(this.usuario.id)] = this.usuario;
              });
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Usuário atualizado', life: 3000});
          } else {
              this.usuarioService.save(this.usuario).subscribe(response => {
                this.usuario = response;
                this.usuarios.push(this.usuario);
              });
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Usuário cadastrado', life: 3000});
          }

          this.usuarios = [...this.usuarios];
          this.usuarioDialog = false;
          this.usuario = new Usuario();
      }
  }

  findIndexById(id: number): number {
      let index = -1;
      for (let i = 0; i < this.usuarios.length; i++) {
          if (this.usuarios[i].id === id) {
              index = i;
              break;
          }
      }
      return index;
  }
}
