import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cargo } from '../model/cargo';
import { Observable } from 'rxjs';
import { Pageable } from '../util/pageable';
import { RequestUtil } from '../shared/request-util';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  private cargosUrl: string;

  constructor(private http: HttpClient) {
    this.cargosUrl = 'http://localhost:8080/api/cargo';
  }

  findAll(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(this.cargosUrl);
  }

  findByNome(nome: string, pageable?: Pageable): Observable<any> {
    let params = RequestUtil.getRequestParams( pageable )
    params = params.append('nome', nome);

    return this.http.get<any>(`${this.cargosUrl}/filtrar`, { params: params });
  }

  findById(id: number): Observable<Cargo> {
    return this.http.get<Cargo>(`${this.cargosUrl}/${id}`);
  }

  save(cargo: Cargo): Observable<Cargo> {
    return this.http.post<Cargo>(this.cargosUrl, cargo);
  }

  update(id: number, cargo: Cargo): Observable<Cargo> {
    return this.http.put<Cargo>(`${this.cargosUrl}/${id}`, cargo);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.cargosUrl}/${id}`);
  }
}
