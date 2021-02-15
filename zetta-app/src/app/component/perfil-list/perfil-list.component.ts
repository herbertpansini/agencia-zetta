import { Component } from '@angular/core';
import { Perfil } from 'src/app/model/perfil';
import { PerfilService } from 'src/app/service/perfil.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-perfil-list',
  templateUrl: './perfil-list.component.html',
  styleUrls: ['./perfil-list.component.css'],
  providers: [ MessageService, ConfirmationService ]
})
export class PerfilListComponent {
  perfilDialog: boolean;

  perfis: Perfil[];

  perfil: Perfil;

  searchPerfil: string = '';

  totalRecords: number;

  loading: boolean;

  submitted: boolean;

  constructor(private perfilService: PerfilService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  loadPerfisByPage(event?) {
      this.loading = true;
      setTimeout(() => {
          this.perfilService.findAll(this.searchPerfil, (event.first / event.rows), event.rows).subscribe(response => {
              this.perfis = response.content;
              this.totalRecords = response.totalElements;
              this.loading = false;
            });
      }, 1000);
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
          message: 'Você deseja excluir perfil: ' + perfil.nome + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.perfilService.delete(perfil.id).subscribe(
              response => {
                this.perfis = this.perfis.filter(val => val.id !== perfil.id);
              });
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Perfil excluído', life: 3000});
          }
      });
  }

  hideDialog() {
      this.perfilDialog = false;
      this.submitted = false;
  }

  savePerfil() {
      this.submitted = true;

      if (this.perfil.nome.trim()) {
          if (this.perfil.id) {
              this.perfilService.update(this.perfil.id, this.perfil).subscribe(response => {
                this.perfil = response;
                this.perfis[this.findIndexById(this.perfil.id)] = this.perfil;
              });
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Perfil atualizado', life: 3000});
          } else {
              this.perfilService.save(this.perfil).subscribe(response => {
                this.perfil = response;
                this.perfis.push(this.perfil);
              });
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Perfil cadastrado', life: 3000});
          }

          this.perfis = [...this.perfis];
          this.perfilDialog = false;
          this.perfil = new Perfil();
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
