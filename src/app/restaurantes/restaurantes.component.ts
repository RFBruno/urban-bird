import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.scss']
})
export class RestaurantesComponent implements OnInit {

  public restOfertas: Oferta[] = [];

  constructor(
    private ofertasService: OfertasService
  ) { }

  async ngOnInit() {
    this.restOfertas = await this.ofertasService.getOfertasPorCategoria('restaurante');
  
    console.log(this.restOfertas);
  }

}
