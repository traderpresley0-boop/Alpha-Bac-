let historico = [];
let wins = 0;
let total = 0;
let podeUsar = true;

function iniciarAnalise() {

    if (!podeUsar) {
        alert("🔒 Acesso VIP necessário para novos sinais");
        return;
    }

    podeUsar = false;

    document.getElementById("status").innerText = "🔎 Analisando mercado...";
    document.getElementById("sinal").innerText = "...";

    setTimeout(() => {
        gerarSinal();
    }, 2500);
}

function gerarSinal() {
    let random = Math.random();

    let sinal = random > 0.5 ? "🟢 BIG" : "🔴 SMALL";
    let prob = (68 + Math.random() * 20).toFixed(0);

    document.getElementById("status").innerText = "✔️ Sinal pronto";
    document.getElementById("sinal").innerText = sinal;
    document.getElementById("prob").innerText = "Confiança: " + prob + "%";

    let win = Math.random() > 0.4;
    total++;

    if (win) wins++;

    let resultado = `${sinal} (${prob}%) - ${win ? "WIN ✅" : "LOSS ❌"}`;
    historico.unshift(resultado);

    atualizarHistorico();
    atualizarWinrate();

    iniciarContador();

    setTimeout(() => {
        podeUsar = true;
    }, 20000);
}

function atualizarHistorico() {
    let lista = document.getElementById("historico");
    lista.innerHTML = "";

    historico.slice(0, 10).forEach(item => {
        let li = document.createElement("li");
        li.innerText = item;
        lista.appendChild(li);
    });
}

function atualizarWinrate() {
    let winrate = total > 0 ? ((wins / total) * 100).toFixed(0) : 0;
    document.getElementById("winrate").innerText = "Win Rate: " + winrate + "%";
}

function iniciarContador() {
    let tempo = 10;

    let intervalo = setInterval(() => {
        document.getElementById("tempo").innerText = "Próximo sinal em " + tempo + "s";
        tempo--;

        if (tempo < 0) {
            clearInterval(intervalo);
        }
    }, 1000);
}
