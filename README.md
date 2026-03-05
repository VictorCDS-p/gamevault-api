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

## ⚙️ Configuração

### 1️⃣ Clonar repositório

```bash
git clone <https://github.com/VictorCDS-p/gamevault-api>
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

### 4️⃣ Rodar Prisma e Seed

Crie o banco (caso ainda não exista):

```bash
npx prisma migrate dev --name init
```

Popule o banco com a seed:

```bash
node prisma/seed.js
```

Isso criará:

* Um **usuário admin padrão**:

  * **E-mail:** `admin@gamevault.com`
  * **Senha:** `admin123`

* Categorias e jogos pré-carregados a partir do JSON.

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

## 🔝 Transformando um Usuário em Admin

Para testes, é possível promover um usuário existente a **ADMIN** manualmente:

1️⃣ Crie ou edite o arquivo `updateRole.js`:

```javascript
import prisma from "./src/config/database.js";

async function promoteUserToAdmin(userId) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { role: "ADMIN" }
  });

  console.log("User updated:", user);
}

// Substitua pelo ID do usuário que deseja promover
promoteUserToAdmin(ID)
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
```

2️⃣ Execute o script:

```bash
node updateRole.js
```

> ⚠️ Substitua o ID pelo usuário que deseja promover.
> Caso não queira usar o script, utilize o **usuário admin da seed**:
> **E-mail:** `admin@gamevault.com` | **Senha:** `admin123`

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
### 📥 Importando a coleção

1. Abra o Postman.
2. Clique em **Import** → **Upload Files**.
3. Selecione o arquivo `gamevault-api.postman_collection.json` localizado em `gamevault-api/collection/`.
4. A coleção será importada com todos os endpoints prontos para uso.
---
## 📝 Rodando o Projeto

```bash
npm run dev
```

O servidor rodará em `http://localhost:3000`.

Todas as rotas podem ser testadas usando **Postman**, conforme a coleção fornecida.

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
