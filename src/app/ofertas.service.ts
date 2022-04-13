import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Oferta } from "./shared/oferta.model";

@Injectable({
    providedIn: 'root'
})
export class OfertasService {

    constructor(
        private http: HttpClient
    ){}

    public ofertas: Oferta[] = [];

    public getOfertas(): Promise<Oferta[]> {
        return this.http.get('http://localhost:3000/ofertas?destaque=true')
        .toPromise()
        .then((resposta:any) => resposta);
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]>{
        return this.http.get(`http://localhost:3000/ofertas?categoria=${categoria}`)
            .toPromise()
            .then((resposta:any) => resposta);
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