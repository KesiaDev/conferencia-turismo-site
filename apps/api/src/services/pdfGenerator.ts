import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, ImageRun } from "docx";

export interface SubmissionData {
  name: string;
  email: string;
  title: string;
  track: string;
  authors: string;
  abstract: string;
  references: string;
  keywords: string;
  affiliation: string;
  degree: string;
  support?: string;
  language: string;
}

export class PDFGenerator {
  private static readonly OUTPUT_DIR = path.join(process.cwd(), "apps/api/output");

  static async generatePDF(data: SubmissionData): Promise<string> {
    await this.ensureDirectories();

    const timestamp = Date.now();
    const fileName = `submission_${timestamp}_sem_autoria.pdf`;
    const pdfPath = path.join(this.OUTPUT_DIR, fileName);

    try {
      const html = await this.generateHTML(data);

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
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
        timeout: 60000,
      });

      try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1200, height: 800 });
        await page.setContent(html, {
          waitUntil: "networkidle0",
          timeout: 60000,
        });
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const pdfBuffer = await page.pdf({
          format: "A4",
          margin: {
            top: "2cm",
            right: "2cm",
            bottom: "2cm",
            left: "2cm",
          },
          printBackground: true,
          displayHeaderFooter: false,
          preferCSSPageSize: true,
        });
        fs.writeFileSync(pdfPath, pdfBuffer);
        console.log(`📄 PDF REAL gerado: ${pdfPath}`);
        return pdfPath;
      } finally {
        await browser.close();
      }
    } catch (error) {
      console.error("❌ Erro ao gerar PDF:", error);
      const htmlFileName = `submission_${timestamp}_sem_autoria.html`;
      const htmlPath = path.join(this.OUTPUT_DIR, htmlFileName);
      const html = await this.generateHTML(data);
      fs.writeFileSync(htmlPath, html);
      console.log(`📄 HTML gerado como fallback: ${htmlPath}`);
      return htmlPath;
    }
  }

  static async generateWord(data: SubmissionData): Promise<string> {
    await this.ensureDirectories();

    const timestamp = Date.now();
    const fileName = `submission_${timestamp}_com_autoria.docx`;
    const docxPath = path.join(this.OUTPUT_DIR, fileName);

    const children: Paragraph[] = [];

    // Banner visual igual ao PDF
    try {
      const heroImagePath = await this.getHeroImagePath();
      if (heroImagePath) {
        console.log("🎨 Adicionando banner visual ao documento Word:", heroImagePath);
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
      console.warn("⚠️ Não foi possível adicionar banner ao Word. Usando texto alternativo.");
      console.error("❌ Erro:", error);
    }

    // Texto da conferência removido - informações já estão no banner visual

    // Título
    children.push(
      new Paragraph({
        text: data.title,
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 200, before: 200 },
      })
    );

    // Autores (no canto direito, em itálico, formatação menor)
    const authorLines = data.authors.split("\n").filter((line) => line.trim());
    authorLines.forEach((authorLine) => {
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

    // Espaço após autores
    children.push(
      new Paragraph({
        text: "",
        spacing: { after: 300 },
      })
    );

    // Resumo
    children.push(
      new Paragraph({
        text: "Resumo:",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      }),
      new Paragraph({
        text: data.abstract,
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
      }),
      // Referências
      new Paragraph({
        text: "Referências:",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 100 },
      }),
      new Paragraph({
        text: data.references,
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
      }),
      // Palavras-chave
      new Paragraph({
        spacing: { before: 200, after: 100 },
        children: [
          new TextRun({
            text: "Palavras-chave: ",
            bold: true,
          }),
          new TextRun({
            text: data.keywords,
          }),
        ],
      }),
      // Linha Temática
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "Linha Temática: ",
            bold: true,
          }),
          new TextRun({
            text: data.track,
          }),
        ],
      }),
      // Idioma
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "Idioma: ",
            bold: true,
          }),
          new TextRun({
            text:
              data.language === "pt" ? "Português" : data.language === "en" ? "English" : "Español",
          }),
        ],
      }),
      // Afiliações
      new Paragraph({
        text: "Afiliações:",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 100 },
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: `Afiliação: ${data.affiliation}`,
            size: 18,
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: `Titulação: ${data.degree}`,
            size: 18,
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: `E-mail: ${data.email}`,
            size: 18,
          }),
        ],
      })
    );

    // Apoio (se existir)
    if (data.support) {
      children.push(
        new Paragraph({
          spacing: { after: 100 },
          children: [
            new TextRun({
              text: `Apoio: ${data.support}`,
              size: 18,
            }),
          ],
        })
      );
    }

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
            text: `Submissão recebida em: ${new Date().toLocaleDateString("pt-BR")}`,
            size: 18,
            color: "666666",
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: "Documento gerado automaticamente - Versão com autoria",
            size: 18,
            color: "666666",
          }),
        ],
      })
    );

    // Criar documento
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
    await fs.promises.writeFile(docxPath, buffer);

    console.log(`📄 Word .docx gerado: ${docxPath}`);
    return docxPath;
  }

  private static async ensureDirectories(): Promise<void> {
    if (!fs.existsSync(this.OUTPUT_DIR)) {
      await fs.promises.mkdir(this.OUTPUT_DIR, { recursive: true });
    }
  }

  private static formatAuthorsWithFootnotes(data: SubmissionData): string {
    // Separar os autores (assumindo que estão separados por quebra de linha)
    const authors = data.authors.split("\n").filter((author) => author.trim());

    // Criar lista de autores com números sobrescritos
    const authorsWithFootnotes = authors
      .map((author, index) => {
        return `${author.split("–")[0].trim()}${this.getSuperscript(index + 1)}`;
      })
      .join(", ");

    return authorsWithFootnotes;
  }

  private static getSuperscript(number: number): string {
    const superscripts = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];
    return number
      .toString()
      .split("")
      .map((digit) => superscripts[parseInt(digit)])
      .join("");
  }

  private static generateAuthorFootnotes(data: SubmissionData): string {
    const authors = data.authors.split("\n").filter((author) => author.trim());

    const footnotes = authors
      .map((author, index) => {
        const authorInfo = author.split("–");
        const affiliation = authorInfo[1] ? authorInfo[1].trim() : data.affiliation;

        return `${this.getSuperscript(index + 1)} ${affiliation}. ${data.degree}. ${data.support ? data.support + ". " : ""}${data.email}`;
      })
      .join("<br>");

    return footnotes;
  }

  private static async getHeroImagePath(): Promise<string | null> {
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

      console.log("🎨 Banner oficial encontrado:", heroImagePath);
      return heroImagePath;
    } catch (error) {
      console.warn("⚠️  Não foi possível encontrar o banner oficial.");
      console.error("❌ Erro:", error);
      return null;
    }
  }

  private static async loadHeroImageAsBase64(): Promise<string> {
    try {
      const heroImagePath = await this.getHeroImagePath();
      if (!heroImagePath) {
        throw new Error("Banner não encontrado");
      }

      console.log("🎨 Carregando banner oficial do evento:", heroImagePath);
      const imageBuffer = await fs.promises.readFile(heroImagePath);
      const base64Image = imageBuffer.toString("base64");
      console.log("✅ Banner oficial do evento carregado com sucesso!");
      return `data:image/png;base64,${base64Image}`;
    } catch (error) {
      console.warn("⚠️  Não foi possível carregar o banner oficial. Usando fallback.");
      console.error("❌ Erro:", error);
      // Fallback para um gradiente limpo sem texto
      return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIyMDAiIHZpZXdCb3g9IjAgMCA4MDAgMjAwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlYjczNDU7c3RvcC1vcGFjaXR5OjEiIC8+CjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I2Y0YzQ5MDtzdG9wLW9wYWNpdHk6MSIgLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIyMDAiIGZpbGw9InVybCgjZ3JhZGllbnQpIi8+Cjwvc3ZnPgo=";
    }
  }

  private static async generateHTML(data: SubmissionData): Promise<string> {
    const heroImageBase64 = await this.loadHeroImageAsBase64();
    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Submissão - ${data.title}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 11pt;
            line-height: 1.5;
            color: #000;
            margin: 0;
            padding: 0;
        }
        
         .header {
             background-image: url('${heroImageBase64}');
             background-size: cover;
             background-position: center;
             background-repeat: no-repeat;
             color: white;
             padding: 20px;
             text-align: center;
             margin-bottom: 30px;
             border-radius: 8px;
             min-height: 200px;
             display: flex;
             flex-direction: column;
             justify-content: center;
             position: relative;
         }
         
        
        
        .content {
            text-align: justify;
        }
        
        .title {
            text-align: center;
            font-size: 12pt;
            font-weight: bold;
            margin: 30px 0 20px 0;
            text-transform: uppercase;
        }
        
        .section-title {
            font-size: 11pt;
            font-weight: bold;
            margin-top: 15px;
            margin-bottom: 5px;
        }

        .section-content {
            margin-bottom: 10px;
        }
        
        .keywords {
            margin: 20px 0;
        }
        
        .keywords strong {
            font-weight: bold;
        }
        
        .track {
            margin: 20px 0;
            font-size: 10pt;
            color: #666;
        }

        .language {
            margin: 10px 0;
            font-size: 10pt;
            color: #666;
        }
        
        .footer {
            margin-top: 40px;
            font-size: 9pt;
            color: #666;
            text-align: center;
        }
    </style>
</head>
<body>
     <div class="header">
     </div>
    
    <div class="content">
        <div class="title">${data.title}</div>
        
        <div class="section-title">Resumo:</div>
        <div class="section-content">${data.abstract}</div>

        <div class="section-title">Referências:</div>
        <div class="section-content">${data.references}</div>
        
        <div class="keywords">
            <strong>Palavras-chave:</strong> ${data.keywords}
        </div>
        
        <div class="track">
            <strong>Linha Temática:</strong> ${data.track}
        </div>
        
        <div class="language">
            <strong>Idioma:</strong> ${data.language === "pt" ? "Português" : data.language === "en" ? "English" : "Español"}
        </div>
    </div>
    
    <div class="footer">
        <p>Submissão recebida em: ${new Date().toLocaleDateString("pt-BR")}</p>
        <p>Documento gerado automaticamente - Versão sem autoria</p>
    </div>
</body>
</html>`;
  }

  private static async generateWordHTML(data: SubmissionData): Promise<string> {
    const heroImageBase64 = await this.loadHeroImageAsBase64();
    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Submissão - ${data.title}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 11pt;
            line-height: 1.5;
            color: #000;
            margin: 0;
            padding: 0;
        }
        
         .header {
             background-image: url('${heroImageBase64}');
             background-size: cover;
             background-position: center;
             background-repeat: no-repeat;
             color: white;
             padding: 20px;
             text-align: center;
             margin-bottom: 30px;
             border-radius: 8px;
             min-height: 200px;
             display: flex;
             flex-direction: column;
             justify-content: center;
             position: relative;
         }
         
        
        
        .content {
            text-align: justify;
        }
        
        .title {
            text-align: center;
            font-size: 12pt;
            font-weight: bold;
            margin: 30px 0 20px 0;
            text-transform: uppercase;
        }
        
        .author {
            text-align: right;
            margin: 20px 0;
            font-size: 11pt;
        }
        
        .author-info {
            font-size: 10pt;
            color: #666;
            margin-top: 5px;
        }

        .section-title {
            font-size: 11pt;
            font-weight: bold;
            margin-top: 15px;
            margin-bottom: 5px;
        }

        .section-content {
            margin-bottom: 10px;
        }
        
        .keywords {
            margin: 20px 0;
        }
        
        .keywords strong {
            font-weight: bold;
        }
        
        .track {
            margin: 20px 0;
            font-size: 10pt;
            color: #666;
        }

        .language {
            margin: 10px 0;
            font-size: 10pt;
            color: #666;
        }
        
        .footer {
            margin-top: 40px;
            font-size: 9pt;
            color: #666;
            text-align: center;
        }
    </style>
</head>
<body>
     <div class="header">
     </div>
    
    <div class="content">
        <div class="title">${data.title}</div>
        
        <div class="author">
            <div class="author-info">
                ${this.formatAuthorsWithFootnotes(data)}
            </div>
        </div>
        
        <div class="section-title">Resumo:</div>
        <div class="section-content">${data.abstract}</div>

        <div class="section-title">Referências:</div>
        <div class="section-content">${data.references}</div>
        
        <div class="keywords">
            <strong>Palavras-chave:</strong> ${data.keywords}
        </div>
        
        <div class="track">
            <strong>Linha Temática:</strong> ${data.track}
        </div>

        <div class="language">
            <strong>Idioma:</strong> ${data.language === "pt" ? "Português" : data.language === "en" ? "English" : "Español"}
        </div>
    </div>
    
    <div class="footer">
        <hr style="margin: 30px 0 20px 0; border: 1px solid #ccc;">
        <div class="footnotes">
            <h4 style="font-size: 10pt; margin-bottom: 10px; font-weight: bold;">Afiliações:</h4>
            <div style="font-size: 9pt; line-height: 1.4;">
                ${this.generateAuthorFootnotes(data)}
            </div>
        </div>
        <hr style="margin: 20px 0 10px 0; border: 1px solid #ccc;">
        <p>Submissão recebida em: ${new Date().toLocaleDateString("pt-BR")}</p>
        <p>Documento gerado automaticamente - Versão com autoria</p>
    </div>
</body>
</html>`;
  }
}
