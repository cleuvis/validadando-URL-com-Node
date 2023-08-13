import chalk from "chalk"

function extraiLinks(arrLinks){
 return arrLinks.map((objetoLink)=>Object.values(objetoLink).join())
}

async function checaStatus(listaURLs){
    const arrStatus=await Promise.all(
        listaURLs.map(async(url)=>{
            try{
                const response=await fetch(url)
                //console.log(response)
                //return response.status
                return `${response.status} - ${response.statusText}`;
            }catch(erro){
                return manejaErros(erro)
            }
        })
    )
    return arrStatus
}
function manejaErros(erro){
    if(erro.cause.code==='ENOTFOUND'){
        return 'link nao encontrado'
    }else{
       return "Algo deu errado!"
    }
}

export default async function listaValidada(listaDeLinks){
    const urlExtraida= extraiLinks(listaDeLinks)
    const status= await checaStatus(urlExtraida)
    //console.log(urlExtraida)
    return listaDeLinks.map((objeto,indice)=>({...objeto,Status:status[indice]}))
   // return status   
}
                              // para rodar o meu projeto 
//npm run cli:valida
//node ./src/cli.js ./arquivos/ --valida
//node ./src/cli.js ./arquivos/texto.md --valida
              //////////
//node ./src/cli.js ./arquivos/
//node ./src/cli.js ./arquivos/texto.md
//npm run cli ./arquivos/
//npm run cli ./caminho/caminho/arquivo.md
//npm run cli ./caminho/caminho/arquivo.md -- --valida
