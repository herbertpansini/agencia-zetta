import { Component } from '@angular/core';
import { Cargo } from 'src/app/model/cargo';
import { CargoService } from 'src/app/service/cargo.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cargo-list',
  templateUrl: './cargo-list.component.html',
  styleUrls: ['./cargo-list.component.css'],
  providers: [ MessageService, ConfirmationService ]
})
export class CargoListComponent {
  cargoDialog: boolean;

  cargos: Cargo[];

  cargo: Cargo;

  searchCargo: string = '';

  totalRecords: number;

  loading: boolean;

  submitted: boolean;

  constructor(private cargoService: CargoService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  loadCargosByPage(event?) {
      this.loading = true;
      setTimeout(() => {
          this.cargoService.findAll(this.searchCargo, (event.first / event.rows), event.rows).subscribe(response => {
              this.cargos = response.content;
              this.totalRecords = response.totalElements;
              this.loading = false;
            });
      }, 1000);
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
          message: 'Você deseja excluir cargo: ' + cargo.nome + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.cargoService.delete(cargo.id).subscribe(
              response => {
                this.cargos = this.cargos.filter(val => val.id !== cargo.id);
              });
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Cargo excluído', life: 3000});
          }
      });
  }

  hideDialog() {
      this.cargoDialog = false;
      this.submitted = false;
  }

  saveCargo() {
      this.submitted = true;

      if (this.cargo.nome.trim()) {
          if (this.cargo.id) {
              this.cargoService.update(this.cargo.id, this.cargo).subscribe(response => {
                this.cargo = response;
                this.cargos[this.findIndexById(this.cargo.id)] = this.cargo;
              });
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Cargo atualizado', life: 3000});
          } else {
              this.cargoService.save(this.cargo).subscribe(response => {
                this.cargo = response;
                this.cargos.push(this.cargo);
              });
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Cargo cadastrado', life: 3000});
          }

          this.cargos = [...this.cargos];
          this.cargoDialog = false;
          this.cargo = new Cargo();
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
