const slides = document.querySelectorAll('.slide');
const bolinhas = document.querySelectorAll('.bolinha');

let slideAtual = 0;

function mostrarSlide(index) {
    slides.forEach((slide) => {
      slide.classList.remove('ativo');
});

bolinhas.forEach((bolinha) => {
    bolinha.classList.remove('ativa');
});

    slides[index].classList.add('ativo');
    bolinhas[index].classList.add('ativa');
}

function proximoSlide() {
    slideAtual++;

    if (slideAtual >= slides.length) {
      slideAtual = 0;
    }

    mostrarSlide(slideAtual);
  }

function voltarSlide() {
    slideAtual--;

    if (slideAtual < 0) {
      slideAtual = slides.length - 1;
    }

    mostrarSlide(slideAtual);
}

setInterval(() => {
    proximoSlide();
}, 5000);


const botoes = document.querySelectorAll(".filtro");
const cards = document.querySelectorAll(".card-produto");

botoes.forEach(botao => {

  botao.addEventListener("click", () => {

    const filtro = botao.dataset.filtro;

    cards.forEach(card => {

      const info = card.querySelector(".info-produto");

      if (filtro === "todos") {
        card.style.display = "block";
      }

      else if (info.classList.contains(filtro)) {
        card.style.display = "block";
      }

      else {
        card.style.display = "none";
      }

    });

  });

});

const busca = document.querySelector(".busca");


busca.addEventListener("input", () => {

  const texto = busca.value.toLowerCase();

  cards.forEach(card => {

    const nomeProduto = card
      .querySelector("h3")
      .textContent
      .toLowerCase();

    if (nomeProduto.includes(texto)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }

  });

});


const botoesPreco = document.querySelectorAll(".filtro-preco");

botoesPreco.forEach(botao => {

  botao.addEventListener("click", () => {

    const preco = botao.dataset.preco;

    cards.forEach(card => {

      const info = card.querySelector(".info-produto");

      if (preco === "todos") {
        card.style.display = "block";
      }

      else if (info.classList.contains(preco)) {
        card.style.display = "block";
      }

      else {
        card.style.display = "none";
      }

    });

  });

});
function gerarPDF() {
  document.body.classList.add("modo-pdf");

  const elemento = document.body;

  const opcoes = {
    margin:       [15, 12, 15, 12], 
    filename:     'Catalogo_Doces_da_Cris.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opcoes).from(elemento).save().then(() => {
    document.body.classList.remove("modo-pdf");
  });
}

// --- CÓDIGO DO MODO ESCURO ---
const modoEscuroToggle = document.getElementById('dark-mode-toggle');

// Verifica se o usuário já tinha escolhido o modo escuro antes
if (localStorage.getItem('tema') === 'dark') {
  document.body.classList.add('dark-theme');
  modoEscuroToggle.checked = true;
}

modoEscuroToggle.addEventListener('change', () => {
  if (modoEscuroToggle.checked) {
    document.body.classList.add('dark-theme');
    localStorage.setItem('tema', 'dark'); // Salva a escolha
  } else {
    document.body.classList.remove('dark-theme');
    localStorage.setItem('tema', 'light'); // Salva a escolha
  }
});