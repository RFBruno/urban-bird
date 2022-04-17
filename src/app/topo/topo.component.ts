import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.scss']
})
export class TopoComponent implements OnInit {

  public ofertas: Oferta[]  = [];

  constructor(
    private ofertasServices: OfertasService
  ) { }

  ngOnInit(): void {
  }

  public pesquisar(termo: string): void{
    let observableOfertas = this.ofertasServices.pesquisaOfertas(termo)
    observableOfertas.subscribe(
      (ofertas: Oferta[]) => console.log(ofertas)
    );
  }

}
