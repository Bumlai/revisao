const form = document.querySelector('#nometabelaForm')//adicionar nome do id do form
const variavel1Input = document.querySelector('#variavel1Input')//adicionar o nome do id do input
const variavel2Input = document.querySelector('#variavel2Input')//
const variavel3Input = document.querySelector('#variavel3Input')//
const URL = 'http://localhost:8080/Nometabela.php'//link da api(altere o nome)

const tableBody = document.querySelector('#nometabelaTable')//adicionar nome do tbody

//mudar o nome da function para o mesmo nome da sua tabela
function carregarNometabela() {
    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
        .then(response => response.json())

        //pegue o nome da sua tabela e coloque no "nometabela"
        .then(nometabela => {
        tableBody.innerHTML = ''

        for (let i = 0; i < nometabela.length; i++) {
        const tr = document.createElement('tr')
        const nometabelas = nometabela[i]
        //mude o nome da "const nometabelas"(coloque o nome da sua tabela no plural, caso esteja no plural coloque no singular) o "nometabela" para o nome da sua tabela

        //agora use isso como base ${(nometabela).(variavel do banco de dados)}
        tr.innerHTML = `
            <td>${nometabelas.id}</td>
            <td>${nometabelas.variavel1}</td>
            <td>${nometabelas.variavel2}</td>
            <td>${nometabelas.variavel3}</td>
            <td>
                <button data-id="${nometabelas.id}" onclick="editarNometabela(${nometabelas.id})">Editar</button>
                <button onclick="excluirNometabela(${nometabelas.id})">Excluir</button>
            </td>
        `
        //caso queria uma tabela diferente pegue do bootstrap e usa a mesma logica acima
        //muda o "onclick" dentro do botão para o mesmo nome da função da linha (editarNometabela) e da linha (excluirNometabela)
        tableBody.appendChild(tr)
    }

    })
}

//função para criar um Filme
//mude o nome adicioonarNometabela para o nome da sua tabela
function adicionarNometabela(e) {

    e.preventDefault()

    //copiar e colar o nome das variaveis do topo (so os INPUT), e alterar o nome do const para o msm nome(tirando o INPUT)
    const variavel1 = variavel1Input.value
    const variavel2 = variavel2Input.value
    const variavel3 = variavel3Input.value

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        //mude as variaveis para a mesma do banco, e as que estão em () para o mesmo nome da const acima
        body: `variavel1=${encodeURIComponent(variavel1)}&variavel2=${encodeURIComponent(variavel2)}&variavel3=${encodeURIComponent(variavel3)}`
    })
        .then(response => {
            if (response.ok) {
                carregarNometabela() //muda o carregarNometabela para o nome da sua tabela
                //coloque os Inputs aqui
                variavel1Input.value = ''
                variavel2Input.value = ''
                variavel3Input.value = ''
            } else {
                console.error('Erro ao add filme')
                alert('Erro ao add filme')
            }
        })
}


//mude o nome da função para editar(nometabela)
function editarNometabela(id){
    //esse const devera conter novo(nome da variavel)
    const novoVariavel1 = prompt("Digite o novo Variavel1")
    const novoVariavel2 = prompt("Digite o novo Variavel2")
    const novoVariavel3 = prompt("Digite o novo Variavel3")

    //mude as variaveis de baixo para a mesma da de cima
    if (novoVariavel1 && novoVariavel2 && novoVariavel3){
        fetch(`${URL}?id=${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            //mude as variaveis para a mesma do banco, e as que estão em () para o mesmo nome da const acima
            body: `Variavel1=${encodeURIComponent(novoVariavel1)}&Variavel2=${encodeURIComponent(novoVariavel2)}&Variavel3=${encodeURIComponent(novoVariavel3)}`
        })
            .then(response => {
                if(response.ok){
                    //mude o carregarNometabela para o nome da sua tabela
                    carregarNometabela()
                } else {
                    console.error('Erro ao editar')
                    alert('erro ao editar')
                }
            })
    }
}

//função para excluir
//mude o nome da função para excluirNometabela
function excluirNometabela(id){
    if(confirm('Deseja excluir esse item?')){
        fetch(`${URL}?id=${id}`, {
            method: 'DELETE'
        })
        .then(response=> {
            if(response.ok) {
                //muda esse carregarNometabela para o nome da sua tabela
                carregarNometabela()
            } else {
                console.error('erro ao excluir')
                alert('Erro ao excluir')
            }
        })
    }
}





form.addEventListener('submit', adicionarNometabela)//mude o (adicionarNometabela) para o seu adicionar(Nometabela)

carregarNometabela()//mude o (carregarNometabela) para o seu carregar(Nometabela)
