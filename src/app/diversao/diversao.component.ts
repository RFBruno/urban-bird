import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-diversao',
  templateUrl: './diversao.component.html',
  styleUrls: ['./diversao.component.scss']
})
export class DiversaoComponent implements OnInit {

  public divOfertas: Oferta[] = [];

  constructor(
    private ofertasService: OfertasService
  ) { }

  async ngOnInit(){ 
    this.divOfertas = await this.ofertasService.getOfertasPorCategoria('diversao');
  }

}
