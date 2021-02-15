import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Perfil } from '../model/perfil';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService  {

  private perfisUrl: string;

  constructor(private http: HttpClient) {
    this.perfisUrl = 'http://localhost:8080/api/perfil';
  }

  /*
  findAllPerfis(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(`${this.perfisUrl}/all`);
  }
  */

  findAll(nome: string, pageNumber: number, pageSize: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('nome', nome);
    params = params.append('page', pageNumber.toString());
    params = params.append('size', pageSize.toString());

    return this.http.get<any>(this.perfisUrl, { params: params });
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
