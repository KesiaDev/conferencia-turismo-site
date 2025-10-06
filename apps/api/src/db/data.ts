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
    photo: "/speakers/keynote.png",
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
    bio: "Professora, Universidade Federal de Minas Gerais, Brasil. Possui graduação em Economia pela Universidade Católica de Minas Gerais (1982), especialização em Planejamento (Fundação João Pinheiro, 1983) e estatística (UFMG, 1998). Mestre em Turismo pela Universidad de Alicante, Espanha, e doutora em Economia pelo Cedeplar/UFMG e Universidad de Alicante (2012). É professora associada do Departamento de Geografia da UFMG, Curso de Turismo. Foi Diretora Científico-Cultural do Espaço do Conhecimento UFMG (2018–2022). Suas áreas de atuação incluem economia do turismo e da cultura, turismo e pobreza, turismo literário e viabilidade econômica de projetos, com foco atual na interface entre turismo e literatura.",
  },
  {
    id: "deborah",
    name: "Deborah Castro-Mariño",
    affiliation: "RUG (Países Baixos)",
    tags: ["Mesa Internacional"],
    photo: "/speakers/Deborah Castro.png",
    photoModal: "/speakers/Deborah Castro-modal.png",
    bio: "Professora Assistente de Estudos de Mídia na Universidade de Groningen, Holanda, e co-convocadora do grupo de pesquisa Culturas de Produção de Mídia. Possui doutorado em Comunicação pela Universidade Autônoma de Barcelona (2015), com períodos de pesquisa nos EUA. Atuou como pesquisadora e docente em Portugal e na Holanda, incluindo uma bolsa Marie Skłodowska-Curie. É presidente do Centro Erasmus de Conhecimento para Cinema, Patrimônio e Turismo. Também integra a ITI-LARSyS (Portugal). Participa da FitoTO, organização premiada internacionalmente por promover práticas sustentáveis e inclusivas no cinema e turismo. Sua trajetória combina pesquisa, ensino e inovação cultural.",
  },
  {
    id: "jordi",
    name: "Jordi Arcos-Pumarola",
    affiliation: "CETT-UB",
    tags: ["Mesa Internacional"],
    photo: "/speakers/Jordi.png",
    photoModal: "/speakers/Jordi-modal.png",
    bio: "Referência internacional em turismo cultural, literário e cinematográfico, Jordi Arcos-Pumarola é professor e pesquisador do CETT – Universidade de Barcelona, centro líder mundial em educação, pesquisa e inovação em turismo. Com ampla experiência em projetos que unem cultura, inovação territorial e desenvolvimento regional, atua na criação de metodologias e produtos turísticos baseados em narrativas literárias e audiovisuais. Reconhecido por sua capacidade de aproximar academia e mercado, é hoje um dos principais nomes na Europa quando o tema é transformar histórias em experiências que movimentam destinos e fortalecem economias criativas.",
  },
  {
    id: "rita",
    name: "Rita Baleiro",
    affiliation: "UAlg (Portugal)",
    tags: ["Mesa Internacional"],
    photo: "/speakers/RitaBaleiro.png",
    photoModal: "/speakers/RitaBaleiro-modal.png",
    bio: "Investigadora e docente da Universidade do Algarve, Rita Baleiro é referência internacional em turismo literário e cinematográfico. Doutora em Estudos Anglo-Portugueses pela Universidade Nova de Lisboa, tem contribuído de forma decisiva para consolidar este campo de investigação, articulando literatura, cultura e turismo em projetos inovadores como o LITESCAPE.PT – Atlas of Literary Landscapes of Continental Portugal e a Rota Literária do Algarve. Autora e editora de obras fundamentais, incluindo Researching Literary Tourism: A Handbook for Students and Supervisors (2024) e Global Perspectives on Literary Tourism and Film-Induced Tourism (2022), integra redes internacionais como o TULE – Turismo Letterario. Sua produção científica e experiência em organização de conferências internacionais fazem dela uma das vozes mais influentes na valorização do patrimônio literário e cultural como motor de inovação, identidade e desenvolvimento de destinos turísticos.",
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
    bio: "Cineasta e professor de cinema. É jornalista, produtor e diretor cinematográfico. Atuou por oito anos em jornal e televisão antes de fundar, em 2003, a Spaghetti Filmes, produtora brasileira especializada em comunicação digital. Dirigiu mais de 30 obras entre longas, curtas e médias-metragens, além de produzir mais de cem filmes comerciais, institucionais e publicitários. Especialista em artes plásticas com foco em arte digital e novas mídias, segue pesquisando fotografia e cinema. Atualmente é professor da Universidade de Caxias do Sul nos cursos de Produção Audiovisual – Cinema, Fotografia e Artes Visuais.",
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
    bio: "Professor da UFDPar e UFPI / Film Commission Noronha 2B. Doutor em Ciências da Comunicação (UNISINOS) e Mestre em Geografia (UNESP), com especialização em Docência para o Ensino Superior (SENAC) e graduação em Turismo (UNIMEP). Professor da UFDPar desde 2008 e docente permanente dos mestrados em Turismo (UFPR) e Psicologia (UFDPar). Bolsista produtividade CNPq e Pesquisador Destaque ANPTUR 2022. Líder do grupo MiComT e colaborador em grupos nacionais e internacionais. Atuou em cargos de gestão e assessoria na UFDPar e na ABRATUR. Publica e pesquisa temas ligados a Turismo, Comunicação, Educação, Tecnologias e Imagens. Chefe editorial da EDUFDPar e membro de conselhos e governanças institucionais e estaduais.",
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
        location: "Hall Bloco F",
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
        location: "Auditório H",
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
        location: "Hall Bloco F",
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
        location: "Hall Bloco F",
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
        location: "Hall Bloco F",
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
      { label: "até 05/01/2026", value: 60 },
      { label: "06–31/01/2026", value: 70 },
      { label: "01/02–23/03/2026", value: 100 },
    ],
  },
  {
    category: "Pós-graduandos",
    windows: [
      { label: "até 05/01/2026", value: 150 },
      { label: "06–31/01/2026", value: 180 },
      { label: "01/02–23/03/2026", value: 214 },
    ],
  },
  {
    category: "Professores, Pesquisadores ou Profissionais",
    windows: [
      { label: "até 05/01/2026", value: 220 },
      { label: "06–31/01/2026", value: 250 },
      { label: "01/02–23/03/2026", value: 325 },
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
    "Me. Viviane Rocha de Palma",
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
export const submissions: any[] = [];
