# Serviços Firebase - PassaBola

Este diretório contém os serviços para integração com o Firebase Firestore para gerenciar dados de clubes e jogadoras.

## Serviços Disponíveis

### clubeServiceFirebase.js

Serviço para gerenciar dados de clubes no Firebase Firestore.

**Métodos disponíveis:**

- `getClubes()` - Busca todos os clubes ordenados por data de inscrição
- `getClubeById(id)` - Busca um clube específico por ID
- `createClube(clubeData)` - Cria um novo clube
- `updateClube(id, clubeData)` - Atualiza dados de um clube
- `deleteClube(id)` - Remove um clube
- `verificarNomeExistente(nome, idExcluir)` - Verifica se já existe um clube com o nome
- `getClubesPorStatus(status)` - Busca clubes por status
- `atualizarStatusClube(id, status)` - Atualiza o status de um clube

### jogadoraServiceFirebase.js

Serviço para gerenciar dados de jogadoras no Firebase Firestore.

**Métodos disponíveis:**

- `getJogadoras()` - Busca todas as jogadoras ordenadas por data de inscrição
- `getJogadoraById(id)` - Busca uma jogadora específica por ID
- `createJogadora(jogadoraData)` - Cria uma nova jogadora
- `updateJogadora(id, jogadoraData)` - Atualiza dados de uma jogadora
- `deleteJogadora(id)` - Remove uma jogadora
- `verificarEmailExistente(email, idExcluir)` - Verifica se já existe uma jogadora com o email
- `getJogadorasPorStatus(status)` - Busca jogadoras por status
- `getJogadorasPorPosicao(posicao)` - Busca jogadoras por posição
- `getJogadorasPorExperiencia(experiencia)` - Busca jogadoras por nível de experiência
- `atualizarStatusJogadora(id, status)` - Atualiza o status de uma jogadora

## Estrutura dos Dados

### Clube

```javascript
{
  nome: string,
  cidade: string,
  estado: string,
  responsavel: string,
  email: string,
  telefone: string,
  observacoes: string,
  dataInscricao: timestamp,
  status: 'pendente' | 'aprovado' | 'rejeitado',
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Jogadora

```javascript
{
  nome: string,
  email: string,
  telefone: string,
  dataNascimento: string,
  altura: number,
  peso: number,
  posicao: string,
  cidade: string,
  estado: string,
  experiencia: string,
  clubeAtual: string,
  observacoes: string,
  dataInscricao: timestamp,
  status: 'pendente' | 'aprovado' | 'rejeitado',
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## Como Usar

### Exemplo de criação de clube:

```javascript
import { clubeServiceFirebase } from "../services/clubeServiceFirebase";

const dadosClube = {
  nome: "Flamengo",
  cidade: "Rio de Janeiro",
  estado: "RJ",
  responsavel: "João Silva",
  email: "joao@flamengo.com",
  telefone: "(21) 99999-9999",
  observacoes: "Clube tradicional do Rio de Janeiro",
};

const novoClube = await clubeServiceFirebase.createClube(dadosClube);
```

### Exemplo de criação de jogadora:

```javascript
import { jogadoraServiceFirebase } from "../services/jogadoraServiceFirebase";

const dadosJogadora = {
  nome: "Maria Silva",
  email: "maria@email.com",
  telefone: "(21) 88888-8888",
  dataNascimento: "1995-05-15",
  altura: 165,
  peso: 60,
  posicao: "Atacante",
  cidade: "Rio de Janeiro",
  estado: "RJ",
  experiencia: "Intermediário",
  clubeAtual: "Flamengo",
  observacoes: "Jogadora experiente",
};

const novaJogadora = await jogadoraServiceFirebase.createJogadora(
  dadosJogadora
);
```

## Configuração do Firebase

Certifique-se de que o arquivo `src/config/firebase.js` está configurado corretamente com suas credenciais do Firebase.

## Regras de Segurança do Firestore

Para que os serviços funcionem corretamente, configure as seguintes regras no Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Regras para clubes
    match /clubes/{document} {
      allow read, write: if request.auth != null;
    }

    // Regras para jogadoras
    match /jogadoras/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```
