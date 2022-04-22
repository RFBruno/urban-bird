import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service';
import { Pedido } from '../shared/pedido.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.scss']
})
export class OrdemCompraComponent implements OnInit {

  public pedido: Pedido = new Pedido('','','','');

  public endereco: string = '';
  public numero: string = '';
  public complemento: string = '';
  public formaDePagamento: string = '';

  public endIsValid: boolean = false;
  public numIsValid: boolean = false;
  public compIsValid: boolean = false;
  public formaIsValid: boolean = false;

  public endPrimitivo: boolean = true;
  public numPrimitivo: boolean = true;
  public compPrimitivo: boolean = true;
  public formaPrimitivo: boolean = true;

  formEstado: string = 'disabled';


  constructor(
    private ordemCompraService: OrdemCompraService
  ) { }

  ngOnInit(): void {
  }

  public atualizaEndereco(value:string): void{
     this.endereco = value;
     this.endPrimitivo = false;

     if(this.endereco.length > 3){
       this.endIsValid = true;
     }else{
       this.endIsValid = false;
     }

     this.habilitaForm();
  }
  public atualizaNumero(value:string): void{
     this.numero = value;
     this.numPrimitivo = false;

     if(this.numero.length >= 1){
      this.numIsValid = true;
    }else{
      this.numIsValid = false;
    }

     this.habilitaForm();
  }
  public atualizaComplemento(value:string): void{
     this.complemento = value;
     this.compPrimitivo = false;

     if(this.complemento.length >= 1){
      this.compIsValid = true;
    }else{
      this.compIsValid = false;
    }
     this.habilitaForm();
  }

  public atualizaFormaDePagamento(value: string): void{
    this.formaDePagamento = value;
    this.formaPrimitivo = false;
    
    if(this.formaDePagamento === 'dinheiro' || this.formaDePagamento === 'debito'){
      this.formaIsValid = true;
    }else{
      this.formaIsValid = false;
    }
    this.habilitaForm();
  }

  public habilitaForm(): void{
    if(this.endereco && this.numero && this.formaDePagamento){
      this.formEstado = '';
    }else{
      this.formEstado = 'disabled';
    }
  }

  public confirmarCompra(): void{
    this.pedido.endereco = this.endereco;
    this.pedido.numero = this.numero;
    this.pedido.complemento = this.complemento;
    this.pedido.formaDePagamento = this.formaDePagamento;

    this.ordemCompraService.efetivarCompra(this.pedido).subscribe();
  }

}
