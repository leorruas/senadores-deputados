(() => {
  const busca = document.getElementById("busca");
  const cargo = document.getElementById("cargo");
  const situacao = document.getElementById("situacao");
  const cartoes = Array.from(document.querySelectorAll(".cartao-perfil"));
  const contagem = document.getElementById("resultado-contagem");
  const vazio = document.getElementById("sem-resultados");
  const normalizar = (texto) => (texto || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  if (busca && cargo && situacao && contagem && vazio) {
    const filtrar = () => {
      const termo = normalizar(busca.value);
      let visiveis = 0;
      cartoes.forEach((cartao) => {
        const corresponde = normalizar(cartao.dataset.busca).includes(termo) &&
          (!cargo.value || normalizar(cartao.dataset.cargo).includes(normalizar(cargo.value))) &&
          (!situacao.value || cartao.dataset.situacao === situacao.value);
        cartao.hidden = !corresponde;
        if (corresponde) visiveis += 1;
      });
      contagem.textContent = visiveis + (visiveis === 1 ? " perfil encontrado" : " perfis encontrados");
      vazio.hidden = visiveis !== 0;
    };
    [busca, cargo, situacao].forEach((campo) => campo.addEventListener("input", filtrar));
    filtrar();
  }
  const sumario = document.getElementById("sumario");
  const texto = document.getElementById("texto-perfil");
  if (sumario && texto) {
    const titulos = Array.from(texto.querySelectorAll("h2"));
    if (titulos.length) {
      const lista = document.createElement("ul");
      titulos.forEach((titulo, i) => {
        if (!titulo.id) titulo.id = "secao-" + (i + 1);
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = "#" + titulo.id;
        link.textContent = titulo.textContent;
        li.appendChild(link);
        lista.appendChild(li);
      });
      sumario.replaceChildren(lista);
    }
  }
})();
