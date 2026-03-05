// prisma/seed.js

import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pkg from "pg"
import bcrypt from "bcrypt"
import fs from "fs/promises"

const { Pool } = pkg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({
  adapter
})

const KNOWLEDGE_FILE = "./baseDeConhecimento.json"

async function main() {

  console.log("🌱 Iniciando seed...")

  const passwordHash = await bcrypt.hash("admin123", 10)

  const admin = await prisma.user.upsert({
    where: { email: "admin@gamevault.com" },
    update: {},
    create: {
      username: "admin",
      email: "admin@gamevault.com",
      password: passwordHash,
      role: "ADMIN"
    }
  })

  console.log("✅ Admin criado")

  const raw = await fs.readFile(KNOWLEDGE_FILE, "utf-8")
  const games = JSON.parse(raw)

  console.log(`📚 ${games.length} jogos carregados do JSON`)

  for (const game of games) {

    const category = await prisma.category.upsert({
      where: { name: game.category },
      update: {},
      create: {
        name: game.category
      }
    })

    await prisma.game.upsert({
      where: {
        steamAppId: game.steamAppId
      },
      update: {},

      create: {
        title: game.title,
        description: game.description ?? null,

        steamAppId: game.steamAppId,

        coverImage: game.coverImage,
        bannerImage: game.bannerImage ?? null,

        developer: game.developer ?? null,
        publisher: game.publisher ?? null,

        releaseDate: game.releaseDate
          ? new Date(game.releaseDate)
          : null,

        categoryId: category.id
      }
    })
  }

  console.log("✅ Jogos inseridos no banco")

  console.log("🌱 Seed finalizado")
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })