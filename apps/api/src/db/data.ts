import type { Speaker } from "../schemas/speaker.js";
import type { ProgramDay } from "../schemas/session.js";
import type { FeeCategory } from "../schemas/fee.js";

export const meta = {
  title:
    "III Conferência Internacional de Turismo Literário e Cinematográfico — Economia Criativa, Inovação e Desenvolvimento Territorial",
  date: "26–28 Mar 2026",
  venue: "Universidade de Caxias do Sul — Blocos H, E e F (Caxias do Sul/RS, Brasil)",
  languages: ["Português", "Espanhol", "Inglês"],
  emailSubmission: "litfilmtourismconferenceucs@gmail.com",
  submissionDeadline: "2025-12-03",
};

export const speakers: Speaker[] = [
  {
    id: "keynote-tbd",
    name: "Palestrante a definir (Embratur/Ancine)",
    affiliation: "Brasil",
    tags: ["Keynote", "Políticas públicas"],
    photo: "/speakers/Aguarde.png",
    bio: "Representante de órgão público brasileiro relacionado ao turismo e/ou cinema.",
  },
  {
    id: "diomira",
    name: "Diomira Maria Cicci Pinto Faria",
    affiliation: "UFMG",
    tags: [
      "Palestra Magna",
      "O impacto regional do turismo literário e cinematográfico no território",
    ],
    photo: "/speakers/diomira.png",
    photoModal: "/speakers/diomira-modal.png",
    bio: "Professora do curso de Graduação em Turismo e do curso de Pós Graduação Interdisciplinar em Estudo do Lazer, ambos na Universidade Federal de Minas Gerais (UFMG), Diomira é doutora em economia pela Universidade Federal de Minas Gerais - Brasil e pela Universidade de Alicante – Espanha. Com interesse na pesquisa e no ensino da economia da cultura e do turismo, desenvolveu elos criativos entre o turismo e a literatura a partir da participação em projetos de extensão com comunidades que trabalham a obra do escritor João Guimarães Rosa, além de compor a equipe de curadores de exposições museais e festivais. O turismo literário tem sido objeto de suas pesquisas mais recentes.",
  },
  {
    id: "deborah",
    name: "Deborah Castro-Mariño",
    affiliation: "RUG (Países Baixos)",
    tags: ["Mesa Internacional"],
    photo: "/speakers/Deborah Castro.png",
    photoModal: "/speakers/Deborah Castro-modal.png",
    bio: "É Professora de Estudos de Mídia na Universidade de Groningen, Holanda, e co-convocadora do grupo de pesquisa Culturas de Produção de Mídia. Possui doutorado em Comunicação pela Universidade Autônoma de Barcelona (2015), com períodos de pesquisa nos EUA. Atuou como pesquisadora e docente em Espanha, Portugal e na Holanda, incluindo uma bolsa Marie Skłodowska-Curie, da Comissão Europeia. É presidenta do Centro Erasmus de Conhecimento para Cinema, Patrimônio e Turismo (FIHETO), organização premiada internacionalmente por promover práticas sustentáveis e inclusivas no cinema e turismo.",
  },
  {
    id: "jordi",
    name: "Jordi Arcos-Pumarola",
    affiliation: "CETT-UB",
    tags: ["Mesa Internacional"],
    photo: "/speakers/Jordi.png",
    photoModal: "/speakers/Jordi-modal.png",
    bio: "É professor e pesquisador do CETT – Universidade de Barcelona, instituição reconhecida por sua atuação em educação, pesquisa e inovação em turismo. Possui ampla experiência em projetos que articulam cultura, inovação territorial e desenvolvimento regional, dedicando-se à criação de metodologias e produtos turísticos baseados em narrativas literárias e audiovisuais. Sua trajetória destaca-se pela aproximação entre universidade e mercado, contribuindo para transformar histórias em experiências que fortalecem os destinos e impulsionam as economias criativas.",
  },
  {
    id: "rita",
    name: "Rita Baleiro",
    affiliation: "UAlg (Portugal)",
    tags: ["Mesa Internacional"],
    photo: "/speakers/RitaBaleiro.png",
    photoModal: "/speakers/RitaBaleiro-modal.png",
    bio: "Rita Baleiro é professora coordenadora na Escola Superior de Gestão, Hotelaria e Turismo, da Universidade do Algarve (Portugal), é doutorada em Estudos Literários pela Universidade Nova de Lisboa e mestre em Estudos Anglo-Portugueses pela mesma universidade. É investigadora integrada no Centre for Research, Development and Innovation in Tourism (CITUR), e no Centro de Investigação sobre Turismo Literário (TULE). É coeditora da revista académica Journal of Tourism & Arts. Na última década, tem desenvolvido investigação na área dos estudos em turismo e literatura, organizado diversos encontros científicos sobre este tema e publicado trabalhos nesta área. É coeditora do E-Dictionary of Literary Tourism (2023). ORCID 0000-0002-3188-5150",
  },
  {
    id: "andre",
    name: "André Riani Costa Perinotto",
    affiliation: "UFDPar (Brasil)",
    tags: [
      "Painel Especial",
      "Turismo Cinematográfico e Film Commissions como vetores da economia do turismo",
    ],
    photo: "/speakers/Andre Peritonotto.png",
    photoModal: "/speakers/Andre Peritonotto-modal.png",
    bio: "Doutor em Ciências da Comunicação (UNISINOS) e Mestre em Geografia (UNESP), com especialização em Docência para o Ensino Superior (SENAC) e graduação em Turismo (UNIMEP). Professor da UFDPar desde 2008 e docente permanente dos mestrados em Turismo (UFPR) e Psicologia (UFDPar). Bolsista produtividade CNPq e Pesquisador Destaque ANPTUR 2022. Líder do grupo MiComT e colaborador em grupos nacionais e internacionais. Atuou em cargos de gestão e assessoria na UFDPar e na ABRATUR. Publica e pesquisa temas ligados a Turismo, Comunicação, Educação, Tecnologias e Imagens. Ex-Chefe editorial da EDUFDPar e membro de conselhos e governanças institucionais e estaduais.",
  },
  {
    id: "lissandro",
    name: "Lissandro Stallivieri",
    affiliation: "UCS (Brasil)",
    tags: [
      "Painel Especial",
      "Turismo Cinematográfico e Film Commissions como vetores da economia do turismo",
    ],
    photo: "/speakers/Lissandro.png",
    photoModal: "/speakers/Lissandro-modal.png",
    bio: "Cineasta e professor de cinema da Universidade de Caxias do Sul, Brasil. É roteirista e diretor cinematográfico. Sócio fundador da Spaghetti Filmes, produtora brasileira independente. Professor da Universidade de Caxias do Sul nos cursos de Cinema, Fotografia e Bacharelado em Artes Visuais. Com especialização em Artes Visuais e qualificações em Cinema, domina a escrita de Roteiro, processos de Direção e Produção Executiva de filmes. Dirigiu mais de 30 obras audiovisuais entre curtas, médias e longas metragens dos gêneros ficção e documentário, tendo gravado em diversos lugares do Brasil e em países como Chile e Itália.",
  },
  {
    id: "ronaldo",
    name: "Ronaldo Leites Diaz",
    affiliation: "Doutorando PPGTURH - UCS (Brasil)",
    tags: [
      "Painel Especial",
      "Turismo Cinematográfico e Film Commissions como vetores da economia do turismo",
    ],
    photo: "/speakers/Ronaldo.png",
    photoModal: "/speakers/Ronaldo-modal.png",
    bio: "É doutorando e mestre em Turismo e Hospitalidade pelo Programa de Pós-Graduação em Turismo e Hospitalidade da Universidade de Caxias do Sul (UCS), onde também se graduou em Letras e em Gastronomia. Sua tese é voltada ao turismo Literário e Cinematográfico, com ênfase nos processos de representação e nas relações entre ficção, criação e realidade turística. É pesquisador do HOSPITUR – Grupo de Estudos sobre Hospitalidade, vinculado ao PPGTURH/UCS, e participa do Núcleo de Pesquisa em Desenvolvimento Humano e Social, Linguagens e Processos Educacionais, integrando o projeto Turismo essencialmente pedagógico, Cidades Educadoras e Hospitalidade (TEPHCE), voltado à reformulação de políticas públicas de turismo com foco no desenvolvimento humano e social. E-mail: rldiaz@ucs.br. ORCID: 0000-0001-5141-2505.",
  },
  {
    id: "duda-rocha",
    name: "Duda Rocha",
    affiliation: "UCS (Brasil)",
    tags: [
      "Painel Especial",
      "Turismo Cinematográfico e Film Commissions como vetores da economia do turismo",
    ],
    photo: "/speakers/Duda Rocha.png",
    photoModal: "/speakers/Duda Rocha-modal.png",
    bio: "Duda Rocha é Bacharel, Mestra e Doutoranda em Turismo e Hospitalidade pela Universidade de Caxias do Sul (UCS), com formação em Comunicação Social – Publicidade e Propaganda. Possui especialização em Cultural Heritage Enhancement pela Università La Sapienza di Roma e realizou intercâmbio de pesquisa na Universidade de Coimbra (Portugal), com foco em turismo, território e patrimônio. Com mais de duas décadas de experiência nos campos da comunicação, cultura e turismo, consolidou trajetória em produção audiovisual, direção e curadoria de curtas-metragens e documentários, explorando narrativas que articulam memória, identidade e desenvolvimento regional. É pesquisadora dos grupos HOSPITUR – Turismo e Hospitalidade: Desenvolvimento Humano e Social, Linguagem e Processos Educacionais – e do Núcleo de Estudos Migratórios (CNPq/UCS), onde desenvolve estudos interdisciplinares sobre memória, etnicidade, hospitalidade e cultura, contribuindo para o debate contemporâneo sobre economia criativa e políticas culturais como dimensões estratégicas do desenvolvimento sustentável dos territórios.",
  },
];

export const program: ProgramDay[] = [
  {
    day: "2026-03-26",
    slots: [
      {
        time: "08:00–09:30",
        title: "Credenciamento",
        location: "Hall Bloco F",
        kind: "service",
      },
      {
        time: "09:00–10:30",
        title: "Abertura Oficial",
        description:
          "Representantes: Ministério do Turismo, Secretaria Estadual do Turismo/RS, Secretaria Municipal do Turismo de Caxias do Sul, Pró-Reitoria de Pós-Graduação UCS, Coordenações PPGTURH e PPGLET, Comissão Organizadora.",
        location: "UCS Teatro",
        kind: "plenary",
      },
      {
        time: "10:30–12:00",
        title: "Palestra de Abertura",
        description:
          "Turismo Literário e Cinematográfico como vetor de desenvolvimento territorial, inovação e internacionalização do Brasil",
        speaker: "Representante da Embratur ou Ancine (a definir)",
        location: "UCS Teatro",
        kind: "keynote",
      },
      {
        time: "12:00–13:30",
        title: "Intervalo / Almoço livre",
        location: "—",
        kind: "break",
      },
      {
        time: "13:30–15:00",
        title: "Sessões Paralelas de Comunicação Científica",
        location: "Bloco F",
        kind: "sessions",
      },
      {
        time: "15:10–15:30",
        title: "Coffee break",
        location: "Hall do Bloco F",
        kind: "break",
      },
      {
        time: "15:35–17:00",
        title: "Sessões Paralelas de Comunicação Científica",
        location: "Bloco F",
        kind: "sessions",
      },
      {
        time: "17:15–18:45",
        title: "Palestra Magna",
        description:
          "Entre palavras: o impacto regional do turismo literário e cinematográfico no território",
        speaker: "Diomira Maria Cicci Pinto Faria (UFMG)",
        location: "UCS Teatro",
        kind: "keynote",
      },
      {
        time: "19:30",
        title: "Jantar por adesão",
        description: "Churrascaria Imperador",
        location: "Externo",
        kind: "service",
      },
    ],
  },
  {
    day: "2026-03-27",
    slots: [
      {
        time: "09:00–10:30",
        title: "Sessões Paralelas de Comunicações Científicas",
        location: "Bloco F",
        kind: "sessions",
      },
      {
        time: "10:15–10:30",
        title: "Coffee break",
        location: "Hall do Bloco F",
        kind: "break",
      },
      {
        time: "10:30–12:00",
        title: "Mesa-Redonda Internacional",
        description: "Turismo literário, turismo cinematográfico e inovação territorial",
        speaker:
          "Deborah Castro-Mariño (Univ. Groningen, Países Baixos), Jordi Arcos-Pumarola (CETT – Univ. Barcelona, Espanha), Rita Baleiro (Univ. Algarve, Portugal)",
        location: "Auditório Bloco H",
        kind: "plenary",
      },
      {
        time: "12:00–13:30",
        title: "Intervalo / Almoço livre",
        location: "—",
        kind: "break",
      },
      {
        time: "13:30–15:00",
        title: "Sessões Paralelas de Comunicação Científica",
        location: "Bloco F",
        kind: "sessions",
      },
      {
        time: "15:00–15:15",
        title: "Coffee break",
        location: "Hall do Bloco F",
        kind: "break",
      },
      {
        time: "15:20–17:00",
        title: "Painel Especial",
        description:
          "Turismo Cinematográfico e Film Commissions como vetores da economia do turismo",
        speaker:
          "Lissandro Stallivieri (cineasta, professor de cinema UCS, Spaghetti Films), Representante da Film Commission Porto Alegre (a confirmar), André Perinotto (UFPI / Film Commission Noronha 2B)",
        location: "Auditório Bloco H",
        kind: "keynote",
      },
      {
        time: "17:15–18:00",
        title: "Encerramento das atividades acadêmicas + Networking",
        location: "UCS Teatro",
        kind: "service",
      },
    ],
  },
  {
    day: "2026-03-28",
    slots: [
      {
        time: "09:00–12:00",
        title: "Tour cultural na Villa Dei Troni",
        description:
          "O encerramento da conferência será marcado por uma experiência imersiva na Villa Dei Troni, um espaço que combina natureza, história, arte e gastronomia. Localizada em meio a vinhedos e jardins, a Villa oferece uma atmosfera única, que traduz a essência da Serra Gaúcha como território de hospitalidade e criatividade. Os participantes terão a oportunidade de vivenciar um ambiente de inspiração literária e cinematográfica, cercado por cenários que remetem à estética europeia, com arquitetura charmosa e vistas deslumbrantes. Além do tour guiado, haverá momentos de integração, degustação de produtos locais e a possibilidade de fotografias em cenários memoráveis.",
        location: "Villa Dei Troni",
        kind: "tour",
        track: "Por adesão - Vagas limitadas",
      },
    ],
  },
];

export const fees: FeeCategory[] = [
  {
    category: "Estudantes de Graduação",
    windows: [
      {
        label: "até 05/01/2026",
        value: 60,
        paymentUrl:
          "https://sou.ucs.br/inscricoes/formulario/iii-conferencia-internacional-sobre-turismo-literario-e-cinematografico-lote-1-estudantes-de-graduacao-ext038806",
      },
      {
        label: "06–31/01/2026",
        value: 70,
        paymentUrl:
          "https://sou.ucs.br/inscricoes/formulario/iii-conferencia-internacional-sobre-turismo-literario-e-cinematografico-lote-2-estudantes-de-graduacao-ext038806",
      },
      {
        label: "01/02–23/03/2026",
        value: 100,
        paymentUrl:
          "https://sou.ucs.br/inscricoes/formulario/iii-conferencia-internacional-sobre-turismo-literario-e-cinematografico-lote-3-estudantes-de-graduacao-ext038806",
      },
    ],
  },
  {
    category: "Pós-graduandos",
    windows: [
      {
        label: "até 05/01/2026",
        value: 150,
        paymentUrl:
          "https://sou.ucs.br/inscricoes/formulario/iii-conferencia-internacional-sobre-turismo-literario-e-cinematografico-lote-1-pos-graduandos-ext038806",
      },
      {
        label: "06–31/01/2026",
        value: 180,
        paymentUrl:
          "https://sou.ucs.br/inscricoes/formulario/iii-conferencia-internacional-sobre-turismo-literario-e-cinematografico-lote-2-pos-graduandos-ext038806",
      },
      {
        label: "01/02–23/03/2026",
        value: 214,
        paymentUrl:
          "https://sou.ucs.br/inscricoes/formulario/iii-conferencia-internacional-sobre-turismo-literario-e-cinematografico-lote-3-estudantes-de-pos-graduacao-ext038806",
      },
    ],
  },
  {
    category: "Professores, Pesquisadores ou Profissionais",
    windows: [
      {
        label: "até 05/01/2026",
        value: 220,
        paymentUrl:
          "https://sou.ucs.br/inscricoes/formulario/iii-conferencia-internacional-sobre-turismo-literario-e-cinematografico-lote-1-professores-pesquisadores-e-profissionais-da-area-e-interessados-ext038806",
      },
      {
        label: "06–31/01/2026",
        value: 250,
        paymentUrl:
          "https://sou.ucs.br/inscricoes/formulario/iii-conferencia-internacional-sobre-turismo-literario-e-cinematografico-lote-2-professores-pesquisadores-profissionais-da-area-e-interessados-ext038806",
      },
      {
        label: "01/02–23/03/2026",
        value: 325,
        paymentUrl:
          "https://sou.ucs.br/inscricoes/formulario/iii-conferencia-internacional-sobre-turismo-literario-e-cinematografico-lote-3-professores-pesquisadores-profissionais-da-area-e-interessados-ext038806",
      },
    ],
  },
];

export const callForPapers = {
  email: "litfilmtourismconferenceucs@gmail.com",
  deadlineISO: "2025-12-03",
  languages: ["PT", "ES", "EN"],
  formats: [
    {
      type: "Apresentação individual",
      words: 300,
      mustInclude: [
        "título",
        "objetivos",
        "metodologia",
        "resultados",
        "conclusões",
        "3–5 referências",
        "linha temática",
        "autores e afiliações",
      ],
    },
    {
      type: "Painel (4–6 comunicações)",
      words: 500,
      mustInclude: [
        "título do painel",
        "resumo",
        "5–10 referências",
        "lista de autores/afiliações de todos os membros",
      ],
    },
  ],
  tracks: [
    "1. Envolvimento da comunidade local no turismo literário e cinematográfico",
    "2. O papel das Film Commissions",
    "3. Turismo Literário/Cinematográfico e Economia Criativa",
    "4. A contribuição do turismo literário e cinematográfico para o bem-estar da comunidade de acolhimento (criação de emprego, oportunidades educativas)",
    "5. Estudos de casos de modelos bem sucedidos ou pouco explorados de desenvolvimento territorial orientado para o turismo literário/cinematográfico",
    "6. Estratégias para promover a sustentabilidade e o desenvolvimento regional por meio do patrimônio literário e das produções cinematográficas",
    "7. Narração de histórias e comunidades locais no turismo literário e cinematográfico",
    "8. Governança e planeamento estratégico: colaboração das partes interessadas, mecanismos de financiamento, quadros regulamentares, governos locais, instituições culturais e conselhos de turismo",
    "9. Preservação do patrimônio literário e cultural e da autenticidade",
    "10. Desenvolvimento de projetos em zonas rurais",
    "11. Percepções das comunidades locais sobre o turismo literário e cinematográfico",
    "12. Interfaces turístico-pedagógicas",
    "13. Representação cinematográfica/literária das comunidades locais",
    "14. Paisagens literárias e representações fílmicas como catalisadores de identificação regional",
    "15. O papel dos autores literários, dos cineastas e das comunidades locais na formação das experiências turísticas",
    "16. Roteiros e rotas/passeios literários e cinematográficos",
    "17. Inovação, tendências e propostas",
  ],
};

export const committees = {
  organizing: [
    "Dra. Luciane Todeschini Ferreira (presidente)",
    "Dr. Jordi Arcos-Pumarola (copresidente)",
    "Dra. Deborah Castro-Mariño (copresidente)",
    "Dra. Rita Baleiro (copresidente)",
  ],
  executive: [
    "Dra. Luciane Todeschini Ferreira (PPGTURH-UCS)",
    "Dra. Maria Luiza Cardinale Baptista (Coordenadora PPGTURH-UCS)",
    "Dr. Márcio Miranda (Coordenador PPGLET-UCS)",
    "Dra. Francielle de Lima (Professora UNIPAMPA, doutora egressa PPGTURH-UCS)",
  ],
  doctoral: [
    "Me. Ronaldo Leites Diaz",
    "Me. Vanilson Pereira Silveira",
    "Me. Viviane da Rocha Palma",
  ],
  scientific: [
    "Dr. Alberto Rophe (Unirio e USP)",
    "Dra. Ana Paula Spolon (UFF)",
    "Dra. Ana Sofia Duque (Instituto Politécnico de Viseu, Portugal)",
    "Dr. André Riani Costa Perinotto (Universidade Federal do Piauí e UECE, Brazil)",
    "Dr. Antonio Martínez Puche (Universitat d'Alacant, Spain)",
    "Dr. Ari da Silva Fonseca Filho (UFF, Brasil)",
    "Dra. Cristina Loff Knapp (Universidade de Caxias do Sul, Brasil)",
    "Dra. Flávia Brocchetto Ramos (Universidade de Caxias do Sul, Brasil)",
    "Dra. Jasna Potočnik Topler (University of Maribor, Slovenia)",
    "Dra. Samira Dall Agnol (Universidade de Caxias do Sul, Brasil)",
    "Dra. Noelia Araújo (Universidad de Vigo, Spain)",
    "Dr. Oriol Anguera-Torrell (CETT-UB, Spain)",
    "Dra. Rosária Pereira (Universidade de Algarve, Portugal)",
    "Dra. Sonja Novak (University of Osijek, Croatia)",
    "Dr. Walter Zidaric (Nantes Université, France)",
    "Dr. Yannick Gouchan (Aix Marseille Université, France)",
  ],
};

// In-memory storage for submissions
export const submissions: unknown[] = [];
