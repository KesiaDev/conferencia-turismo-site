interface SessionRow {
  time: string;
  title: string;
  author: string;
  affiliation: string;
}

interface SessionBlockProps {
  title: string;
  date: string;
  time: string;
  rows: SessionRow[];
}

function SessionBlock({ title, date, time, rows }: SessionBlockProps) {
  return (
    <div className="mb-4 p-4 md:p-5 bg-white rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-lg md:text-xl font-bold text-[#e0a085] mb-1.5">{title}</h3>
      <p className="text-sm text-gray-600 mb-0.5">
        <span className="font-semibold">Data:</span> {date}
      </p>
      <p className="text-sm text-gray-600 mb-0.5">
        <span className="font-semibold">Horário:</span> {time}
      </p>
      <p className="text-sm text-gray-600 mb-3">
        <span className="font-semibold">SALA:</span> a definir |{" "}
        <span className="font-semibold">Coordenador de sessão:</span> a definir
      </p>
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
    </div>
  );
}

export default function ProgramacaoProvisoria() {
  const sessions: SessionBlockProps[] = [
    {
      title:
        "1. Envolvimento da comunidade local no turismo literário e cinematográfico + 4. A contribuição do turismo literário e cinematográfico para o bem-estar da comunidade de acolhimento (por exemplo, criação de emprego, oportunidades educativas)",
      date: "26 de março de 2026",
      time: "15h35 – 17h",
      rows: [
        {
          time: "15h35-15h50",
          title: "Os impactos socioculturais do turismo literário em Paraty",
          author: "Mariana de Oliveira Lacerda; Sofia Vitória Soares Costa; Vinicius de Sena Souza",
          affiliation: "Universidade Federal de Minas Gerais - UFMG (Brasil)",
        },
        {
          time: "15h50-16h05",
          title: "Literatura como possibilidade de uma educação patrimonial em Pelotas/RS Brasil",
          author: "Marlise Buchweitz; Dalila Rosa Hallal",
          affiliation: "Universidade Federal de Pelotas - UFPel (Brasil)",
        },
        {
          time: "16h05-16h20",
          title:
            "Os benefícios econômicos e culturais da implementação do turismo cinematográfico na cidade de Salvador",
          author: "Pohema Profeta de Araújo de Jesus",
          affiliation: "Universidade do Estado da Bahia – UNEB (Brasil)",
        },
        {
          time: "16h20-16h35",
          title:
            "Turismo literário, sociobiodiversidade e desenvolvimento territorial: estudo comparativo entre o Sertão Rosiano e o Alentejo",
          author: "Luiza Souza Pereira",
          affiliation: "Universidade Federal de Minas Gerais – UFMG (Brasil)",
        },
        {
          time: "16h35-16h50",
          title:
            'Visibilidade midiática e valorização turística: a Gamboa em "Street Food: América Latina"',
          author: "Gabryela Caires da Silva; Natalia Silva Coimbra de Sá.",
          affiliation: "Universidade do Estado da Bahia – UNEB (Brasil)",
        },
      ],
    },
    {
      title: "2. O papel das Film Commissions",
      date: "27 de março de 2026",
      time: "9h-10h30",
      rows: [
        {
          time: "9h-9h15",
          title:
            "PrFilm Commission: experiências e possibilidades futuras para o fomento do turismo e das produções audiovisuais no Paraná.",
          author: "Elizabete Sayuri Kushano; Marcos Luiz Filippim",
          affiliation: "Universidade Federal do Paraná - UFPR (Brasil)",
        },
        {
          time: "9h15-9h30",
          title:
            "Turismo e audiovisual em Antônio Prado: o potencial territorial como fator de atração de produções",
          author: "Henrique Sottorriva; Gabriele Euzébio de Brito Noronha",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
        {
          time: "9h30-9h45",
          title:
            "El cine como constructor de imaginarios y motor del desarrollo turístico: articulaciones pendientes en Uruguay",
          author: "Irene Goncalves Mautone",
          affiliation: "Universidade da República - CURE/ Udelar (Uruguai)",
        },
        {
          time: "9h45-10h",
          title: "Film Commissions em cena: interfaces com o Turismo Audiovisual",
          author: "Vanilson Pereira Silveira",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
        {
          time: "10h-10h15",
          title:
            "Film Commissions como Vetores Estratégicos do Turismo Cinematográfico: evidências e perspectivas para o Piauí",
          author:
            "André Riani Costa Perinotto, José Rafael Magalhães Pereira, José Maria Alves da Cunha",
          affiliation: "Universidade Federal do Paraná - UFDPar (Brasil)",
        },
      ],
    },
    {
      title: "3. Turismo Literário/ Cinematográfico e Economia Criativa",
      date: "26 de março de 2026",
      time: "13h30-15h",
      rows: [
        {
          time: "13h30-13h45",
          title:
            "Romeu e Julieta na promoção turística de Verona: Construção da imagem da cidade como destino literário",
          author:
            "Luana Fernanda de Andrade; Maria Antônia Teixeira dos Santos; Vanessa de Fátima da Silva",
          affiliation: "Universidade Federal de Minas Gerais – UFMG (Brasil)",
        },
        {
          time: "13h45-14h",
          title:
            "Turismo cinematográfico e Turismo musical: impactos do show da Madonna no Rio de Janeiro (The Celebration Tour, 2024)",
          author: "Ney Felipy Santos Figueiredo",
          affiliation: "Universidade Federal de Mato Grosso do Sul – UFMS (Brasil)",
        },
        {
          time: "14h-14h15",
          title:
            "Turismo Cinematográfico e Memória Cultural: a Ressignificação do Cine Serrano no Hotel Avenida em Cazuza Ferreira (RS)",
          author: "Lisiara Vargas da Rosa; Lucas de Souza Monteiro",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
        {
          time: "14h15-14h30",
          title:
            "Turismo literário sob a perspectiva das Cidades Criativas da UNESCO: uma mirada sobre o Rio de Janeiro, Óbidos, Seattle e Montevidéu",
          author: "Jorge Luis Paula; Valéria Lima Guimarães; Ari da Silva Fonseca",
          affiliation: "Universidade Federal Fluminense – UFF (Brasil)",
        },
        {
          time: "14h30-14h45",
          title: "Bases teóricas para o turismo literário em Porto Rico",
          author: "Brenda Mejía",
          affiliation: "Universidad del Sagrado Corazon – USC (Porto Rico)",
        },
      ],
    },
    {
      title:
        "5. Estudos de casos de modelos bem-sucedidos ou pouco explorados de desenvolvimento territorial orientado para o turismo literário/cinematográfico",
      date: "26 de março de 2026",
      time: "13h30 às 15h",
      rows: [
        {
          time: "13h30-13h45",
          title: "Potencial e desafios da Festa Literária de Marechal Deodoro",
          author: "Manuela Grace de Almeida Rocha Kaspary",
          affiliation: "Instituto Federal de Alagoas - Ifal (Brasil)",
        },
        {
          time: "13h45-14h",
          title: "O design estratégico e a imersão narrativa do product placement hoteleiro.",
          author: "Lucas Becker, Fabricio Farias Tarouco",
          affiliation: "Universidade do Vale do Rio dos Sinos – Unisinos (Brasil)",
        },
        {
          time: "14h-14h15",
          title: "Beppe Fenoglio and Literary Tourism in the Langhe",
          author: "Chiara Nencioni",
          affiliation: "University of Pisa (Itália)",
        },
        {
          time: "14h15-14h30",
          title: "O audiovisual como vetor de turismo sustentável em Nova Friburgo – RJ.",
          author: "Alinne Schuenck Gama; Ambrozio Correa de Queiroz Neto",
          affiliation: "CEFET/RJ Uned Nova Friburgo (Brasil)",
        },
        {
          time: "14h30-14h45",
          title:
            "Recursos ocultos e desenvolvimento regional: o patrimônio literário e cinematográfico no Rio Grande do Sul à luz de Albert Hirschman",
          author: "Jacqueline Maria Corá",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
      ],
    },
    {
      title:
        "6. Estratégias para promover a sustentabilidade e o desenvolvimento regional por meio do patrimônio literário e das produções cinematográficas",
      date: "27 de março de 2026",
      time: "9h-10h30",
      rows: [
        {
          time: "9h-9h15",
          title:
            "Comprometimento comunitário responsável: uma proposta teórica e suas possíveis conexões com narrativas territoriais e turismo cinematográfico",
          author: "Carla Stefânia Cabral de Medeiros Santana; Marcos Antonio Leite do Nascimento",
          affiliation: "Universidade Federal do Rio Grande do Norte- UFRN (Brasil)",
        },
        {
          time: "9h15-9h30",
          title:
            "A dimensão social do ESG no Turismo cinematográfico: caminhos para a sustentabilidade e o desenvolvimento regional",
          author: "Vera Lúcia Steiner",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
        {
          time: "9h30-9h45",
          title:
            'O Turismo literário e a construção de territórios culturais: sustentabilidade nos distritos de Caxias do Sul a partir da obra "Caxias do Sul: história e cultura nos distritos"',
          author: "Marivania Lucia Sartoretto, Marlei Salete Mecca",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
        {
          time: "9h45-10h",
          title:
            "Atrativo turístico em perspectiva: Condado Louva Deus em Petrópolis, Rio de Janeiro e a formação de empreendimentos cinematográficos",
          author: "Elis Regina Barbosa Angelo; Gabriella Sena de Lima",
          affiliation: "Universidade Federal Rural do Rio de Janeiro (Brasil)",
        },
        {
          time: "10h-10h15",
          title:
            "Representações audiovisuais e a construção do imaginário turístico: uma análise do Geoparque Seridó (RN, Brasil)",
          author: "Pedro Lucas Filgueira Pereira",
          affiliation: "Universidade Federal do Rio Grande do Norte – UFRN (Brasil)",
        },
      ],
    },
    {
      title: "7. Narração de histórias e comunidades locais no turismo literário e cinematográfico",
      date: "26 de março de 2026",
      time: "15h35 às 17h",
      rows: [
        {
          time: "15h35-15h45",
          title:
            "Potencial para o turismo literário: Uruçuca-BA, antiga Água Preta, a partir dos escritos de Jorge Medauar",
          author: "Verena Santos Abreu; Isaías Ferreira de Oliveira.",
          affiliation: "Instituto Federal Baiano - IF Baiano (Brasil)",
        },
        {
          time: "15h45-15h55",
          title:
            "Entre o mito e a cidade: o imaginário do Cavaleiro Sem Cabeça e o turismo literário em Sleepy Hollow",
          author: "Laura Ferrari Colla",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
        {
          time: "15h55-16h05",
          title:
            "Literatura infantil, lendas urbanas e turismo literário: a ressignificação da Cabeça de Cuia em Teresina (PI)",
          author: "Célia Revilândia Costa Seabra",
          affiliation:
            "Prefeitura Municipal de Teresina (Secretaria Municipal de Educação) (Brasil)",
        },
        {
          time: "16h05-16h15",
          title:
            'O potencial da obra literária "Caxias do Sul: história e cultura nos distritos" na promoção do turismo étnico inclusivo e sustentável.',
          author:
            "Lisiara Vargas da Rosa; Lucas de Souza Monteiro; Marlei Salete Mecca; Vera Lúcia Steiner",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
        {
          time: "16h15-16h25",
          title:
            "Turismo religioso-cinematográfico em Salvador (BA): o longa-metragem Irmã Dulce (2014) como ferramenta de promoção do roteiro Caminho da Fé",
          author: "Milena Maria Neris de Jesus; Natalia Coimbra de Sá",
          affiliation: "Universidade do Estado da Bahia – UNEB (Brasil)",
        },
        {
          time: "16h25-16h35",
          title:
            "Gastronomia, viagens e cinematografia: narrativas e processos criativos na série Chef's Table.",
          author: "Israel Bertamoni; Gabriela Tieppo Francio; Henrique Subtil Sartori.",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
        {
          time: "16h35-16h45",
          title:
            '"Of Color and Ink": A produção audiovisual como dispositiva potencializador de Conexão de Saberes, Pertencimento e Turismo Cultural em Mogi das Cruzes–SP',
          author: "Camila Carvalho de Melo",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
      ],
    },
    {
      title:
        "8. Governança e planeamento estratégico: colaboração das partes interessadas, mecanismos de financiamento, quadros regulamentares, governos locais, instituições culturais e conselhos de turismo",
      date: "27 de março de 2026",
      time: "13h30-15h",
      rows: [
        {
          time: "13h30-13h45",
          title:
            "A comparative examination of Film Tourism Marketing and Management in Ireland and Portugal",
          author: "Isa Neves; Kelly Maguire; Nuno Almeida",
          affiliation: "Technological University of the Shannon: Midlands (Irlanda)",
        },
        {
          time: "13h45-14h",
          title:
            "A interferência da Destination Management Organization Gramadotur na competitividade do destino turístico Gramado-RS/Brasil a partir de uma gestão eficaz",
          author: "Letícia Carvalho Vivian; Rodrigo Luis dos Santos",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
        {
          time: "14h-14h15",
          title:
            "Colaboração Intersetorial entre atores do turismo e do audiovisual na gestão e marketing do turismo cinematográfico: uma Revisão Sistemática da Literatura com Protocolo PRISMA 2020",
          author: "Nathalia Korossy; Peter Vlachos",
          affiliation: "UNIVERSITY OF GREENWICH, UK (Inglaterra)",
        },
        {
          time: "14h30-14h45",
          title:
            "A governança como modelo de gestão para o desenvolvimento do Turismo cinematográfico no Brasil",
          author: "Priscila Fernandes Carvalho de Melo; Francisco Antônio dos Anjos",
          affiliation:
            "Universidade Federal de Pernambuco/UFPE; Universidade do Vale do Itajaí/UNIVALI (Brasil)",
        },
        {
          time: "14h45-15h",
          title:
            "Produções audiovisuais e Turismo cinematográfico no Brasil: efeitos do cenário político (2001–2021)",
          author:
            "Priscila Fernandes Carvalho de Melo; João Filadelfo de Carvalho Neto; Francisco Antônio dos Anjos",
          affiliation:
            "Universidade Federal de Pernambuco/UFPE; Universidade Federal da Paraíba; Universidade do Vale do Itajaí/UNIVALI (Brasil)",
        },
        {
          time: "15h-15h15",
          title:
            "Governança multinível e planejamento estratégico no turismo audiovisual brasileiro: o Projeto EMBRATUR/ANPTUR como Arquitetura Colaborativa de Soft Power",
          author:
            "André Riani Costa Perinotto; Christianne Luce Gomes; Nathália Korossy Leite; Leylane Meneses Martins; João Lucas de Almeida Campos; Alisson Mateus Marques Cavalcanti da Silva",
          affiliation: "UFDPar/UFPR, UFMG, UFPE, UFRN, UFMG, UFPE (Brasil)",
        },
      ],
    },
    {
      title: "9. Preservação do patrimônio literário e cultural e da autenticidade",
      date: "26 de março de 2026",
      time: "13h30 às 15h",
      rows: [
        {
          time: "13h30-13h45",
          title:
            "Partilhando o pão que o diabo amassou: experiência memorial e de turismo literário no Campo de Concentração do Tarrafal",
          author: "Adriana Coelho Florent",
          affiliation: "Institut des Mondes Africains - Aix-Marseille université (França)",
        },
        {
          time: "13h45-14h",
          title:
            "Eventos Literários no destino Turístico Termal: o caso da Biblioteca Josino Bretas em Caldas Novas (GO/Brasil)",
          author: "Jean Carlos Vieira Santos; Jackson Santana da Silva; Jairo Alves Leite",
          affiliation: "Universidade Estadual de Goiás - UEG (Brasil)",
        },
        {
          time: "14h-14h15",
          title:
            "Turismo literário no Rio Quente Resorts, Goiás, Brasil – Poesia e experiências gastronômicas",
          author: "Luana Crystina Borges Sales; Milena D'Ayala Valva",
          affiliation: "Universidade Estadual de Goiás – UEG (Brasil)",
        },
        {
          time: "14h15-14h30",
          title:
            "Preservação do patrimônio literário e cultural em Petrópolis/RJ: um relato biográfico visitável no Museu-Casa Stefan Zweig",
          author: "Anderson Simões da Costa",
          affiliation: "Universidade Federal de Juiz de Fora - UFJF (Brasil)",
        },
        {
          time: "14h30-14h45",
          title:
            "El bueno, el feo y el malo: un caso único de turismo de nostalgia en Burgos (España)",
          author: "Beatriz Gómez-Morales",
          affiliation: "Universitat de Lleida (Espanha)",
        },
      ],
    },
    {
      title: "12. Interfaces turístico-pedagógicas",
      date: "27 de março de 2026",
      time: "13h30-15h",
      rows: [
        {
          time: "13h30-13h45",
          title:
            "Interfaces Turístico-pedagógicas: a construção da proposta dos piqueniques literários em Jaguarão/RS",
          author: "Ariane Ferreira Clavijo; Jerusa Vieira Urrutia; Francielle de Lima",
          affiliation: "Universidade Federal do Pampa – Unipampa (Brasil)",
        },
        {
          time: "13h45-14h",
          title:
            "Turismo e cinema: experiências da sala de aula como sessão de filmes, diálogos e estratégias pedagógicas",
          author: "Elizabete Sayuri Kushano; Marcos Luiz Filippim",
          affiliation: "Universidade Federal do Paraná - UFPR (Brasil)",
        },
        {
          time: "14h-14h15",
          title:
            'Da obra literária "Caxias do Sul: história e cultura nos Distritos" aos roteiros: a organização intencional de aprendizagens via turismo',
          author: "Francielle de Lima; Marivania Lucia Sartoretto",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
        {
          time: "14h15-14h30",
          title: "Intocable: Una oportunidad para el estudio del turismo accesible",
          author: "Ana Belén Leal Solís; M. Teresa Rubio Cabezas; Rafael Robina Ramírez Robina",
          affiliation: "Universidad de Extremadura - CÁCERES (Espanha)",
        },
        {
          time: "14h30-15h",
          title:
            'O turismo literário e a perspectiva do "pedestre" em Michel de Certeau e do "homem lento" em Milton Santos',
          author: "Juliano Pessanha Gonçalves",
          affiliation: "Centro Federal de Educação Tecnológica - CEFET/RJ (Brasil)",
        },
      ],
    },
    {
      title: "13. Representação cinematográfica/literária das comunidades locais",
      date: "27 de março de 2026",
      time: "9h-10h30 e 13h30-15h",
      rows: [
        {
          time: "9h-9h15",
          title:
            'O sagrado no livro "A cabeça do santo", de Socorro Acioli, segundo perspectivas de literatura e de cultura',
          author: "Caroline Foss Lovison",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
        {
          time: "9h15-9h30",
          title:
            "Entre fronteiras e telas: representações do refúgio e conflitos de alteridade na interface entre cinema e turismo cinematográfico",
          author: "Viviane Rocha",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
        {
          time: "9h30-9h45",
          title: "Patrimônio habitado: o espetáculo Som e Luz como narrativa performativa",
          author: "Rafaely da Silva Reggiori; Daniel Oliveira",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
        {
          time: "9h45-10h",
          title:
            "No pulsar da batucada: as toadas dos bumbás no Festival Folclórico de Parintins como pontes narrativas e literárias na Amazônia",
          author: "Anny Gabrielly Peixoto de Oliveira",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
        {
          time: "10h-10h15",
          title:
            "Sabores em cena: a alimentação como porta de entrada para o turismo cinematográfico",
          author: "Bruna Perini Novaes",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
        { time: "—", title: "INTERVALO", author: "—", affiliation: "—" },
        {
          time: "13h30-13h45",
          title: "Monsanto e Diamantina como destinos turísticos nos anos 1930-40",
          author: "Luís Antônio Contatori Romano",
          affiliation: "Universidade Federal do Sul e Sudeste do Pará – Unifesspa (Brasil)",
        },
        {
          time: "13h45-14h",
          title:
            "Entre acolhimento e recusa: hospitalidade, desejo e as comunidades locais no cinema brasileiro",
          author: "Rodrigo Cabral Oliveira; Sênia Regina Bastos",
          affiliation: "Universidade Anhembi Morumbi (Brasil)",
        },
        {
          time: "14h-14h15",
          title:
            "Imágenes que movilizan: cine de animación, comunidades locales y peregrinajes mediáticos",
          author: "Ilia Alvarado-Sizzo",
          affiliation: "Instituto de Geografía - Universidad Nacional Autónoma de México (México)",
        },
        {
          time: "14h15-14h30",
          title:
            "Topografias da solidão: a representação da cidade de Santa Vitória do Palmar narrada por Guilherme Azambuja Castro",
          author: "Cleusa Janete Silva Garcia; Tiago Lopes da Silva; Marlise Buchweitz",
          affiliation: "FURG, FURG, UFPel/FURG (Brasil)",
        },
        {
          time: "14h30-14h45",
          title:
            "Saneamento Básico como roteiro temático no cinema: uma reflexão para os destinos turísticos",
          author: "Suzana Maria De Conto; Helena Wartha Bolzon",
          affiliation: "Universidade de Caxias do Sul – UCS (Brasil)",
        },
      ],
    },
  ];

  return (
    <div className="mt-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
        Programação Provisória
      </h2>
      <div className="space-y-4">
        {sessions.map((session, index) => (
          <SessionBlock key={index} {...session} />
        ))}
      </div>
    </div>
  );
}
