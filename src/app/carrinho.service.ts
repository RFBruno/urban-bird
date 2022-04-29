import { Injectable } from "@angular/core";
import { ItemCarrinho } from "./shared/item-carrinho.model";
import { Oferta } from "./shared/oferta.model";

@Injectable({
    providedIn: 'root'
})
class CarrinhoService {
    public itens: ItemCarrinho[] = [];

    public exibirItens(): ItemCarrinho[] {
        return this.itens;
    }

    public incluirItem(oferta: Oferta): void{
        let item: ItemCarrinho = new ItemCarrinho(
            oferta.id,
            oferta.imagens[0],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1
        );

        let itemEncontrado = this.itens.find(i => i.id === item.id);

        if(itemEncontrado){
            itemEncontrado.quantidade += 1;
        }else{
            this.itens.push(item);
        }
    }

    public totalCarrinho(): number{
        let total = 0;
        
        this.itens.forEach( item =>{
            total += (item.valor * item.quantidade);
        })

        return total;
    }

    public alterarQuantidade(item: ItemCarrinho, increment:boolean): void{
        let itemEncontrado = this.itens.find(i => i.id === item.id);

        if(itemEncontrado){
            if(increment){
                itemEncontrado.quantidade += 1;
            }else{
                itemEncontrado.quantidade -= 1;

                if(itemEncontrado.quantidade === 0){
                    this.itens.splice(this.itens.indexOf(itemEncontrado),1);
                }
            }
        }

    }

    public limparCarrinho(): void{
        this.itens = [];
    }
}

export {CarrinhoService};