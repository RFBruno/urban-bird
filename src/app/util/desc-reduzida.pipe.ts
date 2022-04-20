import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'reduzirDescricao'
})
export class DescReduzida implements PipeTransform {
    
    transform(texto: string, trucarEm: number ){

        if(texto.length > 15){
            return texto.substring(0,trucarEm) + '...';
        }

        return texto;
    }
}