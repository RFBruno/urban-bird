import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { OrdemCompraService } from '../ordem-compra.service';
import { Pedido } from '../shared/pedido.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.scss']
})
export class OrdemCompraComponent implements OnInit {

   public idPedido?: number;  
   public formulario: FormGroup = new FormGroup({
     'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
     'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
     'complemento': new FormControl(null),
     'formaPagamento': new FormControl(null, [Validators.required]),
   });

  constructor(
    private ordemCompraService: OrdemCompraService
  ) { }

  ngOnInit(): void {
  }

  public confirmarCompra(): void{
    console.log(this.formulario);
    if(this.formulario.status === 'INVALID'){
      let campos = this.formulario.controls;
      Object.keys(campos).forEach(campo =>{
        this.formulario.get(campo)?.markAsTouched();
      })
    }else{
      let pedido: Pedido = new Pedido(
        this.formulario.value.endereco,
        this.formulario.value.numero,
        this.formulario.value.complemento,
        this.formulario.value.formaPagamento,
      );

      this.ordemCompraService.efetivarCompra(pedido).subscribe((idPedido: number) =>{
        this.idPedido = idPedido;
      })
    }
  }

}
