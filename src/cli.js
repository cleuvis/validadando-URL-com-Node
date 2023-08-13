
//#!/usr/bin/env node
import pegaArquivo from './index.js'
import fs, { lstatSync } from 'fs'
import chalk from 'chalk'
import { error } from 'console'
import listaValidada from './http-validacao.js'
 
const caminho=process.argv
console.log(caminho)

async function imprimeLista(valida,resultado,identificador =''){
  if(valida){
    console.log(chalk.yellow("Lista Validada"),chalk.black.bgGreen(identificador),await listaValidada(resultado))
  }else{
    console.log(chalk.yellow("Lista de links"),chalk.black.bgGreen(identificador),resultado)
  }
}

async function ProcessaTexto(argumentos){
  const caminho=argumentos[2]
  //console.log(caminho)
  const valida=argumentos[3]==="--valida"
  try{
    fs.lstatSync(caminho)
 }catch(erro){
  if(erro.code ==='ENOENT'){
   Console.log('Diretorio ou arquivo não encontrado.')
   return
  }
 }
  if(fs.lstatSync(caminho).isFile()){
    const resultado=await pegaArquivo(argumentos[2])
    imprimeLista(valida,resultado)
    //essa func e chamada quando no final coloco o texto.md ou texto cop.md
  }else if(fs.lstatSync(caminho).isDirectory()){
    //lstatSync obtem metodos detalhados do arquivo ou diretorio de forma sincrona 
    const arquivos=await fs.promises.readdir(caminho)
    //readdir retorna uma array de todos os nomes de arquivo no diretório
    arquivos.forEach(async (nomeDeArquivo) => {
      const lista=await pegaArquivo(`${caminho}/${nomeDeArquivo}`)
      //caminho = /arquivos
      //nomeDeArquivo = texto cop.md    e   texto.md
      imprimeLista(valida,lista,nomeDeArquivo)
    });
  }
 }
ProcessaTexto(caminho)











