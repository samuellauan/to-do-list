# ☀️ NovaTask OS - Light Mode Style Guide

### 🎨 1. Superfícies e Fundos (Neutros)

* **Main Canvas (`#F8F9FA`):** Fundo principal da aplicação. Um cinza "off-white" que evita o ofuscamento do branco puro.

* **Surface Card (`#FFFFFF`):** Branco puro para cartões, modais e áreas de conteúdo, criando separação visual clara.

* **Sidebar Nav (`#F1F3F5`):** Um cinza levemente mais denso para definir a estrutura de navegação lateral.

* **Soft Border (`#E9ECEF`):** Bordas finas de 1px para definição de elementos sem carregar o layout.

---

### 🦄 2. Acentos e Identidade (Soft Purple)

* **Royal Amethyst (`#6C5CE7`):** Cor primária para botões, ícones ativos e links. 

* **Soft Lavender (`#A29BFE`):** Usada para backgrounds de tags, estados de hover e destaques secundários.

* **Shadow Tint (`rgba(108, 92, 231, 0.08)`):** Sombras coloridas muito sutis que dão profundidade aos elementos.

---

### 🚦 3. Cores Semânticas (Status Light)

| Status | Hexadecimal | Uso Visual |
| :--- | :--- | :--- |
| **🔴 Urgente** | `#E84393` | Rosa Intenso: Texto escuro sobre fundo rosa pastel. |
| **🟡 Alta** | `#E67E22` | Laranja Queimado: Substitui o amarelo para melhor leitura. |
| **🟢 Sucesso** | `#27AE60` | Verde Floresta: Concluído e Disponibilidade de equipe. |
| **🔵 Info / QA** | `#0984E3` | Azul Oceano: Tags técnicas, métricas e documentação. |

---

### ✍️ 4. Tipografia e Contraste

* **Texto Primário (`#2D3436`):** Cinza "Antracite" para títulos e corpo de texto principal.

* **Texto Secundário (`#636E72`):** Para legendas, metadados e informações de apoio.

* **Texto Desativado (`#B2BEC3`):** Para placeholders, itens arquivados e estados "disabled".

---

### 🚀 5. Variáveis CSS (Implementation)

```css
:root {
  --nt-bg-main: #f8f9fa;
  --nt-bg-card: #ffffff;
  --nt-bg-sidebar: #f1f3f5;
  --nt-accent-primary: #6c5ce7;
  --nt-accent-soft: #a29bfe;
  --nt-status-urgent: #e84393;
  --nt-status-high: #e67e22;
  --nt-status-success: #27ae60;
  --nt-status-info: #0984e3;
  --nt-text-main: #2d3436;
  --nt-text-muted: #636e72;
  --nt-text-disabled: #b2bec3;
  --nt-border-color: #e9ecef;
  --nt-shadow-md: 0 8px 30px rgba(108, 92, 231, 0.08);
}