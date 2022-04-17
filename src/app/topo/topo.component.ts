import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.scss']
})
export class TopoComponent implements OnInit {

  public ofertas?: Observable<Oferta[]>;
  private subjectOfertas: Subject<string> = new Subject<string>();

  constructor(
    private ofertasServices: OfertasService
  ) { }

  async ngOnInit() {
    this.ofertas = this.subjectOfertas
      .pipe(
        switchMap((termo:string) =>{
          return this.ofertasServices.pesquisaOfertas(termo);
        })
      );

    this.ofertas.subscribe((ofertas:Oferta[]) => console.log(ofertas));
  }

  public pesquisar(termo: string): void{
   this.subjectOfertas.next(termo);
  }

}
