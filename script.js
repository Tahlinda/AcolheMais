const menuBotao = document.getElementById("menu-botao");
const linkNavegacao = document.getElementById("link-navegacao");

menuBotao.addEventListener("click", function () {
    linkNavegacao.classList.toggle("active");
    const aberto = linkNavegacao.classList.contains("active");
    menuBotao.setAttribute("aria-expanded", aberto);
});

document.querySelectorAll(".link-navegacao a").forEach(function (link) {
    link.addEventListener("click", function () {
        linkNavegacao.classList.remove("active");
        menuBotao.setAttribute("aria-expanded", "false");
    });
});

const anonimo = document.getElementById("anonimo");
const campoIdentificacao = document.getElementById("campo-identificacao");

anonimo.addEventListener("change", function () {
    if (anonimo.checked) {
        campoIdentificacao.hidden = true;
    } else {
        campoIdentificacao.hidden = false;
    }
});

const formularioDenuncia = document.getElementById("formulario-denuncia");
const mensagemFormulario = document.getElementById("mensagem-formulario");

formularioDenuncia.addEventListener("submit", function (event) {
    event.preventDefault();

    const tipo = document.getElementById("tipo").value;
    const local = document.getElementById("local").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const nome = document.getElementById("nome").value.trim();

    if (tipo === "" || descricao === "") {
        mensagemFormulario.style.color = "#B42318";
        mensagemFormulario.textContent = "Por favor, preencha todos os campos obrigatórios.";
        return;
    }

    const resumoRelato = [
        "Tipo: " + tipo,
        local ? "Local: " + local : "Local: não informado",
        anonimo.checked ? "Identidade: anônima" : "Identidade: " + (nome || "não informada"),
        "Relato: " + descricao
    ].join("\n");

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(resumoRelato).then(function () {
            mensagemFormulario.style.color = "#233B5D";
            mensagemFormulario.textContent =
                "Relato copiado para a área de transferência! Agora cole no canal oficial (Disque 100 / Gov.br) ou ligue gratuitamente para 100.";
        }).catch(function () {
            mensagemFormulario.style.color = "#233B5D";
            mensagemFormulario.textContent =
                "Relato organizado abaixo. Copie e envie pelo Disque 100 (ligação gratuita 100 ou portal Gov.br):\n\n" + resumoRelato;
        });
    } else {
        mensagemFormulario.style.color = "#233B5D";
        mensagemFormulario.textContent =
            "Relato organizado abaixo. Copie e envie pelo Disque 100 (ligação gratuita 100 ou portal Gov.br):\n\n" + resumoRelato;
    }

    formularioDenuncia.reset();
    anonimo.checked = true;
    campoIdentificacao.hidden = true;
});