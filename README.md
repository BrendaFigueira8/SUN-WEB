# SUN-WEB

Este é um projeto web desenvolvido com React, Vite e Tailwind CSS para planejamento semanal de hábitos e tarefas.

## Funcionalidades
- Visualização e criação de planejamentos semanais
- Lista de compromissos
- Rastreador de hábitos
- Tarefas semanais
- Fundo dinâmico com imagens de gatos
- Legenda de status

## Estrutura do Projeto
```
eslint.config.js
index.html
package.json
postcss.config.js
tailwind.config.js
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vercel.json
vite.config.ts
src/
  App.tsx
  index.css
  main.tsx
  vite-env.d.tsx
  assets/
  components/
    CommitmentsList.tsx
    HabitTracker.tsx
    RandomCatBackground.jsx
    StatusLegend.tsx
    WeeklyTasks.tsx
  pages/
    CreatePlanning.d.ts
    CreatePlanning.jsx
    ViewPlanning.jsx
  types/
    weeklyplanner.d.ts
```

## Tecnologias Utilizadas
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Como executar
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Acesse `http://localhost:5173` no navegador.

## Deploy
O projeto está configurado para deploy na Vercel.