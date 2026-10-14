(() => {
  const busca = document.getElementById("busca");
  const cargo = document.getElementById("cargo");
  const situacao = document.getElementById("situacao");
  const limpar = document.getElementById("limpar-busca");
  const perfis = Array.from(document.querySelectorAll(".cartao-perfil"));
  const contagem = document.getElementById("resultado-contagem");
  const vazio = document.getElementById("sem-resultados");
  const normalizar = (texto) => (texto || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

  if (busca && cargo && situacao && contagem && vazio) {
    const url = new URL(window.location.href);
    const inicial = url.searchParams.get("q");
    if (inicial) busca.value = inicial;

    const filtrar = () => {
      const termo = normalizar(busca.value);
      let visiveis = 0;
      perfis.forEach((perfil) => {
        const corresponde = normalizar(perfil.dataset.busca).includes(termo)
          && (!cargo.value || normalizar(perfil.dataset.cargo).includes(normalizar(cargo.value)))
          && (!situacao.value || perfil.dataset.situacao === situacao.value);
        perfil.hidden = !corresponde;
        if (corresponde) visiveis++;
      });
      contagem.textContent = visiveis + (visiveis === 1 ? " perfil encontrado" : " perfis encontrados");
      vazio.hidden = visiveis !== 0;
      if (limpar) limpar.hidden = busca.value.length === 0;
    };

    const atualizarBusca = () => {
      const endereco = new URL(window.location.href);
      const termo = busca.value.trim();
      if (termo) endereco.searchParams.set("q", termo);
      else endereco.searchParams.delete("q");
      window.history.replaceState(null, "", endereco);
      filtrar();
    };

    busca.addEventListener("input", atualizarBusca);
    [cargo, situacao].forEach((campo) => campo.addEventListener("change", filtrar));

    if (limpar) limpar.addEventListener("click", () => {
      busca.value = "";
      atualizarBusca();
      busca.focus();
    });

    document.addEventListener("keydown", (evento) => {
      const elemento = document.activeElement;
      const editando = elemento && (elemento.matches("input, textarea, select") || elemento.isContentEditable);
      if (evento.key === "/" && !editando && !evento.altKey && !evento.ctrlKey && !evento.metaKey) {
        evento.preventDefault();
        busca.focus();
      }
      if (evento.key === "Escape" && elemento === busca) {
        busca.value = "";
        atualizarBusca();
        busca.blur();
      }
    });
    window.addEventListener("popstate", () => {
      busca.value = new URL(window.location.href).searchParams.get("q") || "";
      filtrar();
    });
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
    } else {
      sumario.textContent = "Nenhuma seção cadastrada.";
    }
  }
})();
