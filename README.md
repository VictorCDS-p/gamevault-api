---

# 🎮 GameVault API

API **Full Stack** para gerenciamento de jogos, biblioteca pessoal e coleções. Permite criar usuários, autenticação, gerenciamento de jogos, categorias, coleções e biblioteca pessoal. O projeto utiliza **Node.js, Express, Prisma e PostgreSQL**.

---

## 🔧 Tecnologias

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL
* JWT para autenticação
* Bcrypt para hash de senhas
* CORS
* Axios (para futuras integrações com frontend)

---

## ⚙️ Configuração do Projeto

### 1️⃣ Clonar repositório

```bash
git clone https://github.com/VictorCDS-p/gamevault-api
cd gamevault-api
```

### 2️⃣ Instalar dependências

```bash
npm install
```

### 3️⃣ Configurar `.env`

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/gamevault"
JWT_SECRET="supersecret"
```

### 4️⃣ Criar banco e aplicar migrations

```bash
npx prisma migrate dev --name init
```

### 5️⃣ Popular banco com seed

```bash
node prisma/seed.js
```

Isso criará:

* Um **usuário admin padrão**:

  * **E-mail:** `admin@gamevault.com`
  * **Senha:** `admin123`
* Categorias e jogos pré-carregados a partir do JSON.

---

### 6️⃣ Reset / Limpar banco de dados

Se quiser **limpar todo o banco e começar do zero**, use:

```bash
npx prisma migrate reset
```

Isso vai:

* Apagar todas as tabelas
* Reaplicar as migrations
* Executar o seed (se configurado)

> ⚠️ Todos os dados existentes serão perdidos.

---

## 🔝 Transformando um Usuário em Admin

Agora você pode promover qualquer usuário a **ADMIN** passando o ID diretamente no terminal.

### 1️⃣ Crie ou edite o arquivo `updateRole.js`:

```javascript
import dotenv from "dotenv";
dotenv.config();
import prisma from "./src/config/database.js";

// Pega o ID do usuário do argumento de linha de comando
const userId = process.argv[2];

if (!userId) {
  console.error("❌ Erro: Informe o ID do usuário como argumento.");
  console.log("Exemplo: node updateRole.js 1");
  process.exit(1);
}

async function promoteUserToAdmin(userId) {
  try {
    const user = await prisma.user.update({
      where: { id: Number(userId) },
      data: { role: "ADMIN" },
    });
    console.log("✅ Usuário promovido a ADMIN:", user);
  } catch (error) {
    console.error("❌ Erro ao atualizar usuário:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

promoteUserToAdmin(userId);
```

### 2️⃣ Execute o script:

```bash
node updateRole.js 1
```

> Substitua `1` pelo ID do usuário que deseja promover.
> Alternativamente, você pode usar o **usuário admin da seed**:
> **E-mail:** `admin@gamevault.com` | **Senha:** `admin123`

---

## 🔑 Autenticação (Auth)

### Registrar usuário

**POST** `/auth/register`

```json
{
  "username": "User",
  "email": "user@email.com",
  "password": "123456"
}
```

### Login

**POST** `/auth/login`

```json
{
  "email": "user@email.com",
  "password": "123456"
}
```

Retorna um **token JWT** que deve ser usado nas rotas autenticadas.

---

## 👤 Usuários

Todas as rotas de usuário exigem **token JWT**.

| Rota        | Método | Descrição                                  |
| ----------- | ------ | ------------------------------------------ |
| `/users/me` | GET    | Pega perfil do usuário logado              |
| `/users/me` | PUT    | Atualiza perfil (`username`, `avatar`)     |
| `/users/me` | DELETE | Deleta conta do usuário logado             |
| `/users`    | GET    | Lista todos os usuários (**Admin apenas**) |

---

## 🎮 Jogos (Games)

| Rota                  | Método | Descrição            | Restrição        |
| --------------------- | ------ | -------------------- | ---------------- |
| `/games`              | GET    | Lista todos os jogos | ✅                |
| `/games?category=RPG` | GET    | Filtra por categoria | ✅                |
| `/games`              | POST   | Cria um jogo         | **Admin apenas** |

---

## 📚 Biblioteca (Library)

| Rota                         | Método | Descrição                                                      |
| ---------------------------- | ------ | -------------------------------------------------------------- |
| `/library`                   | GET    | Lista biblioteca do usuário                                    |
| `/library/:gameId`           | POST   | Adiciona jogo à biblioteca                                     |
| `/library/:libraryId/status` | PUT    | Atualiza status (`PLAYING`, `COMPLETED`, `BACKLOG`, `DROPPED`) |
| `/library/:libraryId`        | DELETE | Remove jogo da biblioteca                                      |

---

## 🗂️ Coleções (Collections)

| Rota                             | Método | Descrição                 |
| -------------------------------- | ------ | ------------------------- |
| `/collections`                   | GET    | Lista coleções do usuário |
| `/collections`                   | POST   | Cria nova coleção         |
| `/collections/:id`               | PUT    | Atualiza coleção          |
| `/collections/:id`               | DELETE | Deleta coleção            |
| `/collections/:id/games/:gameId` | POST   | Adiciona jogo à coleção   |
| `/collections/:id/games/:gameId` | DELETE | Remove jogo da coleção    |

---

## 🏷️ Categorias (Categories)

| Rota                     | Método | Descrição                  | Restrição        |
| ------------------------ | ------ | -------------------------- | ---------------- |
| `/categories`            | GET    | Lista todas as categorias  | ✅                |
| `/categories/with-games` | GET    | Lista categorias com jogos | ✅                |
| `/categories/:id`        | GET    | Busca categoria com jogos  | ✅                |
| `/categories`            | POST   | Cria nova categoria        | **Admin apenas** |

---

## 📥 Importando a coleção

1. Abra o Postman.
2. Clique em **Import → Upload Files**.
3. Selecione `gamevault-api.postman_collection.json` em `gamevault-api/collection/`.
4. Todos os endpoints serão importados e prontos para uso.

---

## 📝 Rodando o Projeto

```bash
npm run dev
```

Servidor rodará em `http://localhost:3000`.

---

## ⚙️ Estrutura do Projeto

```
src/
 ├─ config/
 │   └─ database.js
 ├─ controllers/
 │   ├─ authController.js
 │   ├─ userController.js
 │   ├─ gameController.js
 │   ├─ categoryController.js
 │   ├─ libraryController.js
 │   └─ collectionController.js
 ├─ repositories/
 │   ├─ userRepository.js
 │   ├─ gameRepository.js
 │   ├─ categoryRepository.js
 │   ├─ libraryRepository.js
 │   └─ collectionRepository.js
 ├─ services/
 │   ├─ authService.js
 │   ├─ userService.js
 │   ├─ gameService.js
 │   ├─ categoryService.js
 │   ├─ libraryService.js
 │   └─ collectionService.js
 ├─ middleware/
 │   ├─ authMiddleware.js
 │   └─ roleMiddleware.js
 └─ routes/
     ├─ authRoutes.js
     ├─ userRoutes.js
     ├─ gameRoutes.js
     ├─ categoryRoutes.js
     ├─ libraryRoutes.js
     └─ collectionRoutes.js
prisma/
 ├─ schema.prisma
 └─ seed.js
updateRole.js
.env
server.js
```

---

Quer que eu faça isso também?
