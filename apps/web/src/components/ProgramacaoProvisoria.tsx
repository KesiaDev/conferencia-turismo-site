import { useTranslation } from "react-i18next";

interface SessionRow {
  time: string;
  title: string;
  author: string;
  affiliation: string;
}

type CoordinatorHeading = "coordenadores" | "coordenador" | "coordenacao";

interface SessionBlockProps {
  title: string;
  date: string;
  time: string;
  room: string;
  coordinators: string;
  technicalSupport: string;
  rows: SessionRow[];
  coordinatorHeading?: CoordinatorHeading;
}

function coordinatorLabel(h: CoordinatorHeading | undefined): string {
  switch (h) {
    case "coordenador":
      return "Coordenador de sessão";
    case "coordenacao":
      return "Coordenação";
    default:
      return "Coordenadores de sessão";
  }
}

type ProgramEntry =
  | SessionBlockProps
  | { heading: string }
  | { splitSessionPair: true; morning: SessionBlockProps; afternoon: SessionBlockProps };

function isDayHeading(entry: ProgramEntry): entry is { heading: string } {
  return "heading" in entry;
}

function isSplitSessionPair(
  entry: ProgramEntry
): entry is { splitSessionPair: true; morning: SessionBlockProps; afternoon: SessionBlockProps } {
  return (
    "splitSessionPair" in entry &&
    (entry as { splitSessionPair?: boolean }).splitSessionPair === true
  );
}

function ScheduleTable({ rows }: { rows: SessionRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-3 font-semibold w-28">Horário</th>
            <th className="text-left p-3 font-semibold">Trabalho Título</th>
            <th className="text-left p-3 font-semibold w-48">Autor</th>
            <th className="text-left p-3 font-semibold">Universidade/País</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="p-3 align-top font-medium text-gray-800">{row.time}</td>
              <td className="p-3 align-top text-gray-700">{row.title}</td>
              <td className="p-3 align-top text-gray-700">{row.author}</td>
              <td className="p-3 align-top text-gray-700">{row.affiliation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SessionMeta({
  time,
  room,
  coordinators,
  technicalSupport,
  coordinatorHeading,
}: Pick<
  SessionBlockProps,
  "time" | "room" | "coordinators" | "technicalSupport" | "coordinatorHeading"
>) {
  return (
    <>
      <p className="text-sm text-gray-600 mb-0.5">
        <span className="font-semibold">Horário:</span> {time}
      </p>
      <p className="text-sm text-gray-600 mb-0.5">
        <span className="font-semibold">SALA:</span> {room}
      </p>
      <p className="text-sm text-gray-600 mb-0.5">
        <span className="font-semibold">{coordinatorLabel(coordinatorHeading)}:</span>{" "}
        {coordinators}
      </p>
      <p className="text-sm text-gray-600 mb-3">
        <span className="font-semibold">Apoio técnico:</span> {technicalSupport}
      </p>
    </>
  );
}

function SessionBlockSplitPair({
  morning,
  afternoon,
}: {
  morning: SessionBlockProps;
  afternoon: SessionBlockProps;
}) {
  return (
    <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-5">
      <h3 className="text-lg md:text-xl font-bold text-[#e0a085] mb-1.5 whitespace-pre-line">
        {morning.title}
      </h3>
      <p className="text-sm text-gray-600 mb-0.5">
        <span className="font-semibold">Data:</span> {morning.date}
      </p>
      <SessionMeta
        time={morning.time}
        room={morning.room}
        coordinators={morning.coordinators}
        technicalSupport={morning.technicalSupport}
        coordinatorHeading={morning.coordinatorHeading}
      />
      <ScheduleTable rows={morning.rows} />
      <div className="mt-0 border-t border-gray-200 pt-4">
        <SessionMeta
          time={afternoon.time}
          room={afternoon.room}
          coordinators={afternoon.coordinators}
          technicalSupport={afternoon.technicalSupport}
          coordinatorHeading={afternoon.coordinatorHeading}
        />
        <ScheduleTable rows={afternoon.rows} />
      </div>
    </div>
  );
}

function DayHeading({ label }: { label: string }) {
  return (
    <div className="mt-10 mb-4 first:mt-0">
      <p className="text-center text-sm font-semibold uppercase tracking-wide text-[#e0a085]">
        {label}
      </p>
      <div className="mx-auto mt-2 h-px max-w-md bg-[#e0a085]/40" />
    </div>
  );
}

function SessionBlock({
  title,
  date,
  time,
  room,
  coordinators,
  technicalSupport,
  rows,
  coordinatorHeading,
}: SessionBlockProps) {
  return (
    <div className="mb-4 p-4 md:p-5 bg-white rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-lg md:text-xl font-bold text-[#e0a085] mb-1.5 whitespace-pre-line">
        {title}
      </h3>
      <p className="text-sm text-gray-600 mb-0.5">
        <span className="font-semibold">Data:</span> {date}
      </p>
      <SessionMeta
        time={time}
        room={room}
        coordinators={coordinators}
        technicalSupport={technicalSupport}
        coordinatorHeading={coordinatorHeading}
      />
      <ScheduleTable rows={rows} />
    </div>
  );
}

export default function ProgramacaoProvisoria() {
  const { t } = useTranslation();
  const sessions: ProgramEntry[] = [
    { heading: "26 de março de 2026" },
    {
      title:
        "TEMÁTICA 3: Turismo Literário/ Cinematográfico e Economia Criativa\nTEMÁTICA 5: Estudos de casos de modelos bem-sucedidos ou pouco explorados de desenvolvimento territorial orientado para o turismo literário/cinematográfico",
      date: "26 de março de 2026",
      time: "13h30 – 15h",
      room: "401 – Bloco F – UCS",
      coordinators: "Deborah Castro-Mariño e Diomira Cecci Pinto de Faria",
      technicalSupport: "Gabriel Machado Oliveira",
      rows: [
        {
          time: "13h30–13h40",
          title:
            "Turismo Cinematográfico e Memória Cultural: a Ressignificação do Cine Serrano no Hotel Avenida em Cazuza Ferreira (RS)",
          author: "Lisiara Vargas da Rosa; Lucas de Souza Monteiro",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
        {
          time: "13h40–13h50",
          title: "Bases teóricas para o turismo literário em Porto Rico",
          author: "Brenda Mejía",
          affiliation: "Universidad del Sagrado Corazon – USC (Porto Rico) — ONLINE",
        },
        {
          time: "13h50–14h",
          title:
            "Turismo literário sob a perspectiva das Cidades Criativas da UNESCO: uma mirada sobre o Rio de Janeiro, Óbidos, Seattle e Montevidéu",
          author: "Jorge Luis Paula; Valéria Lima Guimarães; Ari da Silva Fonseca",
          affiliation: "Universidade Federal Fluminense – UFF (Brasil)",
        },
        {
          time: "14h–14h10",
          title: "Potencial e desafios da Festa Literária de Marechal Deodoro",
          author: "Manuela Grace de Almeida Rocha Kaspary",
          affiliation: "Instituto Federal de Alagoas – Ifal (Brasil)",
        },
        {
          time: "14h10–14h20",
          title: "Beppe Fenoglio and Literary Tourism in the Langhe",
          author: "Chiara Nencioni",
          affiliation: "University of Pisa (Itália) — ONLINE",
        },
        {
          time: "14h20–14h30",
          title: "O audiovisual como vetor de turismo sustentável em Nova Friburgo – RJ",
          author: "Alinne Schuenck Gama; Ambrozio Correa de Queiroz Neto",
          affiliation: "CEFET/RJ Universidade Nova Friburgo (Brasil)",
        },
        {
          time: "14h30–14h40",
          title:
            "Recursos ocultos e desenvolvimento regional: o patrimônio literário e cinematográfico no Rio Grande do Sul à luz de Albert Hirschman",
          author: "Jacqueline Maria Corá",
          affiliation: "Universidade de Caxias do Sul (Brasil)",
        },
      ],
    },
    {
      splitSessionPair: true,
      morning: {
        title:
          "TEMÁTICA 14: Paisagens literárias e representações fílmicas como catalisadores de identificação regional",
        date: "26 de março de 2026",
        time: "13h30 – 15h",
        room: "403 – Bloco F – UCS",
        coordinators: "(13h30–15h) Ronaldo Leites Diaz e Mariane Gomes (PPGLET)",
        technicalSupport: "Rafael Bardina de Melo",
        rows: [
          {
            time: "13h10–13h45",
            title:
              "Territorio, identidad y ficción: la gastronomía como lenguaje audiovisual del destino turístico",
            author: "Eugeni Osácar; Esther Velasco",
            affiliation:
              "CETT Barcelona School of Tourism, Hospitality and Gastronomy (Espanha) — ONLINE",
          },
          {
            time: "13h45–14h",
            title:
              "Famous Film set’s sense of place among locals: the case of Muhu Island in Estonia",
            author: "Marit Piirman",
            affiliation: "University of Tartu (Estonia) — ONLINE",
          },
          {
            time: "14h–14h15",
            title: "A paisagem como patrimônio cultural: representações fílmicas das tradições",
            author: "Júlia Carneiro Silva",
            affiliation: "Universidade do Estado da Bahia – UNEB (Brasil)",
          },
          {
            time: "14h15–14h30",
            title: "O Tesouro de Umberto Eco",
            author: "Rosana Peccini",
            affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
          },
          {
            time: "14h30–14h40",
            title:
              "Trincheira da imigração: o protagonismo do Malecón de Habana como eixo temático",
            author: "Thiele Aparecida Nascimento Piotto",
            affiliation: "Universidade Cidade de São Paulo – Unicid (Brasil)",
          },
          { time: "—", title: "INTERVALO", author: "—", affiliation: "—" },
        ],
      },
      afternoon: {
        title:
          "TEMÁTICA 14: Paisagens literárias e representações fílmicas como catalisadores de identificação regional",
        date: "26 de março de 2026",
        time: "15h35 – 17h",
        room: "403 – Bloco F – UCS",
        coordinators: "Ronaldo Leites Diaz e Simone Sandi",
        technicalSupport: "Rafael Bardina de Melo",
        rows: [
          {
            time: "15h35–15h50",
            title:
              "Autopesquisa, afetivações e turismo literário e cinematográfico: Verona como destino turístico afetivo",
            author: "Simone Maria Sandi; Maria Luiza Cardinale Baptista",
            affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
          },
          {
            time: "15h50–16h05",
            title:
              '"Duna", a construção do imaginário turístico e a transformação de paisagens ficcionais em desejos de viagem',
            author: "Ronaldo Leites Diaz; Luciane Todeschini Ferreira",
            affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
          },
          {
            time: "16h05–16h20",
            title:
              "Close up em Fortaleza-CE: estudo sobre imagem e imaginário turístico por meio de produção cinematográfica",
            author:
              "Pedro Lucas Filgueira Pereira; Michel Jairo Vieira da Silva; Marcelo da Silva Taveira",
            affiliation: "Universidade Federal do Rio Grande do Norte – UFRN (Brasil)",
          },
          {
            time: "16h20–16h35",
            title:
              "O Imaginário Turístico do Sertão Nordestino: uma análise das telenovelas Mar do Sertão (2022) e No Rancho Fundo (2024)",
            author: "Myllene Medeiros de Oliveira",
            affiliation: "Universidade Federal do Rio Grande do Norte – UFRN (Brasil)",
          },
        ],
      },
    },
    {
      splitSessionPair: true,
      morning: {
        title: "TEMÁTICA 16: Roteiros e rotas/passeios literários e cinematográficos",
        date: "26 de março de 2026",
        time: "13h30 – 15h",
        room: "404 – Bloco F – UCS",
        coordinators: "André Brayner de Farias e Rita Baleiro",
        technicalSupport: "Ernani Viana da Silva",
        rows: [
          {
            time: "13h30–13h45",
            title: "Portuguese literary walks and routes: Practices and recommendations",
            author: "Rita Baleiro",
            affiliation: "ESGHT – Universidade do Algarve, CiTUR-Algarve (Portugal)",
          },
          {
            time: "13h45–14h",
            title:
              "Roteiros e rotas literárias e cinematográficas baseadas em Jorge Amado em Salvador",
            author: "Clara Assunção da Silva Cerqueira",
            affiliation: "Universidade do Estado da Bahia – Uneb (Brasil)",
          },
          {
            time: "14h–14h15",
            title:
              'Da tela para a cidade: roteiro turístico em Salvador inspirado em "Trampolim do Forte"',
            author: "Pohema Profeta de Araújo de Jesus",
            affiliation: "Universidade do Estado da Bahia (Brasil)",
          },
          {
            time: "14h15–14h30",
            title:
              "Punta del Este en los años 60: lugares, recorridos y prácticas de veraneo. Representaciones construidas desde la promoción turística, el cine y la literatura.",
            author: "Victoria Lembo",
            affiliation: "Universidad de la República (Uruguai) — ONLINE",
          },
          {
            time: "14h30–14h45",
            title: "Roteiro Turístico literário: Caminhos de Schlee - Jaguarão/RS",
            author: "Juliana Rose Jasper; Ângela Bento Ribeiro; Alice Leoti",
            affiliation:
              "Universidade Federal do Pampa – Unipampa, Universidade de Caxias do Sul – UCS (Brasil)",
          },
          { time: "—", title: "INTERVALO", author: "—", affiliation: "—" },
        ],
      },
      afternoon: {
        title: "TEMÁTICA 16: Roteiros e rotas/passeios literários e cinematográficos",
        date: "26 de março de 2026",
        time: "15h35 – 17h",
        room: "404 – Bloco F – UCS",
        coordinators: "André Brayner de Farias e Ernani Vieira da Silva",
        technicalSupport: "Patrícia Carvalheiro Pereira",
        rows: [
          {
            time: "15h35–15h50",
            title: "Turismo Literário: um roteiro gastronômico com Nanetto Pipetta",
            author: "Alexandra Marcella Zottis; Susana de Araújo Gastal",
            affiliation: "Universidade do Vale do Itajaí-Univali (Brasil)",
          },
          {
            time: "15h50–16h05",
            title:
              "Turismo, memória e cinefilia: georreferenciamento dos espaços de projeção cinematográfica de Caxias do Sul – RS.",
            author:
              "André Brayner de Farias; Ernani Viana da Silva Neto; Daniel Ignácio Vargas Gomez",
            affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
          },
          {
            time: "16h05–16h20",
            title:
              "Diário de uma intercambista pela 'Ruta de Don Quijote' na Espanha: quando o intercâmbio dialoga com o Turismo Literário",
            author: "Patricia Carvalheiro Pereira",
            affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
          },
          {
            time: "16h20–16h35",
            title:
              "De la mirada viajeira al destino turístico: rutas literarias y construcción del imaginario de Mallorca",
            author: "Fany Magraner-Frau",
            affiliation: "De Fàbula. Cultura sense límits (Espanha) — ONLINE",
          },
          {
            time: "16h35–16h50",
            title:
              "Turismo Literário no contexto do Turismo Social: desafios e potencialidades a partir de experiências do Sesc DF",
            author: "Tathiana de Alcantara Macedo Daou",
            affiliation:
              "Serviço Social do Comércio – Sesc DF/ Universidade de Brasília – UnB (Brasil)",
          },
        ],
      },
    },
    {
      title: "TEMÁTICA 9: Preservação do patrimônio literário e cultural e da autenticidade",
      date: "26 de março de 2026",
      time: "13h30 – 15h",
      room: "405 – Bloco F – UCS",
      coordinators: "Jordi Arco-Pumarolla e Duda Rocha",
      technicalSupport: "Daiane de Lima Pedro",
      rows: [
        {
          time: "13h30–13h45",
          title:
            "Partilhando o pão que o diabo amassou: experiência memorial e de turismo literário no Campo de Concentração do Tarrafal",
          author: "Adriana Coelho Florent",
          affiliation: "Institut des Mondes Africains - Aix-Marseille université (França)",
        },
        {
          time: "13h45–14h",
          title:
            "Preservação do patrimônio literário e cultural em Petrópolis/RJ: um relato biográfico visitável no Museu-Casa Stefan Zweig",
          author: "Anderson Simões da Costa",
          affiliation: "Universidade Federal de Juiz de Fora – UFJF (Brasil)",
        },
        {
          time: "14h–14h15",
          title:
            "El bueno, el feo y el malo: un caso único de turismo de nostalgia en Burgos (España)",
          author: "Beatriz Gómez-Morales",
          affiliation: "Universitat de Lleida (Espanha) — ONLINE",
        },
        {
          time: "14h15–14h30",
          title:
            "Eventos Literários no destino Turístico Termal: o caso da Biblioteca Josino Bretas em Caldas Novas (GO/Brasil)",
          author: "Jean Carlos Vieira Santos; Jackson Santana da Silva; Jairo Alves Leite",
          affiliation: "Universidade Estadual de Goiás UEG (Brasil)",
        },
      ],
    },
    {
      title:
        "TEMÁTICA 1: Envolvimento da comunidade local no turismo literário e cinematográfico\nTEMÁTICA 4: A contribuição do turismo literário e cinematográfico para o bem-estar da comunidade de acolhimento (por exemplo, criação de emprego, oportunidades educativas)",
      date: "26 de março de 2026",
      time: "15h35 – 17h",
      room: "401 – Bloco F – UCS",
      coordinators: "Francielle de Lima e Jenniffer Bauer Eme",
      technicalSupport: "Gabriel Machado Oliveira",
      coordinatorHeading: "coordenador",
      rows: [
        {
          time: "15h35–15h50",
          title:
            "Os benefícios econômicos e culturais da implementação do turismo cinematográfico na cidade de Salvador",
          author: "Pohema Profeta de Araújo de Jesus",
          affiliation: "Universidade do Estado da Bahia – UNEB (Brasil)",
        },
        {
          time: "15h50–16h05",
          title:
            'Visibilidade midiática e valorização turística: a Gamboa em "Street Food: América Latina"',
          author: "Gabryela Caires da Silva; Natalia Silva Coimbra de Sá",
          affiliation: "Universidade do Estado da Bahia – UNEB (Brasil)",
        },
        {
          time: "16h05–16h20",
          title: "Os impactos socioculturais do turismo literário em Paraty",
          author: "Mariana de Oliveira Lacerda; Sofia Vitória Soares Costa; Vinicius de Sena Souza",
          affiliation: "Universidade Federal de Minas Gerais – UFMG (Brasil)",
        },
        {
          time: "16h20–16h35",
          title:
            "Estrategias de emplazamiento como medio para difundir un destino desde el ámbito gastronómico",
          author: "Iliana Castillo",
          affiliation: "ONLINE",
        },
        {
          time: "16h35–16h50",
          title: "Literatura como possibilidade de uma educação patrimonial em Pelotas/RS Brasil",
          author: "Marlise Buchweitz; Dalila Rosa Hallal",
          affiliation: "Universidade Federal de Pelotas – UFPel (Brasil)",
        },
      ],
    },
    {
      title:
        "TEMÁTICA 7: Narração de histórias e comunidades locais no turismo literário e cinematográfico",
      date: "26 de março de 2026",
      time: "15h35 – 17h",
      room: "402 – Bloco F – UCS",
      coordinators: "Márcio Miranda e Ronaldo Velho Bueno",
      technicalSupport: "Daiane de Lima Pedro",
      rows: [
        {
          time: "15h35–15h45",
          title:
            "Literatura infantil, lendas urbanas e turismo literário: a ressignificação da Cabeça de Cuia em Teresina (PI)",
          author: "Célia Revilândia Costa Seabra",
          affiliation:
            "Prefeitura Municipal de Teresina (Secretaria Municipal de Educação) (Brasil)",
        },
        {
          time: "15h45–15h55",
          title:
            'O potencial da obra literária "Caxias do Sul: história e cultura nos distritos" na promoção do turismo étnico inclusivo e sustentável.',
          author:
            "Lisiara Vargas da Rosa; Lucas de Souza Monteiro; Marlei Salete Mecca; Vera Lúcia Steiner",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
        {
          time: "15h55–16h05",
          title:
            "Turismo religioso-cinematográfico em Salvador (BA): o longa-metragem Irmã Dulce (2014) como ferramenta de promoção do roteiro Caminho da Fé",
          author: "Milena Maria Neris de Jesus; Natalia Coimbra de Sá",
          affiliation: "Universidade do Estado da Bahia – UNEB (Brasil)",
        },
        {
          time: "16h05–16h15",
          title:
            "Gastronomia, viagens e cinematografia: narrativas e processos criativos na série Chef's Table.",
          author: "Israel Bertamoni; Gabriela Tieppo Francio; Henrique Subtil Sartori",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
      ],
    },
    { heading: "27 de março de 2026" },
    {
      title: "TEMÁTICA 2 : O papel das Film Commissions",
      date: "27 de março de 2026",
      time: "9h – 10h30",
      room: "401 – Bloco F – UCS",
      coordinators: "André Rianni Costa Perinotto e Vanilson Pereira Silveira",
      technicalSupport: "Patrícia Carvalheiro Pereira",
      coordinatorHeading: "coordenador",
      rows: [
        {
          time: "9h–9h15",
          title:
            "El cine como constructor de imaginarios y motor del desarrollo turístico: articulaciones pendientes en Uruguay",
          author: "Irene Goncalves Mautone",
          affiliation: "Universidade da República – CURE/ Udelar (Uruguai) — ONLINE",
        },
        {
          time: "9h15–9h30",
          title: "Film Commissions em cena: interfaces com o Turismo Audiovisual",
          author: "Vanilson Pereira Silveira",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
        {
          time: "9h30–9h45",
          title:
            "Film Commissions como Vetores Estratégicos do Turismo Cinematográfico: evidências e perspectivas para o Piauí",
          author: "André Riani Costa Perinotto; José Rafael Magalhães Pereira",
          affiliation: "Universidade Federal do Paraná – UFDPar (Brasil)",
        },
        {
          time: "9h45–10h",
          title:
            "PrFilm Commission: experiências e possibilidades futuras para o fomento do turismo e das produções audiovisuais no Paraná.",
          author: "Elizabete Sayuri Kushano; Marcos Luiz Filippim",
          affiliation: "Universidade Federal do Paraná – UFPR (Brasil)",
        },
        {
          time: "10h–10h15",
          title:
            "Turismo e audiovisual em Antônio Prado: o potencial territorial como fator de atração de produções",
          author: "Henrique Sottorriva; Gabriele Euzébio de Brito Noronha",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
      ],
    },
    {
      title:
        "TEMÁTICA 6: Estratégias para promover a sustentabilidade e o desenvolvimento regional por meio do patrimônio literário e das produções cinematográficas",
      date: "27 de março de 2026",
      time: "9h – 10h30",
      room: "402 – Bloco F – UCS",
      coordinators: "Samira Dal'Agnol e Suzana De Conto",
      technicalSupport: "Daiane Lima Pedro",
      rows: [
        {
          time: "9h–9h15",
          title:
            "A dimensão social do ESG no Turismo cinematográfico: caminhos para a sustentabilidade e o desenvolvimento regional",
          author: "Vera Lúcia Steiner",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
        {
          time: "9h15–9h30",
          title:
            "O Turismo literário e a construção de territórios culturais: sustentabilidade nos distritos de Caxias do Sul a partir da obra Caxias do Sul: história e cultura nos distritos",
          author: "Marivania Lucia Sartoretto; Marlei Salete Mecca",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
        {
          time: "9h30–9h45",
          title:
            "Representações audiovisuais e a construção do imaginário turístico: uma análise do Geoparque Seridó (RN, Brasil)",
          author: "Pedro Lucas Filgueira Pereira",
          affiliation: "Universidade Federal do Rio Grande do Norte – UFRN (Brasil)",
        },
        {
          time: "9h45–10h",
          title:
            "Atrativo turístico em perspectiva: Condado Louva Deus em Petrópolis, Rio de Janeiro e a formação de empreendimentos cinematográficos",
          author: "Elis Regina Barbosa Angelo; Gabriella Sena de Lima",
          affiliation: "Universidade Federal Rural do Rio de Janeiro (Brasil)",
        },
      ],
    },
    {
      title:
        "TEMÁTICA 13: Representação cinematográfica/literária das comunidades locais — manhã (9h – 10h30)",
      date: "27 de março de 2026",
      time: "9h – 10h30",
      room: "403 – Bloco F – UCS",
      coordinators: "Flávia Brocchetto Ramos e Simone Sandi",
      technicalSupport: "Bruna Perini Novaes",
      rows: [
        {
          time: "9h–9h15",
          title:
            'O sagrado no livro "A cabeça do santo", de Socorro Acioli, segundo perspectivas de literatura e de cultura',
          author: "Caroline Foss Lovison",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
        {
          time: "9h15–9h30",
          title:
            "Entre fronteiras e telas: representações do refúgio e conflitos de alteridade na interface entre cinema e turismo cinematográfico",
          author: "Duda Rocha",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
        {
          time: "9h30–9h45",
          title: "Patrimônio habitado: o espetáculo Som e Luz como narrativa performativa",
          author: "Rafaely da Silva Reggiori",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
        {
          time: "9h45–10h",
          title:
            "No pulsar da batucada: as toadas dos bumbás no Festival Folclórico de Parintins como pontes narrativas e literárias na Amazônia",
          author: "Anny Gabrielly Peixoto de Oliveira",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
        {
          time: "10h–10h15",
          title:
            "Sabores em cena: a alimentação como porta de entrada para o turismo cinematográfico",
          author: "Bruna Perini Novaes",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
      ],
    },
    {
      title:
        "TEMÁTICA 15: O papel dos autores literários, dos cineastas e das comunidades locais na formação das experiências turísticas",
      date: "27 de março de 2026",
      time: "9h – 10h30",
      room: "404 – Bloco F – UCS",
      coordinators: "Cristina Löff Knapp e Luciane Todeschini Ferreira",
      technicalSupport: "Katharina Lara Giacoboni Nicoletti",
      rows: [
        {
          time: "9h–9h15",
          title:
            "O Quatrilho como mediador de experiências turísticas: literatura, cinema e identidade no Vale dos Vinhedos",
          author: "Cristina Löff Knapp; Samira Dall'Agnol",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
        {
          time: "9h15–9h30",
          title:
            'Construindo a "emoção turística" do Rio de Janeiro: três livros da década de 1930',
          author: "Celso Corrêa Pinto de Castro",
          affiliation: "Fundação Getulio Vargas – Escola de Ciências Sociais FGV CPDOC (Brasil)",
        },
        {
          time: "9h30–9h45",
          title: '"Comer Rezar Amar": quando a narrativa desperta o desejo de viajar',
          author: "Katharina Lara Giacoboni Nicoletti; Bruna Perini Novaes",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
        {
          time: "9h45–10h",
          title: "Gracián e o Barroco Espanhol: Literatura e Turismo Literário",
          author: "Fabio Vinicius de Araujo Passos",
          affiliation: "Universidade da Georgia – UGA (EUA) — ONLINE",
        },
        {
          time: "10h–10h15",
          title:
            "A telenovela brasileira no Leste Europeu: um estudo da percepção do Brasil como destino turístico à luz da fenomenologia de Merleau-Ponty",
          author: "Anastasiya Golets; Lana Magaly Pires",
          affiliation: "Instituto Federal de Brasília (Brasil)",
        },
        {
          time: "10h15–10h30",
          title:
            "Indução pelas telas: o impacto de filmes na formação da imagem de destinos turísticos sob a ótica da teoria do nível de construal",
          author: "Gabriel dos Santos Loch",
          affiliation: "Universidade Regional de Blumenau – FURB (Brasil)",
        },
      ],
    },
    {
      title:
        "TEMÁTICA 13: Representação cinematográfica/literária das comunidades locais — tarde (13h30 – 15h)",
      date: "27 de março de 2026",
      time: "13h30 – 15h",
      room: "401 – Bloco F – UCS",
      coordinators: "Suzana Maria De Conto e Jennifer Bauer Eme",
      technicalSupport: "Daiane de Lima Pedro",
      coordinatorHeading: "coordenacao",
      rows: [
        {
          time: "13h30–13h45",
          title: "Monsanto e Diamantina como destinos turísticos nos anos 1930-40",
          author: "Luís Antônio Contatori Romano",
          affiliation: "Universidade Federal do Sul e Sudeste do Pará – Unifesspa (Brasil)",
        },
        {
          time: "13h45–14h",
          title:
            "Entre acolhimento e recusa: hospitalidade, desejo e as comunidades locais no cinema brasileiro",
          author: "Rodrigo Cabral Oliveira; Sênia Regina Bastos",
          affiliation: "Universidade Anhembi Morumbi (Brasil)",
        },
        {
          time: "14h–14h15",
          title:
            "Imágenes que movilizan: cine de animación, comunidades locales y peregrinajes mediáticos",
          author: "Ilia Alvarado-Sizzo",
          affiliation:
            "Instituto de Geografía – Universidad Nacional Autónoma de México (México) — ONLINE",
        },
        {
          time: "14h15–14h30",
          title:
            "Saneamento Básico como roteiro temático no cinema: uma reflexão para os destinos turísticos",
          author: "Suzana Maria De Conto; Helena Wartha Bolzon",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
        {
          time: "14h30–14h45",
          title:
            "Topografias da solidão: a representação da cidade de Santa Vitória do Palmar narrada por Guilherme Azambuja Castro",
          author: "Cleusa Janete Silva Garcia; Tiago Lopes da Silva; Marlise Buchweitz",
          affiliation: "FURG, FURG, UFPel/FURG (Brasil)",
        },
      ],
    },
    {
      title:
        "TEMÁTICA 8: Governança e planejamento estratégico: colaboração das partes interessadas, mecanismos de financiamento, quadros regulamentares, governos locais, instituições culturais e conselhos de turismo\nTEMÁTICA 12: Interfaces turístico-pedagógicas",
      date: "27 de março de 2026",
      time: "13h30 – 15h",
      room: "403 – Bloco F – UCS",
      coordinators: "Francielle de Lima e Daniel Tomazzoni",
      technicalSupport: "Bruna Perini Novaes",
      coordinatorHeading: "coordenacao",
      rows: [
        {
          time: "13h30–13h40",
          title:
            "A comparative examination of Film Tourism Marketing and Management in Ireland and Portugal",
          author: "Isa Neves",
          affiliation: "Technological University of the Shannon: Midlands (Irlanda) — ONLINE",
        },
        {
          time: "13h40–13h50",
          title:
            "Interfaces Turístico-pedagógicas: a construção da proposta dos piqueniques literários em Jaguarão/RS",
          author: "Ariane Ferreira Clavijo; Jerusa Vieira Urrutia; Francielle de Lima",
          affiliation: "Universidade Federal do Pampa – Unipampa (Brasil)",
        },
        {
          time: "13h50–14h",
          title:
            'O turismo literário e a perspectiva do "pedestre" em Michel de Certeau e do "homem lento" em Milton Santos',
          author: "Juliano Pessanha Gonçalves",
          affiliation: "Centro Federal de Educação Tecnológica – CEFET/RJ (Brasil)",
        },
        {
          time: "13h45–14h",
          title:
            "A interferência da Destination Management Organization Gramadotur na competitividade do destino turístico Gramado-RS/Brasil a partir de uma gestão eficaz",
          author: "Letícia Carvalho Vivian; Rodrigo Luis dos Santos",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
        {
          time: "14h–14h10",
          title:
            "Turismo e cinema: experiências da sala de aula como sessão de filmes, diálogos e estratégias pedagógicas",
          author: "Elizabete Sayuri Kushano; Marcos Luiz Filippim",
          affiliation: "Universidade Federal do Paraná – UFPR (Brasil)",
        },
      ],
    },
    {
      title: "TEMÁTICA 17: Inovação, tendências e propostas",
      date: "27 de março de 2026",
      time: "13h30 – 15h",
      room: "404 – Bloco F – UCS",
      coordinators: "Marcia Speguen de Quadros Piccoli e Diomira Maria Cicci Pinto Faria",
      technicalSupport: "Jennifer Bauer Eme",
      rows: [
        {
          time: "13h30–13h45",
          title:
            "Cinema, Streaming e Turismo Adolescente: a construção do desejo de visitar Salvador",
          author: "Clara Assunção da Silva Cerqueira",
          affiliation: "Universidade do Estado da Bahia – Uneb (Brasil)",
        },
        {
          time: "13h45–14h",
          title: "Turismo em bibliotecas: uma revisão sistemática da literatura",
          author: "Márcia Cavalcanti Moreira; Diomira Maria Cicci Pinto Faria",
          affiliation: "Universidade Federal de Minas Gerais – UFMG (Brasil)",
        },
        {
          time: "14h–14h15",
          title:
            "Cinema e Comunicação: uma análise sobre a importância do audiovisual dentro da produção editorial",
          author: "Luíza Machado Teixeira; Naura Letícia Nascimento Coelho",
          affiliation: "Universidade Federal de Santa Maria (Brasil)",
        },
        {
          time: "14h15–14h30",
          title:
            "O bonito encontro entre narrativas e territórios a partir de eventos sobre Turismo literário e cinematográfico",
          author: "Marcia Speguen de Quadros Piccoli",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
        {
          time: "14h30–14h45",
          title:
            "Narrativas artesãs de viagens: orientação epistemológica potencializadora de turismo literário",
          author: "Jennifer Bauer Eme; Maria Luiza Cardinale Baptista",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
      ],
    },
  ];

  return (
    <div className="mt-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center uppercase tracking-wide">
        {t("program.officialTitle")}
      </h2>
      <div className="space-y-4">
        {sessions.map((entry, index) => (
          <div key={index}>
            {isDayHeading(entry) ? (
              <DayHeading label={entry.heading} />
            ) : isSplitSessionPair(entry) ? (
              <SessionBlockSplitPair morning={entry.morning} afternoon={entry.afternoon} />
            ) : (
              <SessionBlock {...entry} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
