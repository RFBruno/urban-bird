import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name : 'cl'
})
export class Console implements PipeTransform {
    transform(value: any, dir?:boolean) {
        if(dir){
            console.dir(value);
        }else{
            console.log(value);
        }
    }
}