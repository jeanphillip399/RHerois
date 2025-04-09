function logar(){
    const nome = document.getElementById('nome').value.trim()
    const senha = document.getElementById('senha').value.trim()
    const query = {nome:nome,senha:senha}
    const resultado = document.getElementById('resultado')

    fetch('http://localhost:3000/logar',{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify(query)
    })
    .then(response=>response.json())
    .then(data=>{
        resultado.textContent = data.menssagem
        if(data.logado){
            window.location.href += "lista"
            localStorage.setItem("nome", nome)
        }
    })
}