import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const mesaRedonda = await prisma.liveStream.findFirst({
    where: {
      youtubeUrl: { contains: "c0w6GbJvP1o" },
    },
  });

  if (!mesaRedonda) {
    const maxSort = await prisma.liveStream.aggregate({ _max: { sortOrder: true } });
    const nextOrder = (maxSort._max.sortOrder ?? -1) + 1;

    await prisma.liveStream.create({
      data: {
        title:
          "Mesa-Redonda Internacional - Turismo Literário, Turismo Cinematográfico e Inovação Territorial",
        youtubeUrl: "https://www.youtube.com/live/c0w6GbJvP1o",
        sortOrder: nextOrder,
      },
    });
    console.log("Vídeo Mesa-Redonda Internacional adicionado com sucesso!");
  } else {
    console.log("Vídeo Mesa-Redonda Internacional já existe no banco.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
