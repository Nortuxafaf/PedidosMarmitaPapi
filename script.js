// === Lê o JSON vindo do Google Sheets e atualiza a mistura ===
let misturaDoDia = "";

fetch("https://script.google.com/macros/s/AKfycbwbmnmb6U__LdgVjv14uKkzgAKvVB7Rdp2ycPc4LMsKYV2jCF1A3J1x_pyZ8UiUiKsh/exec")
  .then(response => {
    if (!response.ok) throw new Error("Erro ao buscar o cardápio");
    return response.json();
  })
  .then(data => {
    // pega o valor retornado
    misturaDoDia = data.misturaDoDia || "";

    // atualiza o select no HTML
    const selectMistura = document.getElementById("mistura");
    const opcaoDoDia = selectMistura.querySelector("option[value='Mistura do dia']");

    if (opcaoDoDia && misturaDoDia) {
      opcaoDoDia.textContent = misturaDoDia;
      opcaoDoDia.value = misturaDoDia;
    }

    // (opcional) mostra na tela também
    const misturaInfo = document.getElementById("mistura-dia-info");
    if (misturaInfo) {
      misturaInfo.textContent = `🍽 Mistura do dia: ${misturaDoDia}`;
    }

    console.log("Mistura do dia carregada:", misturaDoDia);
  })
  .catch(error => {
    console.error("Erro ao ler o cardápio:", error);
  });



document.getElementById("pedidoForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const setor = document.getElementById("setor").value.trim();
  const arroz = document.getElementById("arroz").value;
  const feijao = document.getElementById("feijao").value;
  const mistura = document.getElementById("mistura").value;
  const botao = document.querySelector("button[type='submit']");

  if (!nome || !setor || !arroz || !feijao || !mistura) {
    document.getElementById("mensagem").textContent =
      "Por favor, preencha todos os campos antes de enviar!";
    document.getElementById("mensagem").style.color = "#ff5555";
    return;
  }

  // 🔒 Desativa o botão durante o envio
  botao.disabled = true;
  botao.textContent = "Enviando...";
  botao.style.opacity = "0.6"; // visual de desativado

  document.getElementById("mensagem").textContent = "📩 Enviando seu pedido...";
  document.getElementById("mensagem").style.color = "#ffff00";

  const pedido = { nome, setor, arroz, feijao, mistura };

  fetch("https://script.google.com/macros/s/AKfycbw0phz77NWZ8aC57hVr0N0ZQ56ahGWiGsT0Om3GnDUptl8OaRlJzLhOaSmhF9aHAY8Q/exec", {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pedido),
  })
    .then(() => {
      document.getElementById("mensagem").textContent =
        "✅ Pedido enviado com sucesso!";
      document.getElementById("mensagem").style.color = "#00ff99";
      document.getElementById("pedidoForm").reset();

      // 🔓 Reativa o botão após o envio
      botao.disabled = false;
      botao.textContent = "Enviar Pedido";
      botao.style.opacity = "1";

      setTimeout(() => {
        document.getElementById("mensagem").textContent = "";
      }, 3000);
    })
    .catch((error) => {
      console.error("Erro:", error);
      document.getElementById("mensagem").textContent =
        "❌ Erro ao enviar pedido!";
      document.getElementById("mensagem").style.color = "#ff5555";

      // 🔓 Reativa o botão mesmo em caso de erro
      botao.disabled = false;
      botao.textContent = "Enviar Pedido";
      botao.style.opacity = "1";
    });
});
