# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# Fundamentos do React com TypeScript

Este projeto é uma introdução prática aos conceitos fundamentais do React.js usando **TypeScript**, incluindo:

- Componentes  
- JSX  
- Props com tipagem  
- Estado (state) com tipagem  
- Eventos  
- Integração básica do React com TypeScript  

Ele faz parte do repositório [mosiah-andrade/react](https://github.com/mosiah-andrade/react) e está localizado na pasta `01-fundamentos-react-ts`.

---

## Estrutura do Projeto

```
01-fundamentos-react-ts/
├── public/
│   └── index.html
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   └── ...
├── .gitignore
├── package.json
├── tsconfig.json
├── README.md
└── vite.config.ts
```

---

## Como Executar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/mosiah-andrade/react.git
cd react/01-fundamentos-react-ts
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173` (padrão do Vite).

---

## Conceitos Abordados

- **JSX** — Sintaxe para escrever HTML dentro do JavaScript/TypeScript.  
- **Componentes** — Blocos reutilizáveis que compõem a interface do usuário.  
- **Props Tipadas** — Parâmetros passados para os componentes com definição de tipos.  
- **State Tipado** — Gerenciamento de estado interno com segurança de tipos.  
- **Eventos Tipados** — Manipulação de eventos com tipos específicos do TypeScript.  

---

## Tecnologias Utilizadas

- [React.js](https://pt.wikipedia.org/wiki/React_(JavaScript))  
- [TypeScript](https://www.typescriptlang.org/)  
- [JavaScript (ES6+)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)  
- [Node.js](https://nodejs.org/)  
- [npm](https://www.npmjs.com/)  
- [Vite](https://vitejs.dev/)  

---

## Recursos Adicionais

- [Documentação Oficial do React](https://pt-br.reactjs.org/docs/getting-started.html)  
- [Documentação Oficial do TypeScript](https://www.typescriptlang.org/docs/)  
- [Artigo sobre React com TypeScript](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/)  

---

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

