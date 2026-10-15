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
  // Consulta dos mapas nominais importados da Câmara. Filtros independentes por turno.
  document.querySelectorAll(".votos-turno").forEach((bloco) => {
    const buscaVotos = bloco.querySelector(".votos-busca");
    const tipoVotos = bloco.querySelector(".votos-tipo");
    const linhas = Array.from(bloco.querySelectorAll(".votos-tabela tbody tr"));
    const contador = bloco.querySelector(".votos-contagem");
    if (!buscaVotos || !tipoVotos || !contador) return;
    const normalizarVoto = (valor) => (valor || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const filtrarVotos = () => {
      const termo = normalizarVoto(buscaVotos.value.trim());
      let total = 0;
      linhas.forEach((linha) => {
        const aparece = normalizarVoto(linha.dataset.busca).includes(termo) && (!tipoVotos.value || linha.dataset.voto === tipoVotos.value);
        linha.hidden = !aparece;
        if (aparece) total++;
      });
      contador.textContent = total + (total === 1 ? " registro encontrado" : " registros encontrados");
    };
    buscaVotos.addEventListener("input", filtrarVotos);
    tipoVotos.addEventListener("change", filtrarVotos);
    filtrarVotos();
  });

  // Inventário oficial da Câmara: filtro independente dos perfis pesquisados.
  const camaraBusca = document.getElementById("camara-busca");
  const camaraUf = document.getElementById("camara-uf");
  const camaraPartido = document.getElementById("camara-partido");
  const camaraLimpar = document.getElementById("camara-limpar");
  const camaraContagem = document.getElementById("camara-contagem");
  const camaraVazio = document.getElementById("camara-sem-resultados");
  const deputadosCamara = Array.from(document.querySelectorAll(".camara-linha"));

  if (camaraBusca && camaraUf && camaraPartido && camaraContagem && camaraVazio) {
    const camposCamara = [["q", camaraBusca], ["uf", camaraUf], ["partido", camaraPartido]];
    const normalizarCamara = (texto) => String(texto || "")
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

    const lerParametrosCamara = () => {
      const parametros = new URL(window.location.href).searchParams;
      camposCamara.forEach(([chave, campo]) => {
        campo.value = parametros.get(chave) || "";
      });
    };
    const filtrarCamara = () => {
      let visiveis = 0;
      const termo = normalizarCamara(camaraBusca.value);
      deputadosCamara.forEach((deputado) => {
        const corresponde = normalizarCamara(deputado.dataset.camaraBusca).includes(termo)
          && (!camaraUf.value || deputado.dataset.camaraUf === camaraUf.value)
          && (!camaraPartido.value || deputado.dataset.camaraPartido === camaraPartido.value);
        deputado.hidden = !corresponde;
        if (corresponde) visiveis++;
      });
      camaraContagem.textContent = visiveis + (visiveis === 1 ? " deputado encontrado" : " deputados encontrados");
      camaraVazio.hidden = visiveis > 0;
      if (camaraLimpar) camaraLimpar.hidden = !camposCamara.some(([, campo]) => campo.value);
    };
    const atualizarCamara = () => {
      const endereco = new URL(window.location.href);
      camposCamara.forEach(([chave, campo]) => {
        const valor = campo.value.trim();
        if (valor) endereco.searchParams.set(chave, valor);
        else endereco.searchParams.delete(chave);
      });
      window.history.replaceState(null, "", endereco);
      filtrarCamara();
    };
    lerParametrosCamara();
    camaraBusca.addEventListener("input", atualizarCamara);
    [camaraUf, camaraPartido].forEach((campo) => campo.addEventListener("change", atualizarCamara));
    if (camaraLimpar) camaraLimpar.addEventListener("click", () => {
      camposCamara.forEach(([, campo]) => { campo.value = ""; });
      atualizarCamara();
      camaraBusca.focus();
    });
    window.addEventListener("popstate", () => { lerParametrosCamara(); filtrarCamara(); });
    filtrarCamara();
  }
})();
