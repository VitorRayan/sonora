[# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
](url)
## Como rodar o projeto

### 1. Pré-requisitos
- Node.js instalado
- npm instalado
- Git instalado

### 2. Clone o repositório
```bash
git clone https://github.com/SEU_USUARIO/SONORA.git
cd SONORA
```

### 3. Instale as dependências
```bash
npm install
```

### 4. Variáveis de ambiente
Este projeto atual funciona como um front-end React/Vite e **não precisa de `.env` nem de banco de dados** para rodar localmente.
Os dados são salvos no navegador com `localStorage`.

### 5. Inicie o projeto
```bash
npm run dev
```

### 6. Acesse no navegador
A aplicação roda normalmente em:
- `http://localhost:5173`

### 7. Login padrão
O projeto já vem com um usuário administrativo local:
- Email: `admin@admin`
- Senha: `admin`

### 8. Build de produção (opcional)
```bash
npm run build
npm run preview
```

### 9. Possíveis erros comuns
- Se aparecer erro de dependências, rode `npm install` novamente.
- Se a porta `5173` estiver ocupada, use outro port com `npm run dev -- --host 0.0.0.0 --port 3000`.
- Se o projeto não abrir, rode `npm run build` para verificar se o código compila.
