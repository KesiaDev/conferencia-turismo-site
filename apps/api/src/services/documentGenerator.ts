import fs from "fs";
import path from "path";

export interface SubmissionData {
  name: string;
  email: string;
  title: string;
  track: string;
  authors: string;
  abstract: string;
  objectives: string;
  methodology: string;
  results: string;
  conclusions: string;
  references: string;
  keywords: string;
  affiliation: string;
  degree: string;
  support?: string;
  language: string;
}

export class DocumentGenerator {
  private static readonly OUTPUT_DIR = path.join(process.cwd(), "apps/api/output");

  static async generateDocuments(data: SubmissionData): Promise<{
    pdfPath: string;
    wordPath: string;
  }> {
    // Criar diretórios se não existirem
    await this.ensureDirectories();

    const timestamp = Date.now();
    const baseFileName = `submission_${timestamp}`;

    // Gerar HTML para PDF (sem autoria)
    const pdfHtml = this.generatePDFTemplate(data);
    const pdfPath = path.join(this.OUTPUT_DIR, `${baseFileName}_para_PDF.html`);
    await fs.promises.writeFile(pdfPath, pdfHtml, "utf8");

    // Gerar HTML para Word (com autoria)
    const wordHtml = this.generateWordTemplate(data);
    const wordPath = path.join(this.OUTPUT_DIR, `${baseFileName}_para_Word.html`);
    await fs.promises.writeFile(wordPath, wordHtml, "utf8");

    return {
      pdfPath,
      wordPath,
    };
  }

  private static async ensureDirectories(): Promise<void> {
    if (!fs.existsSync(this.OUTPUT_DIR)) {
      await fs.promises.mkdir(this.OUTPUT_DIR, { recursive: true });
    }
  }

  private static generatePDFTemplate(data: SubmissionData): string {
    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Submissão - ${data.title}</title>
    <style>
                    @page {
                        size: A4;
                        margin: 2cm;
                    }
                    
                    @media print {
                        body {
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }
                    }
        
        body {
            font-family: Arial, sans-serif;
            font-size: 11pt;
            line-height: 1.5;
            color: #000;
            margin: 0;
            padding: 0;
        }
        
        .header {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            color: white;
            padding: 20px;
            text-align: center;
            margin-bottom: 30px;
            border-radius: 8px;
        }
        
        .header h1 {
            font-size: 16pt;
            margin: 0 0 10px 0;
            font-weight: bold;
        }
        
        .header h2 {
            font-size: 14pt;
            margin: 0 0 8px 0;
            font-weight: bold;
        }
        
        .header h3 {
            font-size: 12pt;
            margin: 0 0 5px 0;
            font-weight: bold;
        }
        
        .header p {
            font-size: 10pt;
            margin: 2px 0;
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
        
        .section {
            margin: 15px 0;
            text-align: justify;
        }
        
        .section strong {
            font-weight: bold;
        }
        
        .track {
            margin: 20px 0;
            font-size: 10pt;
            color: #666;
        }
        
        .language {
            margin: 20px 0;
            font-size: 10pt;
            color: #666;
        }
        
                    .footer {
                        margin-top: 40px;
                        font-size: 9pt;
                        color: #666;
                        text-align: center;
                    }
                    
                    .print-button {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: #007bff;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 14px;
                        z-index: 1000;
                    }
                    
                    .print-button:hover {
                        background: #0056b3;
                    }
                    
                    @media print {
                        .print-button {
                            display: none;
                        }
                    }
    </style>
</head>
            <body>
                <button class="print-button" onclick="window.print()">🖨️ Imprimir/Salvar PDF</button>
                <div class="header">
    </div>
    
    <div class="content">
        <div class="title">${data.title}</div>
        
        <div class="section">
            <strong>Resumo:</strong><br>
            ${data.abstract}
        </div>
        
        <div class="section">
            <strong>Objetivos:</strong><br>
            ${data.objectives}
        </div>
        
        <div class="section">
            <strong>Metodologia:</strong><br>
            ${data.methodology}
        </div>
        
        <div class="section">
            <strong>Resultados:</strong><br>
            ${data.results}
        </div>
        
        <div class="section">
            <strong>Conclusões:</strong><br>
            ${data.conclusions}
        </div>
        
        <div class="section">
            <strong>Referências:</strong><br>
            ${data.references}
        </div>
        
        <div class="section">
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

  private static generateWordTemplate(data: SubmissionData): string {
    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Submissão - ${data.title}</title>
    <style>
                    @page {
                        size: A4;
                        margin: 2cm;
                    }
                    
                    @media print {
                        body {
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }
                    }
        
        body {
            font-family: Arial, sans-serif;
            font-size: 11pt;
            line-height: 1.5;
            color: #000;
            margin: 0;
            padding: 0;
        }
        
        .header {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            color: white;
            padding: 20px;
            text-align: center;
            margin-bottom: 30px;
            border-radius: 8px;
        }
        
        .header h1 {
            font-size: 16pt;
            margin: 0 0 10px 0;
            font-weight: bold;
        }
        
        .header h2 {
            font-size: 14pt;
            margin: 0 0 8px 0;
            font-weight: bold;
        }
        
        .header h3 {
            font-size: 12pt;
            margin: 0 0 5px 0;
            font-weight: bold;
        }
        
        .header p {
            font-size: 10pt;
            margin: 2px 0;
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
        
        .section {
            margin: 15px 0;
            text-align: justify;
        }
        
        .section strong {
            font-weight: bold;
        }
        
        .track {
            margin: 20px 0;
            font-size: 10pt;
            color: #666;
        }
        
        .language {
            margin: 20px 0;
            font-size: 10pt;
            color: #666;
        }
        
                    .footer {
                        margin-top: 40px;
                        font-size: 9pt;
                        color: #666;
                        text-align: center;
                    }
                    
                    .print-button {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: #007bff;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 14px;
                        z-index: 1000;
                    }
                    
                    .print-button:hover {
                        background: #0056b3;
                    }
                    
                    @media print {
                        .print-button {
                            display: none;
                        }
                    }
    </style>
</head>
            <body>
                <button class="print-button" onclick="window.print()">🖨️ Imprimir/Salvar PDF</button>
                <div class="header">
    </div>
    
    <div class="content">
        <div class="title">${data.title}</div>
        
        <div class="author">
            <div class="author-info">
                ${data.authors}
            </div>
        </div>
        
        <div class="section">
            <strong>Resumo:</strong><br>
            ${data.abstract}
        </div>
        
        <div class="section">
            <strong>Objetivos:</strong><br>
            ${data.objectives}
        </div>
        
        <div class="section">
            <strong>Metodologia:</strong><br>
            ${data.methodology}
        </div>
        
        <div class="section">
            <strong>Resultados:</strong><br>
            ${data.results}
        </div>
        
        <div class="section">
            <strong>Conclusões:</strong><br>
            ${data.conclusions}
        </div>
        
        <div class="section">
            <strong>Referências:</strong><br>
            ${data.references}
        </div>
        
        <div class="section">
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
        <p>Documento gerado automaticamente - Versão com autoria</p>
    </div>
</body>
</html>`;
  }
}
