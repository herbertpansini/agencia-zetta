import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { PageableUtil } from 'src/app/util/pageable.util';
import { UsuarioFiltro } from 'src/app/model/usuario-filtro';
import { MensagemUtil } from 'src/app/util/mensagem.util';
import { UsuarioList } from 'src/app/model/usuario-list';
import { CargoService } from 'src/app/service/cargo.service';
import { PerfilService } from 'src/app/service/perfil.service';
import { Cargo } from 'src/app/model/cargo';
import { Perfil } from 'src/app/model/perfil';
import { SexoEnum } from 'src/app/model/sexo.enum';
import { ConstantUtil } from 'src/app/util/constant.util';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css'],
  providers: [ MessageService, ConfirmationService ]
})
export class UsuarioFormComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  usuarioDialog: boolean;

  generos: SelectItem[] = SexoEnum.generos;

  cargos: Cargo[];

  perfis: Perfil[];

  selectedPerfil: number;

  usuarios: UsuarioList[];

  usuario: Usuario;

  usuarioFiltro: UsuarioFiltro = new UsuarioFiltro();

  totalRecords: number;

  submitted: boolean;

  constructor(private cargoService: CargoService,
    private perfilService: PerfilService,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {
    this.usuario = new Usuario();
    }

    ngOnInit() {
    this.getCargos();
    this.getPerfis();
    }

    getCargos() {
    this.blockUI.start(MensagemUtil.BLOCKUI_CARREGANDO);
    this.cargoService.findAll().pipe(finalize(() => this.blockUI.stop()))
    .subscribe(response => this.cargos = response);
    }

    getPerfis() {
    this.blockUI.start(MensagemUtil.BLOCKUI_CARREGANDO);
    this.perfilService.findAll().pipe(finalize(() => this.blockUI.stop()))
    .subscribe(response => this.perfis = response);
    }

    addPerfil(perfilId: number) {
    if (!this.usuario.perfis.find(val => val.id === perfilId)) {
    this.usuario.perfis.push(this.perfis.find(val => val.id === perfilId));
    } else {
    this.messageService.add({severity: ConstantUtil.SEVERITY_ERROR, summary: ConstantUtil.SUMMARY_ERROR, detail: MensagemUtil.PERFIL_ADICIONADO, life: ConstantUtil.LIFE});
    }
    }

    deletePerfil(perfil: Perfil) {
    this.usuario.perfis = this.usuario.perfis.filter(val => val.id !== perfil.id);
    }

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
    this.blockUI.start(MensagemUtil.BLOCKUI_CARREGANDO);
    this.usuarioService.findById(usuario.id).pipe(finalize(() => this.blockUI.stop()))
    .subscribe(response => {
    this.usuario = response;
    this.usuario.dataNascimento ? this.usuario.dataNascimento = new Date(`${this.usuario.dataNascimento}T00:00:00-03:00`) : '';
    this.usuarioDialog = true;
    },
    (err) => {
    let {error} = err;
    this.messageService.add({severity: ConstantUtil.SEVERITY_ERROR, summary: ConstantUtil.SUMMARY_ERROR, detail: error.message, life: ConstantUtil.LIFE});
    });
    }

    deleteUsuario(usuario: Usuario) {
    this.confirmationService.confirm({
    message: MensagemUtil.USUARIO_EXCLUIR + usuario.nome + '?',
    header: MensagemUtil.CONFIRMATION_CONFIRM,
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: MensagemUtil.CONFIRMATION_ACCEPT,
    rejectLabel: MensagemUtil.CONFIRMATION_REJECT,
    accept: () => {
      this.blockUI.start(MensagemUtil.BLOCKUI_EXCLUINDO);
      this.usuarioService.delete(usuario.id).pipe(finalize(() => this.blockUI.stop()))
      .subscribe(
        response => {
          this.usuarios = this.usuarios.filter(val => val.id !== usuario.id);
        });
        this.messageService.add({severity:'success', summary: 'Successful', detail: MensagemUtil.USUARIO_EXCLUIDO, life: 3000});
    }
    });
    }

    hideDialog() {
    this.usuarioDialog = false;
    this.submitted = false;
    }

    closeDialog() {
    this.usuarios = [...this.usuarios];
    this.usuarioDialog = false;
    this.usuario = new Usuario();
    }

    getUsuarioItem(usuario: Usuario): UsuarioList {
    let usuarioItem = new UsuarioList();
    usuarioItem.id = usuario.id;
    usuarioItem.nome = usuario.nome;
    usuarioItem.cpf = usuario.cpf;
    usuarioItem.dataNascimento = usuario.dataNascimento;
    usuarioItem.sexo = usuario.sexo;
    usuarioItem.cargo = usuario.cargo.nome;
    return usuarioItem;
    }

    saveUsuario() {
    this.submitted = true;

    if (this.usuario.nome.trim()) {
    if (this.usuario.id) {
        this.blockUI.start(MensagemUtil.BLOCKUI_ATUALIZANDO);
        this.usuarioService.update(this.usuario.id, this.usuario).pipe(finalize(() => this.blockUI.stop()))
        .subscribe(response => {
          this.usuario = response;
          this.usuarios[this.findIndexById(this.usuario.id)] = this.getUsuarioItem(this.usuario);
          this.messageService.add({severity: ConstantUtil.SEVERITY_SUCCESS, summary: ConstantUtil.SUMMARY_SUCCESSFUL, detail: MensagemUtil.USUARIO_ATUALIZADO, life: ConstantUtil.LIFE});
          this.closeDialog();
        },
        (err) => {
          let {error} = err;
            this.messageService.add({severity: ConstantUtil.SEVERITY_ERROR, summary: ConstantUtil.SUMMARY_ERROR, detail: error.message, life: ConstantUtil.LIFE});
        });
    } else {
        this.blockUI.start(MensagemUtil.BLOCKUI_SALVANDO);
        this.usuarioService.save(this.usuario).pipe(finalize(() => this.blockUI.stop()))
        .subscribe(response => {
          this.usuario = response;
          this.usuarios.push(this.getUsuarioItem(this.usuario));
          this.messageService.add({severity: ConstantUtil.SEVERITY_SUCCESS, summary: ConstantUtil.SUMMARY_SUCCESSFUL, detail: MensagemUtil.USUARIO_CADASTRADO, life: ConstantUtil.LIFE});
          this.closeDialog();
        },
        (err) => {
          let {error} = err;
            this.messageService.add({severity: ConstantUtil.SEVERITY_ERROR, summary: ConstantUtil.SUMMARY_ERROR, detail: error.message, life: ConstantUtil.LIFE});
        });
    }
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
