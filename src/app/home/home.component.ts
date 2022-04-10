import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ OfertasService ]
})
export class HomeComponent implements OnInit {

  public ofertas?: Oferta[];

  constructor(
    private ofertasService: OfertasService
  ) { }

  ngOnInit(): void {
    this.ofertasService.getOfertas()
    .then(
      (ofertas: Oferta[]) => {
        console.log('Executada após o retorno da promessa');
        this.ofertas = ofertas
      })
    .catch(
      (param: any) => console.log(param)
    );

    console.log(this.ofertas);
  }

}
