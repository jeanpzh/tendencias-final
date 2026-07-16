import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { chats, messages } from "../src/lib/db/schema";
import { DEMOS } from "../src/lib/constants";
import * as fs from "fs";
import * as path from "path";

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("❌ DATABASE_URL no está configurada en .env.local");
    console.error("   Crea una base de datos gratis en https://neon.tech");
    console.error("   y agrega la URL a .env.local");
    process.exit(1);
  }

  const sql = neon(databaseUrl);
  const db = drizzle(sql);

  console.log("🗄️  Conectando a Neon...");

  // Run migration SQL
  const migrationPath = path.join(__dirname, "..", "drizzle", "0000_typical_ulik.sql");
  if (fs.existsSync(migrationPath)) {
    const migrationSQL = fs.readFileSync(migrationPath, "utf-8");
    const statements = migrationSQL
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const stmt of statements) {
      await sql(stmt + ";");
    }
    console.log("✅ Migraciones aplicadas");
  }

  // Seed demo chats
  console.log("📝 Creando demos pre-cargadas...");

  for (const demo of DEMOS) {
    const [chat] = await db
      .insert(chats)
      .values({
        demoId: demo.id,
        title: demo.title,
      })
      .returning();

    await db.insert(messages).values({
      chatId: chat.id,
      role: "system",
      content: demo.prompt,
    });

    console.log(`  ✅ ${demo.title} (${demo.id})`);
  }

  console.log("\n🎉 ¡Base de datos lista! 6 demos pre-cargadas.");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
