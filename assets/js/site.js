(() => {
  const busca = document.getElementById("busca");
  const uf = document.getElementById("uf");
  const partido = document.getElementById("partido");
  const cargo = document.getElementById("cargo");
  const situacao = document.getElementById("situacao");
  const limpar = document.getElementById("limpar-busca");
  const limparFiltros = document.getElementById("limpar-filtros");
  const perfis = Array.from(document.querySelectorAll(".cartao-perfil"));
  const contagem = document.getElementById("resultado-contagem");
  const vazio = document.getElementById("sem-resultados");
  const normalizar = (texto) => (texto || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

  if (busca && uf && partido && cargo && situacao && contagem && vazio) {
    const campos = [
      ["q", busca],
      ["uf", uf],
      ["partido", partido],
      ["cargo", cargo],
      ["situacao", situacao]
    ];

    const carregarParametros = () => {
      const parametros = new URL(window.location.href).searchParams;
      campos.forEach(([chave, campo]) => {
        campo.value = parametros.get(chave) || "";
      });
    };

    const filtrar = () => {
      const termo = normalizar(busca.value);
      let visiveis = 0;
      perfis.forEach((perfil) => {
        const corresponde = normalizar(perfil.dataset.busca).includes(termo)
          && (!uf.value || normalizar(perfil.dataset.uf) === normalizar(uf.value))
          && (!partido.value || normalizar(perfil.dataset.partido) === normalizar(partido.value))
          && (!cargo.value || normalizar(perfil.dataset.cargo).includes(normalizar(cargo.value)))
          && (!situacao.value || perfil.dataset.situacao === situacao.value);
        perfil.hidden = !corresponde;
        if (corresponde) visiveis++;
      });
      contagem.textContent = visiveis + (visiveis === 1 ? " perfil encontrado" : " perfis encontrados");
      vazio.hidden = visiveis !== 0;
      if (limpar) limpar.hidden = busca.value.length === 0;
      if (limparFiltros) limparFiltros.hidden = !campos.some(([, campo]) => campo.value);
    };

    const atualizarFiltros = () => {
      const endereco = new URL(window.location.href);
      campos.forEach(([chave, campo]) => {
        const valor = campo.value.trim();
        if (valor) endereco.searchParams.set(chave, valor);
        else endereco.searchParams.delete(chave);
      });
      window.history.replaceState(null, "", endereco);
      filtrar();
    };

    carregarParametros();
    busca.addEventListener("input", atualizarFiltros);
    [uf, partido, cargo, situacao].forEach((campo) => campo.addEventListener("change", atualizarFiltros));

    if (limpar) limpar.addEventListener("click", () => {
      busca.value = "";
      atualizarFiltros();
      busca.focus();
    });

    if (limparFiltros) limparFiltros.addEventListener("click", () => {
      campos.forEach(([, campo]) => { campo.value = ""; });
      atualizarFiltros();
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
        atualizarFiltros();
        busca.blur();
      }
    });

    window.addEventListener("popstate", () => {
      carregarParametros();
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
