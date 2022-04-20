import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.scss']
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]> = of<Oferta[]>([]);
  
  private subjectOfertas: Subject<string> = new Subject<string>();

  constructor(
    private ofertasServices: OfertasService
  ) { }

  async ngOnInit() {
    this.ofertas = this.subjectOfertas
      .pipe(
        debounceTime(500)
      )
      .pipe(
        distinctUntilChanged()
      )
      .pipe(
        switchMap((termo:string) =>{

          if(termo.trim() === ''){
            return of<Oferta[]>([]);
          }

          return this.ofertasServices.pesquisaOfertas(termo);
        })
      )
      .pipe(
        catchError((err)=>{
          console.log(err);
          return of<Oferta[]>([]);
        })
      )
  }

  public pesquisar(termo: string): void{
   this.subjectOfertas.next(termo);
  }

  public limpaPesquisa(): void{
    this.subjectOfertas.next('');
  }

}
