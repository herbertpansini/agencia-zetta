import { Component } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Perfil } from 'src/app/model/perfil';
import { PerfilService } from 'src/app/service/perfil.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { PageableUtil } from 'src/app/util/pageable.util';
import { MensagemUtil } from 'src/app/util/mensagem.util';
import { ConstantUtil } from 'src/app/util/constant.util';

@Component({
  selector: 'app-perfil-list',
  templateUrl: './perfil-list.component.html',
  styleUrls: ['./perfil-list.component.css'],
  providers: [ MessageService, ConfirmationService ]
})
export class PerfilListComponent {

  @BlockUI() blockUI: NgBlockUI;

  perfilDialog: boolean;

  perfis: Perfil[];

  perfil: Perfil;

  searchPerfil: string = '';

  totalRecords: number;

  submitted: boolean;

  colunas: { field: string, label: string, sort: string, width: string }[] = [
      { field: 'id', label: '#', sort: 'id', width: 'auto' },
      { field: 'nome', label: 'Nome', sort: 'nome', width: 'auto' },
  ];

  constructor(private perfilService: PerfilService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  loadPerfisByPage(event?) {
      this.blockUI.start(MensagemUtil.BLOCKUI_CARREGANDO);
      const pageable = PageableUtil.buildPageable(event);
      this.perfilService.findByNome(this.searchPerfil, pageable)
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe(response => {
          this.perfis = response.content;
          this.totalRecords = response.totalElements;
      });
  }

  openNew() {
      this.perfil = new Perfil();
      this.submitted = false;
      this.perfilDialog = true;
  }

  editPerfil(perfil: Perfil) {
      this.perfil = {...perfil};
      this.perfilDialog = true;
  }

  deletePerfil(perfil: Perfil) {
      this.confirmationService.confirm({
          message: MensagemUtil.PERFIL_EXCLUIR + perfil.nome + '?',
          header: MensagemUtil.CONFIRMATION_CONFIRM,
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: MensagemUtil.CONFIRMATION_ACCEPT,
          rejectLabel: MensagemUtil.CONFIRMATION_REJECT,
          accept: () => {
            this.blockUI.start(MensagemUtil.BLOCKUI_EXCLUINDO);
            this.perfilService.delete(perfil.id).pipe(finalize(() => this.blockUI.stop()))
            .subscribe(
              response => {
                this.perfis = this.perfis.filter(val => val.id !== perfil.id);
                this.messageService.add({severity: ConstantUtil.SEVERITY_SUCCESS, summary: ConstantUtil.SUMMARY_SUCCESSFUL, detail: MensagemUtil.PERFIL_EXCLUIDO, life: ConstantUtil.LIFE});
              },
              (err) => {
                let {error} = err;
                  this.messageService.add({severity: ConstantUtil.SEVERITY_ERROR, summary: ConstantUtil.SUMMARY_ERROR, detail: error.message, life: ConstantUtil.LIFE});
              });
          }
      });
  }

  hideDialog() {
      this.perfilDialog = false;
      this.submitted = false;
  }

  closeDialog() {
    this.perfis = [...this.perfis];
    this.perfilDialog = false;
    this.perfil = new Perfil();
  }

  savePerfil() {
      this.submitted = true;

      if (this.perfil.nome.trim()) {
          if (this.perfil.id) {
              this.blockUI.start(MensagemUtil.BLOCKUI_ATUALIZANDO);
              this.perfilService.update(this.perfil.id, this.perfil).pipe(finalize(() => this.blockUI.stop()))
              .subscribe(response => {
                this.perfil = response;
                this.perfis[this.findIndexById(this.perfil.id)] = this.perfil;
                this.messageService.add({severity: ConstantUtil.SEVERITY_SUCCESS, summary: ConstantUtil.SUMMARY_SUCCESSFUL, detail: MensagemUtil.PERFIL_ATUALIZADO, life: ConstantUtil.LIFE});
                this.closeDialog();
              },
              (err) => {
                let {error} = err;
                  this.messageService.add({severity: ConstantUtil.SEVERITY_ERROR, summary: ConstantUtil.SUMMARY_ERROR, detail: error.message, life: ConstantUtil.LIFE});
              });
          } else {
              this.blockUI.start(MensagemUtil.BLOCKUI_SALVANDO);
              this.perfilService.save(this.perfil).pipe(finalize(() => this.blockUI.stop()))
              .subscribe(response => {
                this.perfil = response;
                this.perfis.push(this.perfil);
                this.messageService.add({severity: ConstantUtil.SEVERITY_SUCCESS, summary: ConstantUtil.SUMMARY_SUCCESSFUL, detail: MensagemUtil.PERFIL_CADASTRADO, life: ConstantUtil.LIFE});
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
      for (let i = 0; i < this.perfis.length; i++) {
          if (this.perfis[i].id === id) {
              index = i;
              break;
          }
      }
      return index;
  }
}
