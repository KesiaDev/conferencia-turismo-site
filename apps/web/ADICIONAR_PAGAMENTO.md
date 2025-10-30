# 💳 Como Adicionar Formas de Pagamento

## 📋 Guia Rápido

A estrutura de pagamento já está preparada em `apps/web/src/pages/Fees.tsx`

### Passo 1: Adicionar QR Code PIX

1. **Gere o QR Code PIX** da conta da UCS
2. Salve a imagem como: `apps/web/public/pix-qrcode.png`
3. No arquivo `apps/web/src/pages/Fees.tsx`, **descomente** as linhas do QR Code:

```tsx
// Remova os /* */ em volta deste bloco:
<div className="bg-gray-50 p-4 rounded-lg text-center">
  <img src="/pix-qrcode.png" alt="QR Code PIX" className="w-48 h-48 mx-auto mb-3" />
  <p className="text-sm text-gray-600">Escaneie o QR Code com seu app bancário</p>
</div>
```

### Passo 2: Adicionar Chave PIX

No mesmo arquivo, descomente e edite:

```tsx
<div className="bg-gray-50 p-4 rounded-lg">
  <p className="text-sm text-gray-600 mb-2">Chave PIX:</p>
  <div className="flex items-center gap-2">
    <code className="bg-white px-3 py-2 rounded border flex-1 text-sm">
      COLE_AQUI_SUA_CHAVE_PIX
    </code>
    <button className="bg-[#e0a085] text-white px-3 py-2 rounded text-sm hover:bg-[#d49070]">
      Copiar
    </button>
  </div>
</div>
```

### Passo 3: Adicionar Link de Pagamento (Sympla, Eventbrite, etc)

Descomente e edite o link:

```tsx
<a
  href="COLE_AQUI_O_LINK_DA_PLATAFORMA"
  target="_blank"
  rel="noopener noreferrer"
  className="block bg-[#e0a085] text-white text-center py-3 px-6 rounded-lg hover:bg-[#d49070] transition-colors font-semibold"
>
  Pagar via Plataforma Online
</a>
```

### Passo 4: Adicionar Dados Bancários (opcional)

Para transferência bancária, descomente e preencha:

```tsx
<div className="bg-gray-50 p-4 rounded-lg text-sm">
  <p className="font-semibold mb-2">Transferência Bancária:</p>
  <p>Banco: XXX - Nome do Banco</p>
  <p>Agência: 0000-0</p>
  <p>Conta: 00000-0</p>
  <p>CNPJ: 00.000.000/0001-00</p>
  <p className="mt-2 text-gray-600">Favorecido: Universidade de Caxias do Sul</p>
</div>
```

## 🎨 Recursos Prontos:

- ✅ Layout 2 colunas responsivo
- ✅ Cores do tema (#e0a085)
- ✅ Botão de copiar chave PIX
- ✅ Área para QR Code
- ✅ Links externos
- ✅ Instruções claras

## 📱 Responsivo:

Tudo já está preparado para funcionar em:

- Mobile (1 coluna)
- Tablet (2 colunas)
- Desktop (2 colunas)

## 🚀 Quando Receber as Informações:

1. Abra: `apps/web/src/pages/Fees.tsx`
2. Procure pelos comentários `/* ... */`
3. Remova os `/*` e `*/`
4. Preencha as informações
5. Salve o arquivo
6. Pronto! ✅

---

**Arquivo:** `apps/web/src/pages/Fees.tsx` (linhas ~43-75)


