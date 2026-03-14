const container = document.getElementById("destinos");
const filterSelect = document.getElementById("filter-local");
let destinosData = []; 

fetch("data/destinos.json")
  .then(response => response.json())
  .then(data => {
    destinosData = data.destinos;
    renderDestinos(destinosData); 
  })
  .catch(error => console.error("Erro ao carregar destinos:", error));

function renderDestinos(destinos) {
  container.innerHTML = ""; 

  destinos.forEach(destino => {
    const card = document.createElement("div");
    card.classList.add("destino-card");

    card.innerHTML = `
      <img src="${destino.imagem}" alt="${destino.nome}" class="destino-img">

      <div class="destino-info">
        <h3>${destino.nome}</h3>
        <p><strong>Local:</strong> ${destino.local}</p>
        <p><strong>Duração:</strong> ${destino.duracao}</p>
        <p class="preco">$${destino.preco}</p>

        <a href="https://wa.me/258XXXXXXXXX?text=Olá! Quero reservar a viagem para ${destino.nome}" target="_blank">
          <button class="book-btn">Book Now</button>
        </a>
      </div>
    `;

    container.appendChild(card);
  });
}

filterSelect.addEventListener("change", () => {
  const selected = filterSelect.value;

  if (selected === "all") {
    renderDestinos(destinosData);
  } else {
    const filtrados = destinosData.filter(destino => destino.local === selected);
    renderDestinos(filtrados);
  }
});

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});

const heroButton = document.querySelector(".hero button");
heroButton.addEventListener("click", () => {
  document.getElementById("destinos-section").scrollIntoView({ behavior: "smooth" });
});