import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

let texto: string = fs.readFileSync('./client/prod.txt', 'utf8');
let palabras: string [] = texto.split('\r\n');
let textoFinal = [];
for(let i = 0; i < palabras.length; i++){
    textoFinal[i] = palabras[i].split(',');
}


@Injectable()
export class ProductoService {
    private static readonly CANTIDAD_PRODUCTOS = 10;
    public getProducto(): any {
        let productos = [];
        for (let i = 0; i < ProductoService.CANTIDAD_PRODUCTOS;
            i++) {
            let producto = {
                'producto': `producto: ${i} `,
                'precio': `$${textoFinal[i][1]}`,
                'descripccion': textoFinal[i][0]
            };
            productos.push(producto);
        }
        return productos;
    }
}
