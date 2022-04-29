import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CarrinhoService } from '../carrinho.service';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.scss']
})
export class OfertaComponent implements OnInit {

  public oferta: Oferta = new Oferta;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit(){
    this.route.params.subscribe( async (parametros: Params) =>{
      this.oferta = await this.ofertasService.getOferta(parametros.id);
    });
  }

  public incluirAoCarrinho(): void {
    this.carrinhoService.incluirItem(this.oferta);
    this.carrinhoService.exibirItens();
  }

}
