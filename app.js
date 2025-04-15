const express = require("express")
const app = express()
const port = 3000
const cors = require("cors")
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient
const path = require('path')
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({storage:storage})
app.use(express.json({limit:'50mb'}))

app.use(express.json())
app.use(cors())
app.use(express.static("html"))

app.listen(port, (req,res)=>{
    console.log(`Rodando na porta ${port}`)
})
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, "html", "index.html"))
})
app.post('/logar', async(req,res)=>{
    const {nome,senha} = req.body
    try{
        const logar = await prisma.user.findFirst({where:{nome:nome, senha:senha}})
        if(logar){
            console.log("logado com sucesso!!!")
            res.json({menssagem:"Usuário encontrado!!!", logado:true})
        }
        else{
            res.json({menssagem:"Usuário ou senha incorretos"})
        }
    }
    catch(error){
        console.error("Erro ao tentar logar")
    }
})
app.get('/lista', (req,res)=>{
    res.sendFile(path.join(__dirname, "html", "lista.html"))
})
app.post('/personagens',async (req,res)=>{
    try{
        const {nome} = req.body
        const busca = await prisma.personagens.findMany({where:{nomePlayer:nome}})
        if(busca){
            res.json(busca)
        }
    }
    catch(error){
        console.error('Erro ao executar personagens')
    }
})
app.get('/:nomePerson', async(req,res)=>{
    const nomePerson = req.params.nomePerson
    res.sendFile(path.join(__dirname,"html","personagem.html"))
})
app.post('/atributos', async(req,res)=>{
    const {nomePerson} = req.body
    const puxaAtrib = await prisma.personagens.findUnique({where:{nomePerson:nomePerson}})
    res.json(puxaAtrib)
})
app.post('/salvar',async(req,res)=>{
    const {nomePerson, vida,lvl,xp,inventario,descricao, corText, corInputs,imagem} = req.body
    const salvar = await prisma.personagens.update({where:{nomePerson:nomePerson}, 
        data:{vida:vida,
            lvl:lvl,
            xp:xp,
            inventario:inventario,
            descricao:descricao,
            corText:corText,
            corInputs:corInputs,
            imagem:imagem
        }})
        if(salvar){
            res.json({menssagem:"Salvo com sucesso!!!"})
        }
        else{
            res.json({menssagem:"Erro ao salvar"})
        }
})