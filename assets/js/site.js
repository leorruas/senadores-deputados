(() => {
  // Mesma paginação no índice geral, Senado e Câmara.
  // A busca e os filtros sempre consideram TODOS os registros da página.
  const criarPaginador = (itens, navegacao, singular, plural, lista) => {
    const tamanhoPagina = 30;
    let resultados = itens;

    const renderizar = () => {
      const total = resultados.length;
      const numeroPaginas = Math.max(1, Math.ceil(total / tamanhoPagina));
      const parametro = Number(new URL(window.location.href).searchParams.get("pagina"));
      const paginaAtual = Number.isSafeInteger(parametro)
        ? Math.min(numeroPaginas, Math.max(1, parametro))
        : 1;
      const primeiro = (paginaAtual - 1) * tamanhoPagina;
      const mostrados = new Set(resultados.slice(primeiro, primeiro + tamanhoPagina));

      itens.forEach((item) => { item.hidden = !mostrados.has(item); });

      if (!navegacao) return;
      navegacao.replaceChildren();
      navegacao.hidden = total <= tamanhoPagina;
      if (navegacao.hidden) return;

      const resumo = document.createElement("p");
      resumo.className = "paginacao__resumo";
      resumo.setAttribute("role", "status");
      resumo.textContent = "Exibindo " + (primeiro + 1) + "–"
        + Math.min(primeiro + tamanhoPagina, total)
        + " de " + total + " " + (total === 1 ? singular : plural);

      const controles = document.createElement("div");
      controles.className = "paginacao__controles";

      const mudarPagina = (numero) => {
        const endereco = new URL(window.location.href);
        if (numero === 1) endereco.searchParams.delete("pagina");
        else endereco.searchParams.set("pagina", String(numero));
        window.history.pushState(null, "", endereco);
        renderizar();
        if (lista) {
          const reduzMovimento = window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          lista.scrollIntoView({ behavior: reduzMovimento ? "auto" : "smooth", block: "start" });
        }
      };

      const botaoPagina = (texto, numero, descricao, desabilitado = false, atual = false) => {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "paginacao__botao";
        botao.textContent = texto;
        botao.setAttribute("aria-label", descricao);
        if (atual) {
          botao.setAttribute("aria-current", "page");
          botao.classList.add("paginacao__botao--atual");
        }
        botao.disabled = desabilitado;
        botao.addEventListener("click", () => mudarPagina(numero));
        return botao;
      };

      controles.appendChild(botaoPagina(
        "← ANTERIOR", Math.max(1, paginaAtual - 1), "Página anterior", paginaAtual === 1
      ));

      const numeros = new Set([1, 2, paginaAtual - 1, paginaAtual,
        paginaAtual + 1, numeroPaginas - 1, numeroPaginas]);
      const paginasVisiveis = [...numeros]
        .filter((numero) => numero >= 1 && numero <= numeroPaginas)
        .sort((a, b) => a - b);

      let anterior = 0;
      paginasVisiveis.forEach((numero) => {
        if (anterior && numero - anterior > 1) {
          if (numero - anterior === 2) {
            controles.appendChild(botaoPagina(
              String(anterior + 1), anterior + 1,
              "Página " + (anterior + 1) + " de " + numeroPaginas
            ));
          } else {
            const intervalo = document.createElement("span");
            intervalo.className = "paginacao__reticencias";
            intervalo.textContent = "…";
            intervalo.setAttribute("aria-hidden", "true");
            controles.appendChild(intervalo);
          }
        }
        controles.appendChild(botaoPagina(
          String(numero), numero, "Página " + numero + " de " + numeroPaginas,
          false, numero === paginaAtual
        ));
        anterior = numero;
      });

      controles.appendChild(botaoPagina(
        "PRÓXIMA →", Math.min(numeroPaginas, paginaAtual + 1),
        "Próxima página", paginaAtual === numeroPaginas
      ));
      navegacao.append(resumo, controles);
    };

    return {
      mostrar: (filtrados) => {
        resultados = filtrados;
        renderizar();
      }
    };
  };

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
  const paginadorPerfis = criarPaginador(
    perfis, document.getElementById("paginacao-perfis"), "perfil", "perfis",
    document.getElementById("lista-perfis")
  );

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
      const encontrados = perfis.filter((perfil) =>
        normalizar(perfil.dataset.busca).includes(termo)
          && (!uf.value || normalizar(perfil.dataset.uf) === normalizar(uf.value))
          && (!partido.value || normalizar(perfil.dataset.partido) === normalizar(partido.value))
          && (!cargo.value || normalizar(perfil.dataset.cargo).includes(normalizar(cargo.value)))
          && (!situacao.value || perfil.dataset.situacao === situacao.value)
      );
      const visiveis = encontrados.length;
      paginadorPerfis.mostrar(encontrados);
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
      endereco.searchParams.delete("pagina");
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
  const tipoCatalogo = document.querySelector(".camara-inventario");
  const singularCatalogo = tipoCatalogo?.dataset.itemSingular || "deputado";
  const pluralCatalogo = tipoCatalogo?.dataset.itemPlural || "deputados";
  const paginadorCamara = criarPaginador(
    deputadosCamara, document.getElementById("paginacao-camara"),
    singularCatalogo, pluralCatalogo, document.querySelector(".camara-lista")
  );

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
      const termo = normalizarCamara(camaraBusca.value);
      const encontrados = deputadosCamara.filter((deputado) =>
        normalizarCamara(deputado.dataset.camaraBusca).includes(termo)
          && (!camaraUf.value || deputado.dataset.camaraUf === camaraUf.value)
          && (!camaraPartido.value || deputado.dataset.camaraPartido === camaraPartido.value)
      );
      const visiveis = encontrados.length;
      paginadorCamara.mostrar(encontrados);
      camaraContagem.textContent = visiveis + (visiveis === 1 ? " " + singularCatalogo + " encontrado" : " " + pluralCatalogo + " encontrados");
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
      endereco.searchParams.delete("pagina");
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
