//QUANDO A PÁGINA CARREGAR
document.addEventListener("DOMContentLoaded", function(){
    //COMANDO PARA A IMAGEM CARREGADA:
    const imagemInput = document.getElementById("imagemInput")
    const imagem = document.getElementById("imagem")
    imagemInput.addEventListener("change", function(e){
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onloadend = function(event){
            const img = event.target.result
            imagem.src = img
        }
            if(file){
                 reader.readAsDataURL(file)
            }
    })
    //COMANDO PARA MUDAR CORES COM OS INPUTS:
    const corText = document.getElementById("corText")
    corText.addEventListener("input", function(){
        const labels = document.querySelectorAll("label")
        const divs = document.querySelectorAll("div[contentEditable]")
        const titulos = document.querySelectorAll("h1")
        titulos.forEach((t)=>{
            t.style.color = corText.value
        })
        divs.forEach((d)=>{
            d.style.color = corText.value
        })
        labels.forEach((l)=>{
            l.style.color = corText.value
        })
    })
        const corInputs = document.getElementById("corInputs")
        corInputs.addEventListener("input", function(){
            const divs = document.querySelectorAll("div[contentEditable]")
            divs.forEach((d)=>{
                d.style.backgroundColor = corInputs.value
            })
    })
   
    //CRIANDO CONSTANTES:
    const titulo = document.getElementById("titulo")
    const nomePerson = localStorage.getItem("nomePerson")
    titulo.textContent = nomePerson
    const lvl = document.getElementById("lvl")
    const vida = document.getElementById('vida')
    const inventario = document.getElementById('inventario')
    const descricao = document.getElementById('descricao')
    const xp = document.getElementById("xp")
    //PEGANDO OS ATRIBUTOS DO BACK:
    fetch('https://rherois.onrender.com/atributos',{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify({nomePerson:nomePerson})
    })
    .then(response=>response.json())
    //SETANDO OS VALORES NAS BARRAS:
    .then(data=>{
        vida.textContent = data.vida
        lvl.textContent = data.lvl
        inventario.textContent = data.inventario
        descricao.textContent = data.descricao
        xp.textContent = data.xp
        corText.value = data.corText
        corInputs.value = data.corInputs
        imagem.src = data.imagem
        document.body.style.backgroundImage = `linear-gradient(to top, rgba(56, 56, 56, 0.81), rgba(0,0,0,0)), url(${data.imagem})`
        document.body.style.backgroundPosition = "center"
        document.body.style.backgroundSize = "cover"
        document.body.style.backgroundRepeat = "no-repeat"
        const labels = document.querySelectorAll("label")
        const titulos = document.querySelectorAll("h1")
        const divs = document.querySelectorAll("div[contentEditable]")
        titulos.forEach((t)=>{
            t.style.color = corText.value
        })
        divs.forEach((d)=>{
            d.style.color = corText.value
        })
        labels.forEach((l)=>{
            l.style.color = corText.value
        })
        divs.forEach((d)=>{
            d.style.backgroundColor = corInputs.value
        })
    })

})
 
//SALVANDO OS DADOS DIGITADOS:
function salvar(){
    const nomePerson = localStorage.getItem("nomePerson")
    const vida = document.getElementById("vida").textContent
    const lvl = document.getElementById("lvl").textContent
    const xp = document.getElementById("xp").textContent
    const inventario = document.getElementById("inventario").textContent
    const descricao = document.getElementById("descricao").textContent
    const corText = document.getElementById("corText").value
    const corInputs = document.getElementById("corInputs").value
    const imagem = document.getElementById("imagem")
    const query = {
        nomePerson:nomePerson,
        vida:vida,
        lvl:lvl,
        xp:xp,
        inventario:inventario,
        descricao:descricao,
        corText:corText,
        corInputs:corInputs,
        imagem:imagem.src
    }
    fetch('https://rherois.onrender.com/salvar',{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify(query)
    })
    .then(response=>response.json())
    .then(data=>{
        const resultado = document.getElementById("resultado")
        resultado.textContent = data.menssagem
        document.body.style.backgroundImage = `linear-gradient(to top, rgba(56, 56, 56, 0.81), rgba(0,0,0,0)), url(${imagem.src})`
        document.body.style.backgroundPosition = "center"
        document.body.style.backgroundSize = "cover"
        document.body.style.backgroundRepeat = "no-repeat"
        setTimeout(function(){
            resultado.textContent = ""
        },1000)
    })
}
