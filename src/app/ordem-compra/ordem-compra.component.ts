import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CarrinhoService } from '../carrinho.service';
import { OrdemCompraService } from '../ordem-compra.service';
import { ItemCarrinho } from '../shared/item-carrinho.model';
import { Pedido } from '../shared/pedido.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.scss']
})
export class OrdemCompraComponent implements OnInit {

   public itensCarrinho: ItemCarrinho[] = [];
   public idPedido?: number;  
   public formulario: FormGroup = new FormGroup({
     'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
     'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
     'complemento': new FormControl(null),
     'formaPagamento': new FormControl(null, [Validators.required]),
   });

  constructor(
    private ordemCompraService: OrdemCompraService,
    public carrinhoService: CarrinhoService
  ) { }

  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.exibirItens();
  }

  public confirmarCompra(): void{
    if(this.formulario.status === 'INVALID'){
      let campos = this.formulario.controls;
      Object.keys(campos).forEach(campo =>{
        this.formulario.get(campo)?.markAsTouched();
      })
    }else{

      if(this.carrinhoService.exibirItens().length){
        let pedido: Pedido = new Pedido(
          this.formulario.value.endereco,
          this.formulario.value.numero,
          this.formulario.value.complemento,
          this.formulario.value.formaPagamento,
          this.carrinhoService.exibirItens()
          );
          
          this.ordemCompraService.efetivarCompra(pedido).subscribe((idPedido: number) =>{
            this.idPedido = idPedido;
            this.carrinhoService.limparCarrinho();
          })

      }else{
        alert('Nenhum item adicionado ao carrinho.')
      }


    }
  }

  public adicionar(item: ItemCarrinho): void{
    this.carrinhoService.alterarQuantidade(item, true);
  }

  public diminuir(item: ItemCarrinho): void{
    this.carrinhoService.alterarQuantidade(item, false);
  }

}
