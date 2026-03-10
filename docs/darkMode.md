# 💜 NovaTask OS - Midnight Purple Style Guide

Documentação da paleta de cores oficial para o modo escuro (Dark Mode), otimizada para alto contraste e estética Cyber-Noir.

---

## 🌌 1. Superfícies e Fundos (Neutros)

* **Main Canvas (`#0F0C1D`):** Fundo principal da aplicação (Deep Space).
* **Surface Card (`#1A162F`):** Cor para cartões, modais e containers internos.
* **Sidebar Nav (`#131026`):** Fundo do menu de navegação lateral.
* **Glass Border (`rgba(162, 155, 254, 0.15)`):** Bordas finas para separação de elementos.

---

## 🦄 2. Acentos e Identidade (Glow)

* **Amethyst Glow (`#A29BFE`):** Cor primária para botões, ícones ativos e links.
* **Electric Purple (`#6C5CE7`):** Usada para gradientes de progresso e hovers.
* **Accent Shadow (`rgba(162, 155, 254, 0.3)`):** Brilho externo para elementos de foco.

---

## 🚦 3. Cores de Status (Semântica)

| Status | Hexadecimal | Uso Visual |
| :--- | :--- | :--- |
| **🔴 Urgente** | `#FF79C6` | Rosa Neon: Alertas críticos e prazos imediatos. |
| **🟡 Alta** | `#F1FA8C` | Amarelo Pastel: Prioridade importante. |
| **🟢 Sucesso** | `#50FA7B` | Verde Esmeralda: Tarefas concluídas e OK. |
| **🔵 Info / QA** | `#8BE9FD` | Ciano Neon: Documentação e tags técnicas. |

---

## 📋 4. Estilização de Colunas (Kanban Board)

As colunas utilizam um subtom do fundo para criar separação sem poluir a visão.

* **Coluna Header (`#E0E0FF`):** Cor do título da coluna (Inter Semi-Bold).
* **Coluna Background (`rgba(26, 22, 47, 0.5)`):** Fundo translúcido para a área de drop das tarefas.
* **Coluna Border (Active):** `1px solid #A29BFE` (Aparece apenas quando uma tarefa é arrastada sobre ela).
* **Counter Badge (`#2D274D`):** Fundo do círculo que mostra a contagem de tarefas no topo da coluna.

---

## 🚀 5. Variáveis CSS (Implementation)

```css
:root {
  /* Backgrounds */
  --nt-bg-deep: #0f0c1d;
  --nt-bg-card: #1a162f;
  --nt-bg-column: rgba(26, 22, 47, 0.5);
  
  /* Accents */
  --nt-accent: #a29bfe;
  --nt-accent-glow: rgba(162, 155, 254, 0.3);
  
  /* Status Columns Indicators */
  --nt-col-todo: #94a3b8;    /* Cinza Azulado */
  --nt-col-doing: #a29bfe;   /* Roxo Ametista */
  --nt-col-done: #50fa7b;    /* Verde Esmeralda */
  
  /* Typography */
  --nt-text-main: #e0e0ff;
  --nt-text-dim: #94a3b8;
  
  /* Layout */
  --nt-border: rgba(162, 155, 254, 0.15);
}

# 🖋️ NovaTask OS - Logo & Title Styling

### 1. Estrutura CSS (Styles)

```css
/* Container da Logo na Sidebar */
.logo-container {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 5px;
    margin-bottom: 2.5rem;
    cursor: pointer;
}

/* Ícone da Logo (O Círculo/Símbolo) */
.logo-icon {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #A29BFE 0%, #6C5CE7 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 15px rgba(162, 155, 254, 0.4);
    font-weight: 900;
    color: #0F0C1D;
    font-size: 1.1rem;
}

/* Texto da Logo (NovaTask OS) */
.logo-text {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 1.25rem;
    color: #E0E0FF;
    letter-spacing: -0.5px;
    display: flex;
    align-items: center;
}

/* O sufixo 'OS' com estilo diferenciado */
.logo-text span {
    color: #A29BFE;
    margin-left: 4px;
    font-weight: 300;
    opacity: 0.8;
}

/* Efeito de Hover na Logo */
.logo-container:hover .logo-icon {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(162, 155, 254, 0.6);
    transition: all 0.3s ease;
}