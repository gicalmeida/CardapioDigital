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

// janelas
const modalFundo = document.createElement('div');
modalFundo.id = 'modal-produto-fundo';

const modalConteudo = document.createElement('div');
modalConteudo.id = 'modal-produto-conteudo';

modalFundo.appendChild(modalConteudo);
document.body.appendChild(modalFundo);

const estilosModal = document.createElement('style');
estilosModal.innerHTML = `
  #modal-produto-fundo {
    display: none;
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 9999;
    justify-content: center;
    align-items: center;
  }
  #modal-produto-conteudo {
    background-color: var(--cor-card);
    color: var(--cor-texto);
    padding: 30px;
    border-radius: 16px;
    max-width: 400px;
    width: 90%;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    position: relative;
    animation: abrirModal 0.3s ease;
  }
  #modal-produto-conteudo img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 15px;
  }
  #modal-produto-conteudo h3 {
    font-size: 1.4rem;
    margin-bottom: 10px;
  }
  #modal-produto-conteudo span {
    color: var(--cor-preco);
    font-weight: bold;
    font-size: 1.1rem;
    display: block;
    margin-bottom: 15px;
  }
  #modal-produto-conteudo p {
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 20px;
    opacity: 0.9;
  }
  .fechar-modal-btn {
    background-color: var(--cor-botao);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.3s;
  }
  .fechar-modal-btn:hover {
    background-color: var(--cor-botao-hover);
  }
  @keyframes abrirModal {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  /* O estilo do botão do Whats foi movido com segurança para dentro desta tag style */
  .btn-whatsapp-flutuante {
    position: fixed; 
    bottom: 25px; 
    right: 25px; 
    background-color: var(--cor-botao);
    color: white;
    width: 65px;
    height: 65px; 
    border-radius: 50%; 
    display: flex; 
    justify-content: center; 
    align-items: center; 
    box-shadow: 0 4px 15px rgba(0,0,0,0.25);
    cursor: pointer; 
    z-index: 999; 
    transition: transform 0.3s, background-color 0.3s; 
    text-decoration: none;
  }
  .btn-whatsapp-flutuante:hover { 
    transform: scale(1.1); 
    background-color: var(--cor-botao-hover);
  }
  .btn-whatsapp-flutuante i {
    font-size: 32px;
  }
`;
document.head.appendChild(estilosModal);

//evento de clique em cada card
cards.forEach(card => {
  // deixa o ponteiro do mouse como "mãozinha"
  card.style.cursor = 'pointer';

  card.addEventListener('click', () => {
    // captura os dados e monta a janela
    const imagemSrc = card.querySelector('.imagem-produto img').src;
    const titulo = card.querySelector('.info-produto h3').textContent;
    const preco = card.querySelector('.info-produto span').textContent;
    
    modalConteudo.innerHTML = `
      <img src="${imagemSrc}" alt="${titulo}">
      <h3>${titulo}</h3>
      <span>${preco}</span>
      <p>Delicioso item artesanal do Cantinho Doces da Cris, feito com ingredientes selecionados e muito amor. Entre em contato para personalizar ou consultar detalhes da sua encomenda!</p>
      <button class="fechar-modal-btn">Fechar</button>
    `;
    //mostra ela
    modalFundo.style.display = 'flex';

    // botão de fechar
    modalConteudo.querySelector('.fechar-modal-btn').addEventListener('click', () => {
      modalFundo.style.display = 'none';
    });
  });
});

// fecha a janela se clicar fora do conteúdo
modalFundo.addEventListener('click', (evento) => {
  if (evento.target === modalFundo) {
    modalFundo.style.display = 'none';
  }
});

//whats
// biblioteca de ícones oficiais (Font Awesome) 
const linkIcones = document.createElement('link');
linkIcones.rel = 'stylesheet';
linkIcones.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';
document.head.appendChild(linkIcones);

const botaoWhats = document.createElement('a');
botaoWhats.className = 'btn-whatsapp-flutuante';
botaoWhats.innerHTML = '<i class="fab fa-whatsapp"></i>'; 

botaoWhats.href = 'https://wa.me/5511973300110?text=Oi%20Cris!%20Vi%20o%20seu%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20doces,%20como%20faço%20para%20encomendar?';
botaoWhats.target = '_blank';
document.body.appendChild(botaoWhats);
