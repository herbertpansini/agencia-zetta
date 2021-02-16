import { Component } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Cargo } from 'src/app/model/cargo';
import { CargoService } from 'src/app/service/cargo.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { MensagemUtil } from 'src/app/util/mensagem.util';
import { ConstantUtil } from 'src/app/util/constant.util';
import { finalize } from 'rxjs/operators';
import { PageableUtil } from 'src/app/util/pageable.util';

@Component({
  selector: 'app-cargo-list',
  templateUrl: './cargo-list.component.html',
  styleUrls: ['./cargo-list.component.css'],
  providers: [ MessageService, ConfirmationService ]
})
export class CargoListComponent {

  @BlockUI() blockUI: NgBlockUI;

  cargoDialog: boolean;

  cargos: Cargo[];

  cargo: Cargo;

  searchCargo: string = '';

  totalRecords: number;

  submitted: boolean;

  colunas: { field: string, label: string, sort: string, width: string }[] = [
      { field: 'id', label: '#', sort: 'id', width: 'auto' },
      { field: 'nome', label: 'Nome', sort: 'nome', width: 'auto' },
  ];

  constructor(private cargoService: CargoService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  loadCargosByPage(event?) {
      this.blockUI.start(MensagemUtil.BLOCKUI_CARREGANDO);
      const pageable = PageableUtil.buildPageable(event);
      this.cargoService.findByNome(this.searchCargo, pageable)
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe(response => {
          this.cargos = response.content;
          this.totalRecords = response.totalElements;
      });
  }

  openNew() {
      this.cargo = new Cargo();
      this.submitted = false;
      this.cargoDialog = true;
  }

  editCargo(cargo: Cargo) {
      this.cargo = {...cargo};
      this.cargoDialog = true;
  }

  deleteCargo(cargo: Cargo) {
      this.confirmationService.confirm({
          message: MensagemUtil.CARGO_EXCLUIR + cargo.nome + '?',
          header: MensagemUtil.CONFIRMATION_CONFIRM,
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: MensagemUtil.CONFIRMATION_ACCEPT,
          rejectLabel: MensagemUtil.CONFIRMATION_REJECT,
          accept: () => {
            this.blockUI.start(MensagemUtil.BLOCKUI_EXCLUINDO);
            this.cargoService.delete(cargo.id).pipe(finalize(() => this.blockUI.stop()))
            .subscribe(
              response => {
                this.cargos = this.cargos.filter(val => val.id !== cargo.id);
                this.messageService.add({severity:ConstantUtil.SEVERITY_SUCCESS, summary: ConstantUtil.SUMMARY_SUCCESSFUL, detail: MensagemUtil.CARGO_EXCLUIDO, life: ConstantUtil.LIFE});
              },
              (err) => {
                let {error} = err;
                  this.messageService.add({severity:ConstantUtil.SEVERITY_ERROR, summary: ConstantUtil.SUMMARY_ERROR, detail: error.message, life: ConstantUtil.LIFE});
              });
          }
      });
  }

  hideDialog() {
      this.cargoDialog = false;
      this.submitted = false;
  }

  closeDialog() {
    this.cargos = [...this.cargos];
    this.cargoDialog = false;
    this.cargo = new Cargo();
  }

  saveCargo() {
      this.submitted = true;

      if (this.cargo.nome.trim()) {
          if (this.cargo.id) {
              this.blockUI.start(MensagemUtil.BLOCKUI_ATUALIZANDO);
              this.cargoService.update(this.cargo.id, this.cargo).pipe(finalize(() => this.blockUI.stop()))
              .subscribe(response => {
                this.cargo = response;
                this.cargos[this.findIndexById(this.cargo.id)] = this.cargo;
                this.messageService.add({severity:ConstantUtil.SEVERITY_SUCCESS, summary: ConstantUtil.SUMMARY_SUCCESSFUL, detail: MensagemUtil.CARGO_ATUALIZADO, life: ConstantUtil.LIFE});
                this.closeDialog();
              },
              (err) => {
                let {error} = err;
                  this.messageService.add({severity:ConstantUtil.SEVERITY_ERROR, summary: ConstantUtil.SUMMARY_ERROR, detail: error.message, life: ConstantUtil.LIFE});
              });
          } else {
              this.blockUI.start(MensagemUtil.BLOCKUI_SALVANDO);
              this.cargoService.save(this.cargo).pipe(finalize(() => this.blockUI.stop()))
              .subscribe(response => {
                this.cargo = response;
                this.cargos.push(this.cargo);
                this.messageService.add({severity:ConstantUtil.SEVERITY_SUCCESS, summary: ConstantUtil.SUMMARY_SUCCESSFUL, detail: MensagemUtil.CARGO_CADASTRADO, life: ConstantUtil.LIFE});
                this.closeDialog();
              },
              (err) => {
                let {error} = err;
                  this.messageService.add({severity:ConstantUtil.SEVERITY_ERROR, summary: ConstantUtil.SUMMARY_ERROR, detail: error.message, life: ConstantUtil.LIFE});
              });
          }
      }
  }

  findIndexById(id: number): number {
      let index = -1;
      for (let i = 0; i < this.cargos.length; i++) {
          if (this.cargos[i].id === id) {
              index = i;
              break;
          }
      }
      return index;
  }
}
