import fs from "fs";
import path from "path";
import puppeteer, { executablePath } from "puppeteer";
import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, ImageRun } from "docx";
import type { PanelSubmission } from "../schemas/submission.js";

export interface PanelSubmissionData extends PanelSubmission {
  id?: string;
  createdAt?: string;
}

export class PanelDocumentGenerator {
  private async getHeroImagePath(): Promise<string | null> {
    try {
      // Tentar diferentes caminhos possíveis para a imagem
      const possiblePaths = [
        path.join(process.cwd(), "apps", "web", "public", "hero.png"),
        path.join(process.cwd(), "..", "web", "public", "hero.png"),
        path.join(process.cwd(), "web", "public", "hero.png"),
      ];

      let heroImagePath = null;
      for (const imagePath of possiblePaths) {
        if (fs.existsSync(imagePath)) {
          heroImagePath = imagePath;
          break;
        }
      }

      if (!heroImagePath) {
        throw new Error("Imagem hero.png não encontrada em nenhum dos caminhos possíveis");
      }

      console.log("🎨 Banner oficial encontrado para painel:", heroImagePath);
      return heroImagePath;
    } catch (error) {
      console.warn("⚠️  Não foi possível encontrar o banner oficial para painel.");
      console.error("❌ Erro:", error);
      return null;
    }
  }

  private async loadHeroImageAsBase64(): Promise<string> {
    try {
      const heroImagePath = await this.getHeroImagePath();
      if (!heroImagePath) {
        throw new Error("Banner não encontrado");
      }

      console.log("🎨 Carregando banner oficial do evento para painel:", heroImagePath);
      const imageBuffer = await fs.readFileSync(heroImagePath);
      const base64Image = imageBuffer.toString("base64");
      console.log("✅ Banner oficial do evento carregado com sucesso para painel!");
      return `data:image/png;base64,${base64Image}`;
    } catch (error) {
      console.warn("⚠️  Não foi possível carregar o banner oficial para painel. Usando fallback.");
      console.error("❌ Erro:", error);
      // Fallback para um gradiente limpo sem texto
      return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIyMDAiIHZpZXdCb3g9IjAgMCA4MDAgMjAwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlYjczNDU7c3RvcC1vcGFjaXR5OjEiIC8+CjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I2Y0YzQ5MDtzdG9wLW9wYWNpdHk6MSIgLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIyMDAiIGZpbGw9InVybCgjZ3JhZGllbnQpIi8+Cjwvc3ZnPgo=";
    }
  }

  private generateHTML(data: PanelSubmissionData, includeAuthorship: boolean = false): string {
    const heroImageBase64 = ""; // Will be loaded separately

    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proposta de Painel - ${data.panelTitle}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9f9f9;
            padding: 20px;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-image: url('${heroImageBase64}');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            color: white;
            padding: 30px;
            text-align: center;
            margin-bottom: 40px;
            border-radius: 12px;
            min-height: 250px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }


        .content {
            background: white;
        }

        .document-title {
            font-size: 20px;
            font-weight: bold;
            color: #e0a085;
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 10px;
            border-bottom: 2px solid #e0a085;
        }

        .section {
            margin-bottom: 25px;
        }

        .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
            padding: 8px 0;
            border-bottom: 1px solid #ddd;
        }

        .section-content {
            font-size: 14px;
            line-height: 1.6;
            text-align: justify;
            margin-bottom: 15px;
        }

        .panel-info {
            background-color: #f8f9fa;
            padding: 15px;
            border-left: 4px solid #e0a085;
            margin-bottom: 20px;
            border-radius: 4px;
        }

        .communication-item {
            background-color: #f8f9fa;
            border: 1px solid #e0a085;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            page-break-inside: avoid; /* Evitar quebra de página dentro de cada comunicação */
            break-inside: avoid; /* Suporte moderno para evitar quebra */
        }

        .communication-number {
            font-size: 16px;
            font-weight: bold;
            color: #e0a085;
            margin-bottom: 10px;
        }

        .authorship-info {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 4px;
            padding: 10px;
            margin-top: 20px;
            font-size: 12px;
            color: #856404;
        }

        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 12px;
            color: #666;
            text-align: center;
        }

        @media print {
            body {
                background: white;
                padding: 0;
            }
            .container {
                box-shadow: none;
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
        </div>

        <div class="content">
            <h1 class="document-title">PROPOSTA DE PAINEL</h1>

            <div class="panel-info">
                <div class="section-title">Informações do Painel</div>
                <div class="section-content">
                    <strong>Título:</strong> ${data.panelTitle}<br>
                    <strong>Linha Temática:</strong> ${data.track}<br>
                    <strong>Idioma:</strong> ${data.language.toUpperCase()}<br>
                    <strong>Coordenador:</strong> ${data.coordinatorName}<br>
                    <strong>E-mail:</strong> ${data.coordinatorEmail}
                </div>
            </div>

            <div class="section">
                <div class="section-title">Resumo do Painel:</div>
                <div class="section-content">${data.panelAbstract}</div>
            </div>

            <div class="section">
                <div class="section-title">Palavras-chave do Painel:</div>
                <div class="section-content"><strong>Palavras-chave:</strong> ${data.panelKeywords}</div>
            </div>

            <div class="section">
                <div class="section-title">Referências Bibliográficas:</div>
                <div class="section-content">${data.references}</div>
            </div>

            <div class="section">
                <div class="section-title">Comunicações do Painel:</div>
                
                ${data.summaries
                  .map(
                    (summary, index) => `
                    <div class="communication-item">
                        <div class="communication-number">Comunicação ${index + 1}</div>
                        
                        <div class="section">
                            <div class="section-title">Título:</div>
                            <div class="section-content">${summary.title}</div>
                        </div>

                        ${
                          includeAuthorship
                            ? `
                            <div class="section">
                                <div class="section-title">Autores:</div>
                                <div class="section-content">${summary.authors}</div>
                            </div>

                            <div class="section">
                                <div class="section-title">Afiliação:</div>
                                <div class="section-content">${summary.affiliation}</div>
                            </div>

                            <div class="section">
                                <div class="section-title">Titulação:</div>
                                <div class="section-content">${summary.degree}</div>
                            </div>
                        `
                            : ""
                        }

                        <div class="section">
                            <div class="section-title">Resumo:</div>
                            <div class="section-content">${summary.abstract}</div>
                        </div>

                        <div class="section">
                            <div class="section-title">Palavras-chave:</div>
                            <div class="section-content"><strong>Palavras-chave:</strong> ${summary.keywords}</div>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>

            ${
              includeAuthorship
                ? `
                <div class="authorship-info">
                    <strong>Documento com autoria:</strong> Este documento contém informações completas dos autores e suas afiliações.
                </div>
            `
                : `
                <div class="authorship-info">
                    <strong>Documento sem autoria:</strong> Este documento foi preparado para avaliação anônima pelos pares.
                </div>
            `
            }

            <div class="footer">
                <p>Documento gerado automaticamente em ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")}</p>
                <p>III Conferência Internacional de Turismo Literário e Cinematográfico - UCS</p>
            </div>
        </div>
    </div>
</body>
</html>
    `;
  }

  async generatePanelPDF(data: PanelSubmissionData, outputPath: string): Promise<void> {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--disable-web-security",
        "--disable-features=VizDisplayCompositor",
        "--single-process",
        "--no-zygote",
        "--disable-background-timer-throttling",
        "--disable-backgrounding-occluded-windows",
        "--disable-renderer-backgrounding",
        "--disable-extensions",
        "--disable-plugins",
        "--disable-javascript",
        "--disable-default-apps",
        "--disable-sync",
        "--disable-translate",
        "--hide-scrollbars",
        "--mute-audio",
        "--no-first-run",
        "--disable-ipc-flooding-protection",
      ],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || executablePath(),
      timeout: 30000,
    });

    try {
      const page = await browser.newPage();
      const html = this.generateHTML(data, false); // PDF sem autoria

      await page.setContent(html, { waitUntil: "networkidle0" });

      // Carregar imagem hero após definir o conteúdo
      const heroImageBase64 = await this.loadHeroImageAsBase64();
      if (heroImageBase64) {
        await page.evaluate((imageData) => {
          // @ts-expect-error - DOM is available in Puppeteer context
          const header = document.querySelector(".header");
          if (header) {
            header.style.backgroundImage = `url('${imageData}')`;
          }
        }, heroImageBase64);
      }

      // Aguardar um pouco para garantir que tudo seja renderizado
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await page.pdf({
        path: outputPath,
        format: "A4",
        printBackground: true,
        margin: {
          top: "20mm",
          right: "15mm",
          bottom: "20mm",
          left: "15mm",
        },
      });

      console.log(`PDF do painel gerado com sucesso: ${outputPath}`);
    } finally {
      await browser.close();
    }
  }

  async generatePanelWordDocx(data: PanelSubmissionData, outputPath: string): Promise<void> {
    // Criar documento Word usando a biblioteca docx
    const children: Paragraph[] = [];

    // Banner visual igual ao PDF
    try {
      const heroImagePath = await this.getHeroImagePath();
      if (heroImagePath) {
        console.log("🎨 Adicionando banner visual ao documento Word do painel:", heroImagePath);
        const imageBuffer = await fs.promises.readFile(heroImagePath);

        // Adicionar imagem do banner
        children.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200, before: 0 },
            children: [
              new ImageRun({
                data: imageBuffer,
                transformation: {
                  width: 600,
                  height: 200,
                },
                type: "png",
              }),
            ],
          })
        );
      }
    } catch (error) {
      console.warn(
        "⚠️ Não foi possível adicionar banner ao Word do painel. Usando texto alternativo."
      );
      console.error("❌ Erro:", error);
    }

    // Texto da conferência removido - informações já estão no banner visual

    // Título do Painel
    children.push(
      new Paragraph({
        text: "PROPOSTA DE PAINEL",
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
      }),

      // Informações do Painel
      new Paragraph({
        text: "Informações do Painel",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 200 },
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "Título: ", bold: true }),
          new TextRun({ text: data.panelTitle }),
        ],
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "Linha Temática: ", bold: true }),
          new TextRun({ text: data.track }),
        ],
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "Idioma: ", bold: true }),
          new TextRun({ text: data.language.toUpperCase() }),
        ],
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "Coordenador: ", bold: true }),
          new TextRun({ text: data.coordinatorName }),
        ],
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [
          new TextRun({ text: "E-mail: ", bold: true }),
          new TextRun({ text: data.coordinatorEmail }),
        ],
      }),

      // Resumo do Painel
      new Paragraph({
        text: "Resumo do Painel:",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      }),
      new Paragraph({
        text: data.panelAbstract,
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 100 },
      }),

      // Palavras-chave do Painel
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({ text: "Palavras-chave: ", bold: true }),
          new TextRun({ text: data.panelKeywords }),
        ],
      }),

      // Referências
      new Paragraph({
        text: "Referências Bibliográficas:",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      }),
      new Paragraph({
        text: data.references,
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
      }),

      // Comunicações do Painel
      new Paragraph({
        text: "Comunicações do Painel:",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 200 },
      })
    );

    // Adicionar cada comunicação
    data.summaries.forEach((summary, index) => {
      children.push(
        new Paragraph({
          text: `Comunicação ${index + 1}`,
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
          spacing: { after: 100 },
          children: [
            new TextRun({ text: "Título: ", bold: true }),
            new TextRun({ text: summary.title }),
          ],
        })
      );

      // Autores no canto direito em itálico
      const authorLines = summary.authors.split("\n").filter((line: string) => line.trim());
      authorLines.forEach((authorLine: string) => {
        children.push(
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { after: 50 },
            children: [
              new TextRun({
                text: authorLine.trim(),
                italics: true,
                size: 20, // 10pt
                font: "Arial",
              }),
            ],
          })
        );
      });

      children.push(
        new Paragraph({
          spacing: { after: 100, before: 100 },
          children: [
            new TextRun({ text: "Afiliação: ", bold: true }),
            new TextRun({ text: summary.affiliation }),
          ],
        }),
        new Paragraph({
          spacing: { after: 100 },
          children: [
            new TextRun({ text: "Titulação: ", bold: true }),
            new TextRun({ text: summary.degree }),
          ],
        }),
        new Paragraph({
          text: "Resumo:",
          spacing: { before: 100, after: 50 },
          children: [new TextRun({ text: "Resumo: ", bold: true })],
        }),
        new Paragraph({
          text: summary.abstract,
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 100 },
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [
            new TextRun({ text: "Palavras-chave: ", bold: true }),
            new TextRun({ text: summary.keywords }),
          ],
        })
      );
    });

    // Footer
    children.push(
      new Paragraph({
        text: "",
        spacing: { before: 400 },
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: `Documento gerado automaticamente em ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")}`,
            size: 18,
            color: "666666",
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: "III Conferência Internacional de Turismo Literário e Cinematográfico - UCS",
            size: 18,
            color: "666666",
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "Documento com autoria - Versão completa",
            size: 18,
            color: "666666",
          }),
        ],
      })
    );

    const doc = new Document({
      sections: [
        {
          properties: {},
          children,
        },
      ],
    });

    // Salvar documento
    const buffer = await Packer.toBuffer(doc);
    await fs.promises.writeFile(outputPath, buffer);

    console.log(`📄 Word .docx do painel gerado com sucesso: ${outputPath}`);
  }
}

export const panelDocumentGenerator = new PanelDocumentGenerator();
