-- CreateTable
CREATE TABLE "LiveStream" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "youtubeUrl" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LiveStream_pkey" PRIMARY KEY ("id")
);

INSERT INTO "LiveStream" ("id", "title", "youtubeUrl", "sortOrder", "createdAt")
VALUES (
  'clseedopening001',
  'III Conferência de Turismo Literário e Cinematográfico: Abertura Oficial e Palestra de Abertura',
  'https://www.youtube.com/live/8WFPFbNSg0o',
  0,
  CURRENT_TIMESTAMP
);
