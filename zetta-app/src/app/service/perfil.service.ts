import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Perfil } from '../model/perfil';
import { Observable } from 'rxjs';
import { Pageable } from '../util/pageable';
import { RequestUtil } from '../shared/request-util';

@Injectable({
  providedIn: 'root'
})
export class PerfilService  {

  private perfisUrl: string;

  constructor(private http: HttpClient) {
    this.perfisUrl = 'http://localhost:8080/api/perfil';
  }

  findAll(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(this.perfisUrl);
  }

 findByNome(nome: string, pageable?: Pageable): Observable<any> {
    let params = RequestUtil.getRequestParams( pageable )
    params = params.append('nome', nome);

    return this.http.get<any>(`${this.perfisUrl}/filtrar`, { params: params });
  }

  findById(id: number): Observable<Perfil> {
    return this.http.get<Perfil>(`${this.perfisUrl}/${id}`);
  }

  save(perfil: Perfil): Observable<Perfil> {
    return this.http.post<Perfil>(this.perfisUrl, perfil);
  }

  update(id: number, perfil: Perfil): Observable<Perfil> {
    return this.http.put<Perfil>(`${this.perfisUrl}/${id}`, perfil);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.perfisUrl}/${id}`);
  }
}
