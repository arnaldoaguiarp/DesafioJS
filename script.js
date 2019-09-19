var questions;// Receber os dados var 
n = -1; // Auxiliar para indicar a pergunta
var points = 0; // Acumula a pontuação

httpRequest = new XMLHttpRequest();// Criar uma instância de XMLHttpRequest

httpRequest.open('GET', 'https://quiz-trainee.herokuapp.com/questions', true);//Recebe os dados e indica de onde
httpRequest.send(); //Envia os dados para o servidor

httpRequest.onreadystatechange = function(){ 
    if(this.readyState == 4 && this.status == 200){ 
        questions = (JSON.parse(this.responseText));//analisa uma string JSON, construindo um objeto descrito pela string 
    }
}

function mostrarQuestao() { 
    
    console.log(questions);// Auxilia na trocas das telas do quiz. PS: não é do JavaScript 
    
    if (n == -1) { // Inicia o quiz 
        document.getElementById("resultado").style.display = 'none' 
        document.getElementById("listaRespostas").style.display = "inline" 
        document.getElementById("confirmar").innerHTML = "PRÓXIMA" 
    }
 
    
    /*document.getElementsByName("resposta")[i].checked // Verifica se algum item foi selecionado 
        break // Sai do laço e vai para a próxima pergunta 
    //Caso não tenha um item selecionado: 
        return // Não deixa ir para a próxima 
    }*/  

    n++ // Chama a pergunta posterior

    if(n >= questions.length){ // Verifica se existem mais perguntas, caso não exista, ele finaliza o quiz 
        finalizarQuiz(); 
        return; 
    } 
    
    document.getElementById('titulo').innerHTML = questions[n].title // Atualiza o titulo da pergunta
 
    var mostraResposta = document.getElementsByTagName("span") 
    var respostaMarcada = document.getElementsByName("resposta") 
 
    /*AQUI COMEÇA A LASQUEIRA*/
/**/   for (var i = 0; i < questions[n].options.length; i++) { // Adiciona aos pontos o valor da resposta da pergunta anterior escolhida 
/**/       if (respostaMarcada[i].checked) { 
/**/          points = points + Number(respostaMarcada[i].value) 
/**/          respostaMarcada[i].checked = false // Deseleciona para a próxima pergunta (esse comando é top)
/**/     }
/**/    // Atualiza os valores de cada resposta 
/**/        mostraResposta[i].parentElement.children[0].value = questions[n].options[i].value // Atualiza as respostas 
/**/        mostraResposta[i].innerHTML = questions[n].options[i].answer 
/**/    }
    /*EU PREFIRO VENDER ARTE NA PRAIA*/

function finalizarQuiz() { 
    var pontuacaoGeral = Math.round((points / 15) * 100) 
    n = -1 
    points = 0 
    document.getElementById('titulo').innerHTML = 'QUIZ DOS VALORES DA GTI' 
    document.getElementById("listaRespostas").style.display = "none" 
    document.getElementById("resultado").style.display = 'block' 
    document.getElementById("resultado").innerHTML = 'Sua pontuação: ' + pontuacaoGeral + '%' 
    document.getElementById("confirmar").innerHTML = "Refazer Quiz";
}