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
    name: "Profa. Diomira Maria Cicci Pinto Faria",
    affiliation: "UFMG",
    tags: ["Keynote", "Turismo & Cinema"],
    photo: "/speakers/diomira.png",
    bio: "Especialista em turismo cinematográfico e políticas culturais.",
  },
  {
    id: "deborah",
    name: "Deborah Castro-Mariño",
    affiliation: "University of Groningen",
    tags: ["Mesa Internacional"],
    photo: "/speakers/deborah.png",
    bio: "Pesquisadora em turismo literário e desenvolvimento territorial.",
  },
  {
    id: "jordi",
    name: "Jordi Arcos-Pumarola",
    affiliation: "CETT-UB",
    tags: ["Mesa Internacional"],
    photo: "/speakers/jordi.png",
    bio: "Especialista em turismo cultural e inovação territorial.",
  },
  {
    id: "rita",
    name: "Rita Baleiro",
    affiliation: "Universidade do Algarve",
    tags: ["Mesa Internacional"],
    photo: "/speakers/rita.png",
    bio: "Investigadora em turismo literário e narrativas territoriais.",
  },
];

export const program: ProgramDay[] = [
  {
    day: "2026-03-26",
    slots: [
      { time: "08:00–09:30", title: "Credenciamento", location: "Hall UCS", kind: "service" },
      { time: "09:00–10:30", title: "Abertura Oficial", location: "Teatro UCS", kind: "plenary" },
      {
        time: "10:30–12:00",
        title: "Palestra de Abertura",
        location: "Teatro UCS",
        kind: "keynote",
      },
      {
        time: "13:30–15:00",
        title: "Sessões Paralelas de Comunicação Científica",
        location: "Salas E/F",
        kind: "sessions",
      },
      { time: "15:10–15:30", title: "Coffee break", location: "Foyer", kind: "break" },
      {
        time: "15:35–17:00",
        title: "Sessões Paralelas de Comunicação Científica",
        location: "Salas E/F",
        kind: "sessions",
      },
      {
        time: "17:15–18:45",
        title:
          "Palestra Magna – Entre palavras: o impacto regional do turismo literário e cinematográfico",
        location: "Teatro UCS",
        kind: "keynote",
        track: "PT",
      },
    ],
  },
  {
    day: "2026-03-27",
    slots: [
      {
        time: "09:00–10:30",
        title: "Sessões Paralelas de Comunicações Científicas",
        location: "Salas E/F",
        kind: "sessions",
      },
      { time: "10:15–10:30", title: "Coffee break", location: "Foyer", kind: "break" },
      {
        time: "10:30–12:00",
        title:
          "Mesa-Redonda Internacional — Turismo literário, turismo cinematográfico e inovação territorial",
        location: "Teatro UCS",
        kind: "panel",
      },
      {
        time: "13:30–15:00",
        title: "Sessões Paralelas de Comunicação Científica",
        location: "Salas E/F",
        kind: "sessions",
      },
      { time: "15:00–15:15", title: "Coffee break", location: "Foyer", kind: "break" },
      {
        time: "15:20–17:00",
        title:
          "Painel Especial — Turismo Cinematográfico e Film Commissions como vetores da economia do turismo",
        location: "Teatro UCS",
        kind: "panel",
      },
      {
        time: "17:15–18:00",
        title: "Encerramento das atividades acadêmicas + Networking",
        location: "Hall",
        kind: "networking",
      },
    ],
  },
  {
    day: "2026-03-28",
    slots: [
      {
        time: "09:00–12:00",
        title: "Tour cultural — Villa Dei Troni (por adesão, vagas limitadas)",
        location: "Villa Dei Troni",
        kind: "tour",
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
    "Comunidade local no turismo literário e cinematográfico",
    "Film Commissions",
    "Economia criativa",
    "Bem-estar/emprego/educação",
    "Casos de desenvolvimento territorial",
    "Sustentabilidade e desenvolvimento regional",
    "Storytelling e comunidades",
    "Governança e planejamento (stakeholders, financiamento, regulação)",
    "Preservação do patrimônio e autenticidade",
    "Projetos em zonas rurais",
    "Percepções das comunidades locais",
    "Interfaces turístico-pedagógicas",
    "Representação literária/cinematográfica",
    "Paisagens literárias e representações fílmicas",
    "Autores, cineastas e comunidades na experiência",
    "Roteiros e rotas",
    "Inovação, tendências e propostas",
  ],
};

export const committees = {
  organizing: [
    "Luciane Todeschini Ferreira (presidente)",
    "Jordi Arcos-Pumarola (copresidente)",
    "Deborah Castro-Mariño (copresidente)",
    "Rita Baleiro (copresidente)",
  ],
  executive: [
    "Luciane T. Ferreira (PPGTURH-UCS)",
    "Márcio Miranda (PPGLET-UCS)",
    "Maria Luiza C. Baptista (PPGTURH-UCS)",
    "Francielle de Lima (UNIPAMPA)",
    "Ronaldo L. Diaz (UCS)",
    "Vanilson P. Silveira (UCS)",
    "Viviane R. Palma (UCS)",
  ],
  scientific: ["Lista completa a ser divulgada em breve"],
};

// In-memory storage for submissions
export const submissions: any[] = [];
