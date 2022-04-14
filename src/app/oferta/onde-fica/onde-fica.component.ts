import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from 'src/app/ofertas.service';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.scss']
})
export class OndeFicaComponent implements OnInit {

  public ondeFica: string = '';

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
  ) { }

  async ngOnInit(){
    const ofertaId = this.route.parent?.snapshot.params.id;
    this.ondeFica = await this.ofertasService.getOndeFicaOferta(ofertaId);

  }

}
