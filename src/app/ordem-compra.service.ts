import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from './shared/pedido.model';
import { environment as env } from '../environments/environment'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdemCompraService {

  constructor(
    private http: HttpClient
  ) { }

  public efetivarCompra(pedido: Pedido): Observable<any> {
    return this.http.post(`${env.URL_API}/pedidos`,pedido)
        .pipe(map((resposta: any) => resposta.id));
  }
}
