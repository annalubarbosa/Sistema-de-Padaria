let produtos = [
    {
        id: 1,
        nome: "Pão Francês",
        categoria: "paes",
        preco: 0.5,
        img: "assets/pao_frances.jpg",
    },
    {
        id: 2,
        nome: "Pão Doce",
        categoria: "paes",
        preco: 0.8,
        img: "assets/PaoDoce.jpg",
    },
    {
        id: 3,
        nome: "Pão de Queijo",
        categoria: "paes",
        preco: 5.0,
        img: "assets/pao-de-queijo-3.jpg",
    },
    {
        id: 4,
        nome: "Bolo de Chocolate",
        categoria: "bolos",
        preco: 17.0,
        img: "assets/Bolo-de-Chocolate-com-calda-de-chocolate-1.jpg",
    },
    {
        id: 5,
        nome: "Bolo de Cenoura com Calda de Chocolate",
        categoria: "bolos",
        preco: 26.0,
        img: "assets/bolo_de_cenoura.jpg",
    },
    {
        id: 6,
        nome: "Bolo de Limão",
        categoria: "bolos",
        preco: 25.0,
        img: "assets/bolo-de-limao.jpg",
    },
    {
        id: 7,
        nome: "Bolo de Fubá",
        categoria: "bolos",
        preco: 20.0,
        img: "assets/bolo-de-fuba.jpg",
    },
    {
        id: 8,
        nome: "Brigadeiro",
        categoria: "doces",
        preco: 2.0,
        img: "assets/Brigadeiro.jpg",
    },
    {
        id: 9,
        nome: "Donut",
        categoria: "doces",
        preco: 4.5,
        img: "assets/donuts.jpg",
    },
    {
        id: 10,
        nome: "Pudim Tradicional",
        categoria: "doces",
        preco: 23.0,
        img: "assets/pudim-com-leite-condensado.jpg",
    },
    {
        id: 11,
        nome: "Bomba de Chocolate",
        categoria: "doces",
        preco: 6.0,
        img: "assets/Bomba-de-chocolate.jpg",
    },
    {
        id: 12,
        nome: "Sonho",
        categoria: "doces",
        preco: 5.0,
        img: "assets/receita-de-sonho.jpg",
    },
    {
        id: 13,
        nome: "Canudinho recheado de doce de leite",
        categoria: "doces",
        preco: 2.5,
        img: "assets/canudinho-recheado-de-doce-de-leite.jpg",
    },
    {
        id: 14,
        nome: "Torta de Morango",
        categoria: "tortas",
        preco: 45.0,
        img: "assets/torta-de-morango.jpg",
    },
    {
        id: 15,
        nome: "Torta de Limão",
        categoria: "tortas",
        preco: 40.0,
        img: "assets/torta-de-limao.jpg",
    },
    {
        id: 16,
        nome: "Torta de Maracuja",
        categoria: "tortas",
        preco: 42.0,
        img: "assets/torta-de-maracuja.jpg",
    },
    {
        id: 17,
        nome: "Coxinha",
        categoria: "salgados",
        preco: 5.0,
        img: "assets/coxinha.jp.jpg",
    },
    {
        id: 18,
        nome: "Pastel de Queijo",
        categoria: "salgados",
        preco: 8.0,
        img: "assets/pastel.jpg",
    },
    {
        id: 19,
        nome: "Quibe",
        categoria: "salgados",
        preco: 5.0,
        img: "assets/Quibe.jpg",
    },
    {
        id: 20,
        nome: "Enrolado de salsicha",
        categoria: "salgados",
        preco: 7.5,
        img: "assets/enrolado-de-salsicha.jpg",
    },
    // outros produtos
];
let carrinho = [];
let usuarioLogado = null;
let historico = [];

// Renderizar lista de produtos
function renderCardapio(lista = produtos) {
    document.getElementById("cardapio").innerHTML = lista
        .map(
            (prod) =>
                `<div class="produto">
          <img src="${prod.img}" alt="${prod.nome}">
          <h3>${prod.nome}</h3>
          <span>R$ ${prod.preco.toFixed(2)}</span>
          <button onclick="addCarrinho(${prod.id})">Adicionar</button>
        </div>`
        )
        .join("");
}

function filtrarCategoria(cat) {
    if (cat === "todos") renderCardapio(produtos);
    else renderCardapio(produtos.filter((p) => p.categoria === cat));
}

function pesquisarProduto(valor) {
    let filtro = valor.toLowerCase();
    renderCardapio(
        produtos.filter((p) => p.nome.toLowerCase().includes(filtro))
    );
}

// Carrinho de compras
function addCarrinho(prodId) {
    let prod = produtos.find((p) => p.id === prodId);
    carrinho.push(prod);
    renderCarrinho();
}
function renderCarrinho() {
    let html = "<h3> 🛒 Carrinho</h3><hr>";

    if (carrinho.length === 0) {
        html += "Nenhum item no carrinho";
    } else {
        html += carrinho
            .map((p) => `${p.nome} - R$ ${p.preco.toFixed(2)}`)
            .join("<br>");
    }

    html += `<br><button  class="btn-finalizar" onclick="finalizarPedido()"> ✅Finalizar Pedido</button>`;
    document.getElementById("carrinho").innerHTML = html;
}

// Pedido/histórico - exibir resumo

function finalizarPedido() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }
    let pedido = {
        id: Math.floor(Math.random() * 10000),
        usuario: usuarioLogado,
        itens: [...carrinho],
        total: carrinho.reduce((t, p) => t + p.preco, 0),
        status: "Aguardando retirada",
    };
    historico.push(pedido);
    alert(`Pedido registrado! ID: ${pedido.id}`);
    carrinho = [];
    renderCarrinho();
    renderCarrinho();
}

window.onload = () => {
    renderCardapio();
    renderCarrinho();
};


