const form = document.getElementById("pedidoForm");
const listaPedidos = document.getElementById("listaPedidos");

let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
renderHistorico();

// Salvar pedido
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const dados = new FormData(form);
  const pedido = {
    nome: dados.get("nome"),
    numero: dados.get("numero"),
    tamanho: dados.get("tamanho"),
    consumo: dados.get("consumo"),
    sabores: dados.getAll("sabores"),
    condimentos: dados.getAll("condimentos"),
    frutas: dados.getAll("frutas"),
    cremes: dados.getAll("cremes"),
    entrega: dados.get("entrega"),
    pagamento: dados.getAll("pagamento"),
    data: new Date().toLocaleString()
  };

  pedidos.push(pedido);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
  renderHistorico();
  form.reset();
});

// Renderizar histórico
function renderHistorico() {
  listaPedidos.innerHTML = "";

  pedidos.forEach((pedido, index) => {
    const item = document.createElement("li");
    item.className = "pedido-item";
    item.innerHTML = `
      <strong>#${pedido.numero}</strong> - ${pedido.nome} (${pedido.tamanho})
      <button onclick="verPedido(${index})">Ver</button>
    `;
    listaPedidos.appendChild(item);
  });
}

// Mostrar pedido completo
function verPedido(index) {
  const pedido = pedidos[index];
  const detalhes = `
    Pedido #${pedido.numero} - ${pedido.nome}\n
    Tamanho: ${pedido.tamanho}
    Consumo: ${pedido.consumo}
    Sabores: ${pedido.sabores.join(", ")}
    Condimentos: ${pedido.condimentos.join(", ")}
    Frutas: ${pedido.frutas.join(", ")}
    Cremes: ${pedido.cremes.join(", ")}
     Entrega: ${pedido.entrega}
    Pagamento: ${pedido.pagamento.join(", ")}
    Data: ${pedido.data}
  `;
  alert(detalhes);
}

function imprimirCupom() {
  const pedido = pedidos[pedidos.length - 1];
  if (!pedido) {
    alert("Nenhum pedido salvo.");
    return;
  }

  const janela = window.open("", "_blank", "width=400,height=600");
  janela.document.write(`
    <html><head><title>Cupom</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        font-size: 14px;
        padding: 20px;
        line-height: 1.5;
      }
      h2 {
        text-align: center;
        margin-bottom: 20px;
        color: #5c2a84;
      }
      p {
        margin: 4px 0;
      }
      .linha {
        border-top: 1px dashed #aaa;
        margin: 10px 0;
      }
    </style>
    </head><body>
    <h2>GILA Açaí & Sorvetes</h2>
    <div class="linha"></div>
    <p><strong>Pedido #:</strong> ${pedido.numero}</p>
    <p><strong>Nome:</strong> ${pedido.nome}</p>
    <p><strong>Data:</strong> ${pedido.data}</p>
    <div class="linha"></div>
    <p><strong>Tamanho:</strong> ${pedido.tamanho}</p>
    <p><strong>Consumo:</strong> ${pedido.consumo}</p>
    <p><strong>Entrega:</strong> ${pedido.entrega}</p>
    <div class="linha"></div>
    <p><strong>Sabores:</strong> ${pedido.sabores.join(", ") || "Nenhum"}</p>
    <p><strong>Condimentos:</strong> ${pedido.condimentos.join(", ") || "Nenhum"}</p>
    <p><strong>Frutas:</strong> ${pedido.frutas.join(", ") || "Nenhum"}</p>
    <p><strong>Cremes:</strong> ${pedido.cremes.join(", ") || "Nenhum"}</p>
    <div class="linha"></div>
    <p><strong>Pagamento:</strong> ${pedido.pagamento.join(", ")}</p>
    </body></html>
  `);
  janela.document.close();
  janela.print();
}


// Limpar histórico
function limparHistorico() {
  if (confirm("Tem certeza que deseja apagar todo o histórico?")) {
    pedidos = [];
    localStorage.removeItem("pedidos");
    renderHistorico();
  }
}