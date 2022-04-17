import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Oferta } from "./shared/oferta.model";
import { environment as env } from '../environments/environment'
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class OfertasService {

    constructor(
        private http: HttpClient
    ){}

    public ofertas: Oferta[] = [];

    public getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${env.URL_API}/ofertas?destaque=true`)
        .toPromise()
        .then((resposta:any) => resposta);
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]>{
        return this.http.get(`${env.URL_API}/ofertas?categoria=${categoria}`)
            .toPromise()
            .then((resposta:any) => resposta);
    }

    public getOferta(id:number): Promise<Oferta>{
        return this.http.get(`${env.URL_API}/ofertas/${id}`)
            .toPromise()
            .then((resposta:any) => resposta);
    }

    public getComoUserOferta(id: number): Promise<string>{
        return this.http.get(`${env.URL_API}/como-usar/${id}`)
            .toPromise()
            .then((resposta:any) => resposta.descricao);
    }

    public getOndeFicaOferta(id: number): Promise<string>{
        return this.http.get(`${env.URL_API}/onde-fica/${id}`)
            .toPromise()
            .then((resposta:any) => resposta.descricao);
    }

    public pesquisaOfertas(termo: string): Observable<Oferta[]>{
        return this.http.get(`${env.URL_API}/ofertas?descricao_oferta_like=${termo}`)
            .pipe((resposta:any) => resposta);
    }

    // Exemplo de promise
    // public getOfertas2(): Promise<Oferta[]>{

    //     return new Promise<Oferta[]>((resolve, reject) =>{
    //         let check: boolean = true;

    //         if(check){
    //             setTimeout(() => resolve( this.ofertas ),  3000);
    //         }else{
    //             reject({erro:404, mensage: 'Serviço não encontrado'});
    //         }
            
    //     }).then((ofertas: Oferta[]) => {
            
    //         console.log('Primeiro then',ofertas);
    //         return ofertas;

    //     }).then((ofertas: Oferta[]) =>{
            
    //         console.log('Segundo then');
    //         return new Promise<Oferta[]>((resolve2, reject2)=>{
    //             setTimeout(() => {
    //                 resolve2(ofertas);
    //             }, 3000);
    //         });

    //     }).then((ofertas: Oferta[]) =>{
           
    //         console.log('Terceiro then, aguarda o retorno da promessa');
    //         return ofertas;

    //     });
    // }

}