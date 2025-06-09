# 🔗 HumanLink: Conectando Pessoas em Momentos de Crise 💙

Bem-vindo ao **HumanLink**! 🚀  
Mais do que uma plataforma, somos uma ponte de solidariedade e uma ferramenta vital para responder a desastres e emergências climáticas. 

Nosso propósito é simples, mas poderoso: facilitar a conexão instantânea entre quem precisa de ajuda e quem pode oferecer, com foco total em geolocalização inteligente, priorização urgente e agilidade na resposta.  
Juntos, cada ação se torna um elo, e cada elo, uma esperança! 🤝

🔗 **Acesse agora:**  
humanlink-front.vercel.app


## ✨ Funcionalidades Principais

O HumanLink é sua central de comando para ajuda humanitária, repleto de recursos pensados para uma coordenação eficiente e humana:

- 🏠 **Página Inicial (HomePage)**  
  Portal claro e convidativo, apresentando nossa missão com chamadas para ação que inspiram engajamento.

- 🔑 **Login Seguro (LoginPage)**  
  Sistema de autenticação via e-mail e senha, com cookies para uma experiência fluida e segura.

- 📊 **Painel de Controle (DashboardPage)**  
  Seu QG para atualizações em tempo real, registro de necessidades, ofertas de ajuda, gerenciamento de doações e muito mais.

- 📝 **Novo Relato (NovoRelatoPage)**  
  Formulário detalhado para registrar emergências, com opção de anexar fotos e vídeos para maior precisão.

- 📚 **Explorar Relatos (RelatosPage)**  
  Navegue pelas histórias da comunidade, com leitura expandida para compreensão profunda.

- 🙏 **Necessidades Urgentes (NecessidadesPage)**  
  Lista organizada com títulos, categorias, urgência e localização para identificar rapidamente onde sua ajuda faz a diferença.

- 🔔 **Centro de Notificações (NotificacoesPage)**  
  Sistema para mantê-lo informado com alertas, mensagens e status de leitura.

- 👤 **Seu Perfil (PerfilPage)**  
  Área pessoal para gerenciar dados, tipos de usuário (voluntário, doador, vítima), senha e conta, garantindo privacidade e controle.

- 🗺️ **Mapa Interativo (Map)**  
  Visualização em tempo real com Leaflet de abrigos, pontos de doação e centros médicos para facilitar a coordenação rápida.

- 🆘 **Recursos de Emergência (RecursosPage)**  
  Guia com contatos de emergência, abrigos, pontos de doação, atendimento de saúde e apoio psicossocial.

---

## 🏗️ Arquitetura e Componentes

Construído com **Next.js** e **React**, o HumanLink segue uma arquitetura modular que garante fluidez na experiência do usuário, facilidade de manutenção e escalabilidade.

Principais componentes incluem:

- **Header & Footer:** Adaptativos, com contador de notificações e links essenciais.  
- **Button:** Variantes estilísticas para diferentes ações.  
- **Card:** Contêiner versátil para exibir dados como necessidades e atualizações.  
- **Input, Select, Textarea:** Blocos de formulário para coleta eficiente e UX consistente.  
- **SectionTitle:** Títulos organizadores com subtítulos opcionais.  
- **ActionPanel:** Painel de ações rápidas, intuitivo e visual.  
- **AlertBadge:** Indicações visuais de status (URGENTE, DISPONÍVEL, CONCLUÍDO) com cores vibrantes.  
- **UserMenu:** Menu suspenso para acesso rápido a perfil, suporte e logout.  
- **Utilitários de Cookie:** Gerenciam cookies para login seguro e fluido.  
- **Layouts (RootLayout):** Estrutura global do app, com fontes e estilos base.

---

## 🚀 Como Rodar o HumanLink Localmente

### 🛠️ Pré-requisitos

- **Node.js** (versão LTS recomendada)  
  Baixe em: [https://nodejs.org/pt-br/download/](https://nodejs.org/pt-br/download/)  
  (Inclui npm)

### 📦 Instalação

```bash
git clone https://github.com/annabonfim/humanlink-front.git
cd humanlink-front

# Instale as dependências do projeto
npm install

# Instale dependências adicionais
npm install react-leaflet@^5.0.0
npm install leaflet
npm install -D @types/leaflet
npm install axios

# Inicie o servidor de desenvolvimento
npm run dev

```

### 💻 Tecnologias Utilizadas

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/)

[![React Leaflet](https://img.shields.io/badge/React--Leaflet-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react-leaflet.js.org/)

[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)


## 📁 Estrutura do Projeto
A organização do HumanLink foi pensada para garantir clareza, escalabilidade e facilidade de manutenção, adotando uma estrutura modular baseada em funcionalidades e componentes reutilizáveis.



```
├── app/
│   ├── layout.tsx            # Layout global da aplicação
│   ├── page.tsx              # Página inicial (HomePage)
│   ├── dashboard/            # Painel de Controle (DashboardPage)
│   │   ├── page.tsx          # Página do painel
│   │   └── components/       # Componentes específicos do dashboard
│   ├── relato/               # Funcionalidades para novos relatos (NovoRelatoPage)
│   │   ├── page.tsx          
│   │   └── components/       
│   ├── necessidades/         # Lista de necessidades urgentes (NecessidadesPage)
│   │   ├── page.tsx          
│   │   └── components/       
│   ├── notificacoes/         # Centro de notificações (NotificacoesPage)
│   │   ├── page.tsx          
│   │   └── components/       
│   ├── perfil/               # Área do usuário (PerfilPage)
│   │   ├── page.tsx          
│   │   └── components/       
│   ├── mapa/                 # Mapa interativo (Map)
│   │   ├── page.tsx          
│   │   └── components/       
│   └── recursos/             # Recursos de emergência (RecursosPage)
│       ├── page.tsx          
│       └── components/       
├── components/               # Componentes reutilizáveis globais (ex: Header, Footer, Button)
├── public/                   # Arquivos estáticos (imagens, fontes, ícones)
├── styles/                   # Estilos globais e configuração Tailwind CSS
├── utils/                    # Utilitários e helpers (API, autenticação, geolocalização)
├── .gitignore                # Arquivos ignorados pelo Git
├── next.config.js            # Configurações do Next.js
├── package.json              # Dependências e scripts do projeto
└── tsconfig.json             # Configuração do TypeScript
```



---

## 👤 Acesso Rápido para Validação

Para facilitar a correção sem necessidade de cadastro, disponibilizamos um usuário pré-cadastrado com acesso completo à plataforma:

- **Login:** `rm559561@fiap.com.br`  
- **Senha:** `12345`

Com esse usuário, é possível navegar por todas as páginas, testar funcionalidades como relatos, notificações, necessidades e editar o perfil.

---


## 🎥 Apresentação do Projeto

Assista à nossa apresentação do **HumanLink** para conhecer detalhes do projeto, funcionalidades e demonstrações práticas:

[![Apresentação HumanLink](https://img.youtube.com/vi/SEU_VIDEO_ID/maxresdefault.jpg)](https://youtu.be/Svk93QMcHUU)

**Link direto para o vídeo:**  
https://youtu.be/Svk93QMcHUU





## 👩🏻‍💻 Autores

- [**Alane Rocha rm561052**](https://github.com/alanerochaa)  
- [**Anna Beatriz Bonfim rm559561**](https://github.com/annabonfim)  
- [**Maria Eduarda Araujo rm560944**](https://github.com/DudaAraujo14)  
