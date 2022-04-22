export class Pedido {
    constructor(
        public endereco: string,
        public numero: string,
        public complemento: string,
        public formaDePagamento: string,
    ){}
}