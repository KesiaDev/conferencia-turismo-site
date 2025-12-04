# 🎬 FloatingFilmBox - Componente Flutuante de Câmera de Cinema

## 📖 Visão Geral

O `FloatingFilmBox` é um componente decorativo que exibe uma ilustração SVG estilizada de uma câmera de cinema vintage em uma caixa flutuante sobre o hero banner do site.

## 🎨 Variantes de Design

### 1. **Default** (Padrão)

```tsx
<FloatingFilmBox variant="default" />
```

- Fundo semi-transparente marrom (#8B4513)
- Borda destacada
- Sombra suave

### 2. **Minimal** (Minimalista)

```tsx
<FloatingFilmBox variant="minimal" />
```

- Fundo mais claro e discreto
- Borda sutil
- Visual limpo e elegante

### 3. **Elegant** (Elegante) ⭐ Recomendado

```tsx
<FloatingFilmBox variant="elegant" />
```

- Gradiente suave
- Visual sofisticado
- Perfeito para hero banners

### 4. **Bold** (Ousado)

```tsx
<FloatingFilmBox variant="bold" />
```

- Fundo escuro e opaco
- Alto contraste
- Máxima visibilidade

## 📍 Posições Disponíveis

```tsx
// Canto superior esquerdo
<FloatingFilmBox position="top-left" />

// Canto superior direito (padrão)
<FloatingFilmBox position="top-right" />

// Canto inferior esquerdo
<FloatingFilmBox position="bottom-left" />

// Canto inferior direito
<FloatingFilmBox position="bottom-right" />

// Centro da tela
<FloatingFilmBox position="center" />

// Sobre o hero banner (especial)
<FloatingFilmBox position="hero-overlay" />
```

## 📏 Tamanhos

```tsx
// Pequeno
<FloatingFilmBox size="small" />

// Médio (padrão)
<FloatingFilmBox size="medium" />

// Grande
<FloatingFilmBox size="large" />
```

## ✨ Propriedades

| Propriedade | Tipo                                                                                         | Padrão        | Descrição                          |
| ----------- | -------------------------------------------------------------------------------------------- | ------------- | ---------------------------------- |
| `variant`   | `"default" \| "minimal" \| "elegant" \| "bold"`                                              | `"default"`   | Estilo visual do componente        |
| `position`  | `"top-left" \| "top-right" \| "bottom-left" \| "bottom-right" \| "center" \| "hero-overlay"` | `"top-right"` | Posição na tela                    |
| `size`      | `"small" \| "medium" \| "large"`                                                             | `"medium"`    | Tamanho do componente              |
| `showIcon`  | `boolean`                                                                                    | `true`        | Mostrar/ocultar ícone da câmera    |
| `animate`   | `boolean`                                                                                    | `true`        | Ativar animação flutuante          |
| `children`  | `ReactNode`                                                                                  | -             | Conteúdo customizado dentro do box |
| `className` | `string`                                                                                     | `""`          | Classes CSS adicionais             |

## 🎯 Exemplos de Uso

### Exemplo 1: Sobre Hero Banner (Atual)

```tsx
<div className="w-full aspect-[16/5] relative">
  <OptimizedImage src="/hero.png" alt="Banner" />
  <FloatingFilmBox variant="elegant" position="hero-overlay" size="medium" animate={true} />
</div>
```

### Exemplo 2: Múltiplos Boxes

```tsx
<>
  <FloatingFilmBox variant="minimal" position="top-left" size="small" />
  <FloatingFilmBox variant="bold" position="bottom-right" size="medium" />
</>
```

### Exemplo 3: Com Conteúdo Customizado

```tsx
<FloatingFilmBox variant="elegant" showIcon={false}>
  <div className="text-white text-center">
    <p className="text-sm font-bold">Film</p>
    <p className="text-xs">Tourism</p>
  </div>
</FloatingFilmBox>
```

### Exemplo 4: Sem Animação

```tsx
<FloatingFilmBox variant="default" position="center" animate={false} />
```

## 🎨 Arquivos SVG

### `film-camera.svg` (Versão Completa)

- Câmera de cinema vintage completa
- Inclui rolos de filme, objetiva, base
- 200x140 viewBox
- Tons terrosos (#8B4513, #A0522D, #654321)

### `film-camera-icon.svg` (Versão Ícone)

- Versão simplificada
- Ideal para ícones pequenos
- 100x70 viewBox
- Mesmas cores terrosas

## 📱 Responsividade

O componente é totalmente responsivo:

- **Mobile**: Tamanhos reduzidos, espaçamentos menores
- **Tablet**: Tamanhos intermediários
- **Desktop**: Tamanhos completos

Todas as posições e tamanhos se ajustam automaticamente através de classes Tailwind responsivas.

## 🎭 Animações

### Animação Flutuante (Float)

- Movimento vertical suave
- Duração: 3 segundos
- Loop infinito
- Efeito ease-in-out

### Hover

- Escala: 110%
- Rotação: 3 graus
- Transição suave

## 🎨 Cores (Paleta Terrosa)

- **Primary Brown**: `#8B4513` (Saddle Brown)
- **Light Brown**: `#A0522D` (Sienna)
- **Dark Brown**: `#654321` (Dark Brown)
- **Tan**: `#D2B48C` (Tan)
- **Light Tan**: `#E8D5B7`

## 🔧 Personalização

### Customizar através de className

```tsx
<FloatingFilmBox variant="elegant" className="opacity-80 blur-sm" />
```

### Customizar via Tailwind Config

As cores podem ser customizadas no `tailwind.config.js`:

```js
colors: {
  primary: {
    DEFAULT: "#8B4513",
    dark: "#654321",
    light: "#A0522D",
  },
}
```

## 📝 Notas Técnicas

- O componente usa `position: fixed` para ficar flutuante
- Z-index: 50 (acima do conteúdo, abaixo de modais)
- Backdrop blur para efeito glassmorphism
- Acessibilidade: `role="presentation"` e `aria-label`

## 🚀 Performance

- SVG otimizado (inline)
- Lazy loading opcional
- Animações otimizadas com CSS
- Sem dependências externas

## ✅ Checklist de Implementação

- [x] SVG da câmera criado (versão completa e ícone)
- [x] Componente React criado
- [x] 4 variantes de design
- [x] 6 posições diferentes
- [x] 3 tamanhos responsivos
- [x] Animações suaves
- [x] Integração na página Home
- [x] Documentação completa

## 🎯 Próximos Passos (Opcional)

- [ ] Adicionar mais variações de cores
- [ ] Criar versão interativa (clickable)
- [ ] Adicionar tooltip
- [ ] Criar versão com texto ao lado
- [ ] Adicionar modo dark/light automático
