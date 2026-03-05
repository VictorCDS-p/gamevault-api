import prisma from "./src/config/database.js";

async function promoteUserToAdmin(userId) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { role: "ADMIN" }
  });

  console.log("User updated:", user);
}

promoteUserToAdmin(ID) // substitua pelo ID do usuário
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e);
    process.exit(1);
  });

//   node updateRole.js