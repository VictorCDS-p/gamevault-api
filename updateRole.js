import dotenv from "dotenv";
dotenv.config(); // carrega .env
import prisma from "./src/config/database.js";

// Passa o ID do usuário via argumento de linha de comando
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