# Passa Bola - Plataforma de Futebol

### Link

https://frontend-three-alpha-72.vercel.app/

---

Uma plataforma completa de futebol desenvolvida com React e Firebase, oferecendo funcionalidades de autenticação, campeonatos, notícias e muito mais.

# Integrantes

- Enzo Brincalepe - Rm562296
- Luccas Figueira - Rm564240
- João Piccolo - Rm565127
- Pedro Drumond - Rm566255
- Paulo Henrique - Rm566240

## 🚀 Tecnologias Utilizadas

### Frontend

- **React 19** - Biblioteca principal para interface de usuário
- **Vite** - Build tool e servidor de desenvolvimento
- **React Router DOM** - Roteamento de páginas
- **Tailwind CSS** - Framework de estilização
- **React Icons** - Biblioteca de ícones
- **SweetAlert2** - Notificações e modais
- **GSAP** - Animações avançadas
- **Motion** - Animações e transições

### Backend & Autenticação

- **Firebase Authentication** - Sistema de autenticação completo
- **Firebase Firestore** - Banco de dados NoSQL
- **Firebase Realtime Database** - Banco de dados em tempo real

### Desenvolvimento

- **VSCode** - Editor de código recomendado
- **ESLint** - Linting de código
- **Git** - Controle de versão

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── campeonato/      # Componentes específicos de campeonato
│   ├── pageCampeonatos/ # Páginas de campeonato
│   └── ...
├── contexts/            # Contextos React (Auth, etc.)
├── hooks/              # Custom hooks
├── pages/              # Páginas da aplicação
├── services/           # Serviços e integrações
├── config/             # Configurações (Firebase, etc.)
├── assets/             # Imagens e recursos estáticos
└── data/               # Dados mockados
```

## 🔧 Instalação e Configuração

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Conta no Firebase

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o Firebase

1. Acesse o [Firebase Console](https://console.firebase.google.com)
2. Crie um novo projeto ou use um existente
3. Ative a autenticação por email/senha
4. Configure os templates de email (verificação e reset de senha)
5. Copie as configurações para `src/config/firebase.js`

### 4. Execute o projeto

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

## 🛠️ Configuração do VSCode

### Extensões Recomendadas

- **ES7+ React/Redux/React-Native snippets** - Snippets para React
- **Tailwind CSS IntelliSense** - Autocomplete para Tailwind
- **ESLint** - Linting em tempo real
- **Prettier** - Formatação de código
- **Auto Rename Tag** - Renomear tags HTML/JSX
- **Bracket Pair Colorizer** - Cores para brackets
- **GitLens** - Integração avançada com Git

### Configurações Recomendadas

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
```

## 🔐 Sistema de Autenticação

### Funcionalidades Implementadas

- **Registro de usuários** com validação de email
- **Login seguro** com Firebase Auth
- **Logout** com confirmação
- **Reset de senha** por email
- **Verificação de email** automática
- **Persistência de sessão** entre recarregamentos
- **Tratamento de erros** em português

### Arquivos Principais

- `src/contexts/AuthContext.jsx` - Contexto de autenticação
- `src/services/authService.js` - Serviços de autenticação
- `src/components/Login.jsx` - Componente de login
- `src/pages/PageRegister.jsx` - Página de registro

### Como Usar

```javascript
import { useAuth } from "./contexts/AuthContext";

function MeuComponente() {
  const { isAuthenticated, user, logout } = useAuth();

  if (isAuthenticated) {
    return <div>Olá, {user.displayName}!</div>;
  }

  return <div>Faça login para continuar</div>;
}
```

## 🎨 Interface e Design

### Design System

- **Cores principais**: Vermelho (#dc2626) e tons de cinza
- **Tipografia**: Fontes do sistema com hierarquia clara
- **Layout**: Responsivo com breakpoints para mobile, tablet e desktop
- **Componentes**: Reutilizáveis e consistentes

### Responsividade

- **Mobile First**: Desenvolvido pensando primeiro em dispositivos móveis
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Navegação**: Menu hambúrguer em mobile, menu horizontal em desktop

## ⚽ Funcionalidades do Site

### Páginas Principais

- **Home** (`/`) - Página inicial com carrossel, campeonato e notícias
- **Campeonato** (`/campeonato`) - Tabela de pontos e chaveamento
- **Notícias** (`/noticias`) - Seção de notícias e vídeos
- **Login** (`/login`) - Autenticação de usuários
- **Registro** (`/register`) - Cadastro de novos usuários
- **Perfil** (`/profile`) - Área do usuário

### Componentes Específicos

- **TabelaPontos** - Exibe classificação dos times
- **Chaveamento** - Mostra chaves do campeonato
- **Caroucel** - Carrossel de imagens e conteúdo
- **Noticias** - Lista de notícias e vídeos

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Linting
npm run lint
```

## 🔧 Configuração do Firebase

### Authentication

1. Acesse Authentication > Sign-in method
2. Ative "Email/Password"
3. Configure domínios autorizados

### Firestore

1. Crie uma coleção para usuários
2. Configure regras de segurança
3. Ative índices conforme necessário

### Templates de Email

1. Acesse Authentication > Templates
2. Configure templates para:
   - Verificação de email
   - Reset de senha
   - Mudança de email

## 📱 Funcionalidades Mobile

### Navegação

- Menu hambúrguer responsivo
- Navegação por gestos
- Interface otimizada para touch

### Performance

- Lazy loading de componentes
- Otimização de imagens
- Bundle splitting automático

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte o repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Netlify

1. Build do projeto: `npm run build`
2. Upload da pasta `dist`
3. Configure redirects para SPA

### Firebase Hosting

1. Instale Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Init: `firebase init hosting`
4. Deploy: `firebase deploy`

## 🔒 Segurança

### Autenticação

- Senhas criptografadas pelo Firebase
- Tokens JWT seguros
- Sessões com expiração automática

### Validação

- Validação client-side e server-side
- Sanitização de inputs
- Proteção contra XSS

### Dados

- Regras de segurança do Firestore
- Validação de permissões
- Logs de auditoria

## 🧪 Testes

### Testes Manuais

1. **Registro**: Teste criação de conta
2. **Login**: Teste autenticação
3. **Reset**: Teste recuperação de senha
4. **Responsividade**: Teste em diferentes dispositivos

### Checklist de Qualidade

- [ ] Validação de formulários
- [ ] Tratamento de erros
- [ ] Performance mobile
- [ ] Acessibilidade básica
- [ ] Compatibilidade de navegadores

## 📊 Performance

### Métricas Importantes

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Otimizações

- Code splitting automático
- Lazy loading de rotas
- Otimização de imagens
- Minificação de CSS/JS

## 🤝 Contribuição

### Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

### Padrões de Código

- Use VSCode com extensões recomendadas
- Use ESLint para manter consistência
- Siga as convenções do React
- Documente funções complexas
- Teste suas mudanças

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte:

- Abra uma issue no GitHub
- Entre em contato via email
- Consulte a documentação do Firebase

## 🔄 Changelog

### v1.0.0

- Sistema de autenticação completo
- Interface responsiva
- Integração com Firebase
- Componentes de campeonato
- Sistema de notícias

---

**Desenvolvido com ❤️ para a comunidade do futebol brasileiro**
