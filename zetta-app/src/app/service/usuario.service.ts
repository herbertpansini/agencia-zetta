import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../model/usuario';
import { Observable } from 'rxjs';
import { UsuarioFiltro } from '../model/usuario-filtro';
import { Pageable } from '../util/pageable';
import { RequestUtil } from '../shared/request-util';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService  {

  private usuariosUrl: string;

  constructor(private http: HttpClient) {
    this.usuariosUrl = 'http://localhost:8080/api/usuario';
  }

  findAll(usuarioFiltro: UsuarioFiltro, pageable?: Pageable): Observable<any> {
    return this.http.post<any>(`${this.usuariosUrl}/filtrar`, usuarioFiltro, { params: RequestUtil.getRequestParams( pageable ) });
  }

  findById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.usuariosUrl}/${id}`);
  }

  save(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.usuariosUrl, usuario);
  }

  update(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.usuariosUrl}/${id}`, usuario);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.usuariosUrl}/${id}`);
  }
}
