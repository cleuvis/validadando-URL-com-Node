
import fs, { watch } from 'fs';

import chalk from 'chalk';

function extraiLinks(texto){
    const regex=/\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm
    const capturas=[...texto.matchAll(regex)]
    /*O matcall e para poder pasasr uma expressao regular,e motrar o que foi passado pala expressão regular,
    separado ao texto*/
    //console.log(capturas)
    const resultados=capturas.map(captura=>({[captura[1]]:captura[2]}))
    //console.log(resultados)
    return resultados.length !== 0 ? resultados : 'Link não encontrado'  
}

function trataErro(erro){
   throw new Error(chalk.red(erro.code,'Não há um arquivo no diretório'))
}

    async function pegaArquivo(caminhoDoArquivo){
        try{
            const encoding='utf-8'
            const texto= await fs.promises
            .readFile(caminhoDoArquivo,encoding)
            return extraiLinks(texto)
        }catch(erro){
            trataErro(erro)
        }finally{
            console.log(chalk.white("Codigo finalizado"))
        }
    }
    export default pegaArquivo
    //pegaArquivo('./arquivos/texto.md');
    