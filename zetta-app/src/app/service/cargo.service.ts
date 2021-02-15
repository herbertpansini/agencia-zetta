import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cargo } from '../model/cargo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  private cargosUrl: string;

  constructor(private http: HttpClient) {
    this.cargosUrl = 'http://localhost:8080/api/cargo';
  }

  /*
  findAllCargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(`${this.categoriasUrl}/all`);
  }
  */

  findAll(nome: string, pageNumber: number, pageSize: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('nome', nome);
    params = params.append('page', pageNumber.toString());
    params = params.append('size', pageSize.toString());

    return this.http.get<any>(this.cargosUrl, { params: params });
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
