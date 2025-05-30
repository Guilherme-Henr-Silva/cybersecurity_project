'use strict;' // Modo restrito

function showPage(pageId) {
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[\.-]/g, '');
    if (cpf.length !== 11 || /^([0-9])\1{10}$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
}

function validarFormulario() {
    const cpf = document.getElementById('cpf').value;
    if (!validarCPF(cpf)) {
        alert('CPF inválido. Por favor, insira um CPF válido.');
        return false;
    }
    alert('Formulário enviado com sucesso!');
    return true;
}

// Consumo de API ViaCEP
// viacep.com.br

// Verifica se o CEP é válido Teste de regex www.regexpal.com
const eNumero = (numero) => /^[0-9]+$/.test(numero); //Expressão Regular
const cepValido = (cep) => cep.length == 8 && eNumero(cep);

// Consumo de API viaCEP
//Consumindo API... 2- passo
const pesquisarCep = async() => {
    limparFormulario();
    const url = `http://viacep.com.br/ws/${cep.value}/json/`;
    if(cepValido(cep.value)){
        const dados = await fetch(url); //await = esperar fetch = promessa
        const addres = await dados.json(); 
        
        // hasOwnProperty  retorna um booleano indicando se o objeto possui a propriedade especificada como uma propriedade definida no próprio objeto em questão
        if(addres.hasOwnProperty('erro')){ 
            // document.getElementById('rua').value = 'CEP não encontrado!';
            alert('CEP não encontrado!');
        }else {
            preencherFormulario(addres);
        }
    }else{
        alert('CEP incorreto!');
    } 
}

// Função para limpar formulário
const limparFormulario = () => {
   //document.getElementById('cep').value = '';
    document.getElementById('rua').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

// Função para preencher o formulário
const preencherFormulario = (endereco) => {
    document.getElementById('rua').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.estado;
}

document.getElementById('cep').addEventListener('focusout', pesquisarCep);