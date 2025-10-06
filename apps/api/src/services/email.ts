import nodemailer from "nodemailer";
import { PDFGenerator, SubmissionData } from "./pdfGenerator.js";
import { panelDocumentGenerator, PanelSubmissionData } from "./panelDocumentGenerator.js";

// Configuração do transporter
const createTransporter = () => {
  // Se as credenciais não estiverem configuradas, retorna null
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn(
      "⚠️  Credenciais de email não configuradas. Emails serão apenas logados no console."
    );
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Senha de App do Gmail
    },
  });
};

export const emailService = {
  // Envia email de nova submissão para a organização
  sendSubmissionNotification: async (data: SubmissionData) => {
    const transporter = createTransporter();
    console.log("🔧 DEBUG: Transporter criado:", transporter ? "✅ Sim" : "❌ Não");
    console.log("🔧 DEBUG: EMAIL_USER:", process.env.EMAIL_USER);
    console.log(
      "🔧 DEBUG: EMAIL_PASS:",
      process.env.EMAIL_PASS ? "✅ Configurado" : "❌ Não configurado"
    );
    const destinationEmail =
      process.env.CONFERENCE_EMAIL || "litfilmtourismconferenceucs@gmail.com";

    // Log no console (sempre)
    console.log("\n📬 NOVA SUBMISSÃO DE TRABALHO:");
    console.log("Para:", destinationEmail);
    console.log("---");
    console.log(`Nome: ${data.name}`);
    console.log(`Email: ${data.email}`);
    console.log(`Título: ${data.title}`);
    console.log(`Linha Temática: ${data.track}`);
    console.log(
      `Idioma: ${data.language === "pt" ? "Português" : data.language === "en" ? "English" : "Español"}`
    );
    console.log(`Resumo: ${data.abstract.substring(0, 100)}...`);
    console.log(`Data: ${new Date().toLocaleString("pt-BR")}`);
    console.log("---\n");

    // Gerar documentos
    try {
      const pdfPath = await PDFGenerator.generatePDF(data);
      const wordPath = await PDFGenerator.generateWord(data);
      console.log("📄 Documentos gerados:", pdfPath, wordPath);

      // Se transporter estiver configurado, envia email real
      if (transporter) {
        try {
          // Email para a organização
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: destinationEmail,
            replyTo: data.email,
            subject: `[LITFILM 2026] Nova Submissão: ${data.title}`,
            html: `
              <h2>Nova Submissão de Trabalho</h2>
              <p><strong>Nome:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Título:</strong> ${data.title}</p>
              <p><strong>Linha Temática:</strong> ${data.track}</p>
              <p><strong>Idioma:</strong> ${data.language === "pt" ? "Português" : data.language === "en" ? "English" : "Español"}</p>
              <p><strong>Palavras-chave:</strong> ${data.keywords}</p>
              <p><strong>Afiliação:</strong> ${data.affiliation}</p>
              <p><strong>Titulação:</strong> ${data.degree}</p>
              ${data.support ? `<p><strong>Apoio:</strong> ${data.support}</p>` : ""}
              <p><strong>Resumo:</strong></p>
              <p>${data.abstract}</p>
              <p><strong>Referências:</strong></p>
              <p>${data.references}</p>
              <hr>
              <p><strong>Anexos:</strong></p>
              <ul>
                <li>Documento PDF (sem autoria) - arquivo .pdf</li>
                <li>Documento Word (com autoria) - arquivo .docx</li>
              </ul>
              <p><small>Data: ${new Date().toLocaleString("pt-BR")}</small></p>
            `,
            attachments: [
              {
                filename: `submissao_${data.name.replace(/\s+/g, "_")}_sem_autoria.pdf`,
                path: pdfPath,
                contentType: "application/pdf",
              },
              {
                filename: `submissao_${data.name.replace(/\s+/g, "_")}_com_autoria.docx`,
                path: wordPath,
                contentType:
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              },
            ],
          });
          console.log("✅ Email enviado com sucesso para a organização:", destinationEmail);

          // Email de confirmação para o candidato
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: data.email,
            subject: `[LITFILM 2026] Confirmação de Submissão: ${data.title}`,
            html: `
              <h2>Confirmação de Submissão Recebida</h2>
              <p>Prezado(a) <strong>${data.name}</strong>,</p>
              
              <p>Sua submissão foi recebida com sucesso pela organização da III Conferência Internacional sobre Turismo Literário e Cinematográfico.</p>
              
              <h3>Detalhes da Submissão:</h3>
              <ul>
                <li><strong>Título:</strong> ${data.title}</li>
                <li><strong>Linha Temática:</strong> ${data.track}</li>
                <li><strong>Idioma:</strong> ${data.language === "pt" ? "Português" : data.language === "en" ? "English" : "Español"}</li>
                <li><strong>Data de Envio:</strong> ${new Date().toLocaleString("pt-BR")}</li>
              </ul>
              
                          <h3>Documentos Gerados:</h3>
                          <p>Em anexo, você encontrará os documentos formatados conforme as diretrizes da conferência:</p>
                          <ul>
                            <li><strong>Documento PDF sem autoria</strong> - Para avaliação anônima (arquivo .pdf)</li>
                            <li><strong>Documento Word com autoria</strong> - Com suas informações completas (arquivo .docx)</li>
                          </ul>
              
              <h3>Próximos Passos:</h3>
              <p>A organização entrará em contato em breve com informações sobre o processo de avaliação e próximas etapas.</p>
              
              <p>Obrigado por sua participação!</p>
              
              <hr>
              <p><small>
                <strong>III Conferência Internacional sobre Turismo Literário e Cinematográfico</strong><br>
                Economia Criativa, Inovação e Desenvolvimento Territorial<br>
                26 a 28 de março de 2026 - Universidade de Caxias do Sul - UCS<br>
                Serra Gaúcha - Brasil
              </small></p>
            `,
            attachments: [
              {
                filename: `submissao_${data.name.replace(/\s+/g, "_")}_sem_autoria.pdf`,
                path: pdfPath,
                contentType: "application/pdf",
              },
              {
                filename: `submissao_${data.name.replace(/\s+/g, "_")}_com_autoria.docx`,
                path: wordPath,
                contentType:
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              },
            ],
          });
          console.log("✅ Email de confirmação enviado para o candidato:", data.email);
        } catch (error) {
          console.error("❌ Erro ao enviar email:", error);
        }
      }
    } catch (error) {
      console.error("❌ Erro ao gerar documentos:", error);
    }
  },

  // Envia email de contato para a organização
  sendContactNotification: async (data: { name: string; email: string; message: string }) => {
    const transporter = createTransporter();
    const destinationEmail =
      process.env.CONFERENCE_EMAIL || "litfilmtourismconferenceucs@gmail.com";

    // Log no console (sempre)
    console.log("\n📧 NOVA MENSAGEM DE CONTATO:");
    console.log("Para:", destinationEmail);
    console.log("---");
    console.log(`Nome: ${data.name}`);
    console.log(`Email: ${data.email}`);
    console.log(`Mensagem: ${data.message}`);
    console.log(`Data: ${new Date().toLocaleString("pt-BR")}`);
    console.log("---\n");

    // Se transporter estiver configurado, envia email real
    if (transporter) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: destinationEmail,
          replyTo: data.email,
          subject: `[LITFILM 2026] Contato: ${data.name}`,
          html: `
            <h2>Nova Mensagem de Contato</h2>
            <p><strong>Nome:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Mensagem:</strong></p>
            <p>${data.message}</p>
            <hr>
            <p><small>Data: ${new Date().toLocaleString("pt-BR")}</small></p>
          `,
        });
        console.log("✅ Email enviado com sucesso para:", destinationEmail);
      } catch (error) {
        console.error("❌ Erro ao enviar email:", error);
      }
    }
  },

  // Envia email de nova proposta de painel para a organização
  sendPanelSubmissionNotification: async (data: PanelSubmissionData) => {
    const transporter = createTransporter();
    const destinationEmail =
      process.env.CONFERENCE_EMAIL || "litfilmtourismconferenceucs@gmail.com";

    // Log no console (sempre)
    console.log("\n📬 NOVA PROPOSTA DE PAINEL:");
    console.log("Para:", destinationEmail);
    console.log("---");
    console.log(`Coordenador: ${data.coordinatorName}`);
    console.log(`Email: ${data.coordinatorEmail}`);
    console.log(`Título do Painel: ${data.panelTitle}`);
    console.log(`Linha Temática: ${data.track}`);
    console.log(
      `Idioma: ${data.language === "pt" ? "Português" : data.language === "en" ? "English" : "Español"}`
    );
    console.log(`Número de Comunicações: ${data.summaries.length}`);
    console.log(`Data: ${new Date().toLocaleString("pt-BR")}`);
    console.log("---\n");

    // Gerar documentos
    try {
      const timestamp = Date.now();
      const coordinatorName = data.coordinatorName.replace(/\s+/g, "_");

      const pdfPath = `output/panel_${timestamp}_sem_autoria.pdf`;
      const wordPath = `output/panel_${timestamp}_com_autoria.docx`;

      await panelDocumentGenerator.generatePanelPDF(data, pdfPath);
      await panelDocumentGenerator.generatePanelWordDocx(data, wordPath);

      console.log("📄 Documentos do painel gerados:", pdfPath, wordPath);

      // Se transporter estiver configurado, envia email real
      if (transporter) {
        try {
          // Email para a organização
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: destinationEmail,
            replyTo: data.coordinatorEmail,
            subject: `[LITFILM 2026] Nova Proposta de Painel: ${data.panelTitle}`,
            html: `
              <h2>Nova Proposta de Painel</h2>
              <p><strong>Coordenador:</strong> ${data.coordinatorName}</p>
              <p><strong>Email:</strong> ${data.coordinatorEmail}</p>
              <p><strong>Título do Painel:</strong> ${data.panelTitle}</p>
              <p><strong>Linha Temática:</strong> ${data.track}</p>
              <p><strong>Idioma:</strong> ${data.language === "pt" ? "Português" : data.language === "en" ? "English" : "Español"}</p>
              <p><strong>Número de Comunicações:</strong> ${data.summaries.length}</p>
              <p><strong>Resumo do Painel:</strong></p>
              <p>${data.panelAbstract}</p>
              <p><strong>Referências:</strong></p>
              <p>${data.references}</p>
              <hr>
              <p><strong>Comunicações do Painel:</strong></p>
              <ul>
                ${data.summaries
                  .map(
                    (summary, index) => `
                  <li>
                    <strong>Comunicação ${index + 1}:</strong> ${summary.title}<br>
                    <strong>Autores:</strong> ${summary.authors}<br>
                    <strong>Resumo:</strong> ${summary.abstract.substring(0, 100)}...
                  </li>
                `
                  )
                  .join("")}
              </ul>
              <hr>
              <p><strong>Anexos:</strong></p>
              <ul>
                <li>Documento PDF do painel (sem autoria) - arquivo .pdf</li>
                <li>Documento Word do painel (com autoria) - arquivo .docx</li>
              </ul>
              <p><small>Data: ${new Date().toLocaleString("pt-BR")}</small></p>
            `,
            attachments: [
              {
                filename: `proposta_painel_${coordinatorName}_sem_autoria.pdf`,
                path: pdfPath,
                contentType: "application/pdf",
              },
              {
                filename: `proposta_painel_${coordinatorName}_com_autoria.docx`,
                path: wordPath,
                contentType:
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              },
            ],
          });
          console.log("✅ Email enviado com sucesso para a organização:", destinationEmail);

          // Email de confirmação para o coordenador
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: data.coordinatorEmail,
            subject: `[LITFILM 2026] Confirmação de Proposta de Painel: ${data.panelTitle}`,
            html: `
              <h2>Confirmação de Proposta de Painel Recebida</h2>
              <p>Prezado(a) <strong>${data.coordinatorName}</strong>,</p>
              
              <p>Sua proposta de painel foi recebida com sucesso pela organização da III Conferência Internacional sobre Turismo Literário e Cinematográfico.</p>
              
              <h3>Detalhes da Proposta de Painel:</h3>
              <ul>
                <li><strong>Título:</strong> ${data.panelTitle}</li>
                <li><strong>Linha Temática:</strong> ${data.track}</li>
                <li><strong>Idioma:</strong> ${data.language === "pt" ? "Português" : data.language === "en" ? "English" : "Español"}</li>
                <li><strong>Número de Comunicações:</strong> ${data.summaries.length}</li>
                <li><strong>Data de Envio:</strong> ${new Date().toLocaleString("pt-BR")}</li>
              </ul>
              
              <h3>Documentos Gerados:</h3>
              <p>Em anexo, você encontrará os documentos formatados conforme as diretrizes da conferência:</p>
              <ul>
                <li><strong>Documento PDF sem autoria</strong> - Para avaliação anônima (arquivo .pdf)</li>
                <li><strong>Documento Word com autoria</strong> - Com suas informações completas (arquivo .docx)</li>
              </ul>
              
              <h3>Próximos Passos:</h3>
              <p>A organização entrará em contato em breve com informações sobre o processo de avaliação e próximas etapas.</p>
              
              <p><strong>Lembrete:</strong> Cada membro do painel deve fazer sua própria inscrição individual no evento.</p>
              
              <p>Obrigado por sua participação!</p>
              
              <hr>
              <p><small>
                <strong>III Conferência Internacional sobre Turismo Literário e Cinematográfico</strong><br>
                Economia Criativa, Inovação e Desenvolvimento Territorial<br>
                26 a 28 de março de 2026 - Universidade de Caxias do Sul - UCS<br>
                Serra Gaúcha - Brasil
              </small></p>
            `,
            attachments: [
              {
                filename: `proposta_painel_${coordinatorName}_sem_autoria.pdf`,
                path: pdfPath,
                contentType: "application/pdf",
              },
              {
                filename: `proposta_painel_${coordinatorName}_com_autoria.docx`,
                path: wordPath,
                contentType:
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              },
            ],
          });
          console.log("✅ Email de confirmação enviado para o coordenador:", data.coordinatorEmail);
        } catch (error) {
          console.error("❌ Erro ao enviar email:", error);
        }
      }
    } catch (error) {
      console.error("❌ Erro ao gerar documentos do painel:", error);
    }
  },
};
