const URL = "https://jsonplaceholder.typicode.com/posts?_limit=6";
let publicacoes = [];

const botao = document.querySelector("#btn-carregar");
const filtro = document.querySelector("#filtro");
const mensagem = document.querySelector("#mensagem");
const painel = document.querySelector("#lista-posts");

function renderizarPublicacoes(lista) {
  painel.replaceChildren();

  lista.forEach((publicacao) => {
    const cartao = document.createElement("article");
    cartao.classList.add("cartao");

    const id = document.createElement("span");
    id.classList.add("cartao-id");
    id.textContent = `Publicação #${publicacao.id}`;

    const titulo = document.createElement("h2");
    titulo.textContent = publicacao.title;

    const conteudo = document.createElement("p");
    conteudo.textContent = publicacao.body;

    cartao.append(id, titulo, conteudo);
    painel.append(cartao);
  });
}

function carregarPublicacoes() {
  console.log("Função carregarPublicacoes() chamada");

  mensagem.textContent = "Carregando publicações...";
  botao.disabled = true;

  fetch(URL)
    .then((resposta) => {
      if (!resposta.ok) {
        throw new Error(`Erro HTTP: ${resposta.status}`);
      }
      return resposta.json();
    })
    .then((dados) => {
      console.log(dados);
      publicacoes = dados;
      mensagem.textContent = "";
      renderizarPublicacoes(publicacoes);
    })
    .catch((erro) => {
      console.error(erro);
      publicacoes = [];
      painel.replaceChildren();
      mensagem.textContent =
        "Não foi possível carregar as publicações. Tente novamente.";
    })
    .finally(() => {
      botao.disabled = false;
    });
}

botao.addEventListener("click", () => {
  console.log("Botão clicado!");
  carregarPublicacoes();
});

filtro.addEventListener("input", () => {
  const termo = filtro.value.trim().toLowerCase();

  const encontradas = publicacoes.filter((item) => {
    return item.title.toLowerCase().includes(termo);
  });

  renderizarPublicacoes(encontradas);

  if (encontradas.length === 0) {
    mensagem.textContent = "Nenhuma publicação encontrada para esse título.";
  } else {
    mensagem.textContent = "";
  }
});