

document.addEventListener("DOMContentLoaded", function(){
    const nome = localStorage.getItem("nome")
    const titulo = document.getElementById("titulo")
    const container = document.getElementById("personagens")
    //charAt serve para pegar um caractere do nome, toUpperCase para transforma-lo em maisculo, e nome.slice() para digitar resto
    titulo.textContent = nome.charAt(0).toUpperCase()+nome.slice(1) +" personagens:"
    titulo.style.color = "white"
    //'http://localhost:3000/personagens'
    
    fetch('https://rherois.onrender.com/personagens',{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({nome:nome})
    })
    .then(response=>response.json())
    .then(data=>{
        data.forEach((p)=>{
            let texto = document.createElement('p')
            let caixa = document.createElement('div')
            texto.textContent = p.nomePerson
            texto.style.color = "white"
            caixa.style.backgroundColor = "rgb(77, 96, 114)"
            caixa.style.display = "flex"
            caixa.style.width = "10vw"
            caixa.style.height = "30px"
            caixa.style.borderRadius = "10px"
            caixa.style.textAlign = "center"
            caixa.style.justifyContent = "center"
            caixa.style.alignItems = "center"
            caixa.style.cursor = "pointer"
            caixa.onclick = ()=> mudar(p.nomePerson)
            caixa.appendChild(texto)
            container.appendChild(caixa)
            const br = document.createElement("br")
            container.appendChild(br)
        })
    })
})
function mudar(person){
    localStorage.setItem("nomePerson", person)
    //'http://localhost:3000/'
    
    window.location.href = "https://rherois.onrender.com/"+person
}