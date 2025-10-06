document.getElementById("pedidoForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const setor = document.getElementById("setor").value.trim();
  const arroz = document.getElementById("arroz").value;
  const feijao = document.getElementById("feijao").value;
  const mistura = document.getElementById("mistura").value;

  if (!nome || !setor || !arroz || !feijao || !mistura) {
    document.getElementById("mensagem").textContent = "Por favor, preencha todos os campos antes de enviar!";
    document.getElementById("mensagem").style.color = "#ff5555";
    return;
  }

  const pedido = { nome, setor, arroz, feijao, mistura };

  fetch("https://script.google.com/macros/s/AKfycbyEk7fZZkr3tg0MbWjy5jCWHd6yksaSPg6_i2WxztYxIRAyBSVMfp9tzDENuMD0m1z0/exec", {
    method: "POST",
    body: JSON.stringify(pedido),
    headers: { "Content-Type": "application/json" },
  })
    .then(response => response.text())
    .then(() => {
      document.getElementById("mensagem").textContent = "✅ Pedido enviado com sucesso!";
      document.getElementById("mensagem").style.color = "#00ff99";
      document.getElementById("pedidoForm").reset();
      setTimeout(() => {
        document.getElementById("mensagem").textContent = "";
      }, 3000);
    })
    .catch(() => {
      document.getElementById("mensagem").textContent = "❌ Erro ao enviar pedido!";
      document.getElementById("mensagem").style.color = "#ff5555";
    });
});
