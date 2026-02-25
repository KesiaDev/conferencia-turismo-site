# Logos de Parceiros e Patrocinadores

Adicione logos nesta pasta.

## Villa Dei Troni - Grupo WhatsApp

**QR Code:** Salve a imagem do QR code do grupo "Tour guiado Villa Dei Troni" e coloque em:

- `apps/web/public/qr-villa-dei-troni-whatsapp.png`

## Villa Dei Troni

**Arquivo:** Copie a logomarca do site [ingresso.villadeitroni.com](https://ingresso.villadeitroni.com/) ou [www.villadeitroni.com](https://www.villadeitroni.com/) e salve como:

- `villa-dei-troni.png` (ou .svg)
- Opcional: imagem do parque como `villa-dei-troni-parque.jpg`

## Hotel Oficial – Blue Tree Towers

**Arquivo:** Copie a logomarca da pasta "Materiais para Site" e renomeie como:

- `blue-tree-towers.png` (se for PNG)
- ou `blue-tree-towers.svg` (se for SVG)

O site usa o caminho: `/logos/blue-tree-towers.png`. Se tiver apenas SVG, edite `Venue.tsx` para trocar a extensão.

## Formato

- SVG (preferencial) ou PNG
- Fundo transparente
- Altura: 72px (desktop), 56px (tablet), 44px (mobile)

## Sugestões de logos

- UCS (Universidade de Caxias do Sul)
- CAPES
- CNPq
- Prefeitura de Caxias do Sul
- Embratur
- Ancine
- Instituições parceiras internacionais

## Uso no código

```tsx
<img src="/logos/ucs.svg" alt="UCS" className="h-18" />
```

## Otimização

Para SVG: use SVGO
Para PNG: use TinyPNG ou ImageOptim
