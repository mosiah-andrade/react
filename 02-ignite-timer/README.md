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

# ⏱️ Ignite Timer

Este projeto é uma aplicação de contador Pomodoro desenvolvida durante o módulo "Criando SPAs com ReactJS" do curso Ignite da Rocketseat. O objetivo é auxiliar na gestão de tempo para aumentar a produtividade.

## 🛠️ Funcionalidades

- **Iniciar novo ciclo**: Comece um novo ciclo Pomodoro com duração configurável.
- **Cancelar ciclo**: Interrompa o ciclo atual a qualquer momento.
- **Histórico de ciclos**: Visualize os ciclos anteriores com suas respectivas durações.

## ⚙️ Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Styled Components](https://styled-components.com/)
- [Vite](https://vitejs.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://github.com/colinhacks/zod)
- [Immer](https://immerjs.github.io/immer/)
- [date-fns](https://date-fns.org/)
- [Phosphor Icons](https://phosphoricons.com/)
- [React Router DOM](https://reactrouter.com/)

## 📦 Como Executar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/mosiah-andrade/react.git
cd react/02-ignite-timer
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn
```

### 3. Inicie o servidor de desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

O projeto estará disponível em [http://localhost:5173](http://localhost:5173).

## 🎨 Layout

Você pode visualizar o layout do projeto através deste [link do Figma](https://www.figma.com/).

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
