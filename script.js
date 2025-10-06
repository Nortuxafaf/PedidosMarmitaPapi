// === Lê o cardapio.txt e atualiza o campo de mistura ===
let misturaDoDia = ""; // variável global para guardar o valor

fetch("cardapio.txt")
  .then((response) => response.text())
  .then((texto) => {
    // Procura a linha com "Mistura do dia:"
    const match = texto.match(/Mistura do dia:\s*(.+)/i);
    if (match) {
      misturaDoDia = match[1].trim(); // salva na variável

      // Atualiza o campo de mistura no HTML
      const selectMistura = document.getElementById("mistura");
      const opcaoDoDia = selectMistura.querySelector("option[value='Mistura do dia']");
      if (opcaoDoDia) {
        opcaoDoDia.textContent = misturaDoDia;
        opcaoDoDia.value = misturaDoDia;
      }

      console.log("Mistura do dia carregada:", misturaDoDia);
    }
  })
  .catch((err) => {
    console.error("Erro ao carregar o cardápio:", err);
  });

document.getElementById("pedidoForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const setor = document.getElementById("setor").value.trim();
  const arroz = document.getElementById("arroz").value;
  const feijao = document.getElementById("feijao").value;
  const mistura = document.getElementById("mistura").value;



  // Verifica se todos os campos estão preenchidos
  if (!nome || !setor || !arroz || !feijao || !mistura) {
    document.getElementById("mensagem").textContent =
      "Por favor, preencha todos os campos antes de enviar!";
    document.getElementById("mensagem").style.color = "#ff5555";
    return;
  }
  else document.getElementById("mensagem").textContent = "📩 Enviando seu pedido ", document.getElementById("mensagem").style.color = "#FFFF00";;

  const pedido = { nome, setor, arroz, feijao, mistura };

  // Substitua pela URL do seu Web App (do Google Apps Script)
  fetch("https://script.google.com/macros/s/AKfycbw0phz77NWZ8aC57hVr0N0ZQ56ahGWiGsT0Om3GnDUptl8OaRlJzLhOaSmhF9aHAY8Q/exec", {
    method: "POST",
    mode: "no-cors", // funciona sem erro de CORS
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pedido),
  })
    .then(() => {
      document.getElementById("mensagem").textContent =
        "✅ Pedido enviado com sucesso!";
      document.getElementById("mensagem").style.color = "#00ff99";
      document.getElementById("pedidoForm").reset();

      setTimeout(() => {
        document.getElementById("mensagem").textContent = "";
      }, 3000);
    })
    .catch((error) => {
      console.error("Erro:", error);
      document.getElementById("mensagem").textContent =
        "❌ Erro ao enviar pedido!";
      document.getElementById("mensagem").style.color = "#ff5555";
    });
});
