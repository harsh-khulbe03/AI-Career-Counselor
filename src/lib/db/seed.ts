import { db } from "./index";
import * as schema from "./schema";
import { seed } from "drizzle-seed";

async function cleanDatabase() {
  console.log("Cleaning up database...");
  await db.delete(schema.verificationTokens);
  await db.delete(schema.sessions);
  await db.delete(schema.accounts);
  await db.delete(schema.messages);
  await db.delete(schema.chatSessions);
  await db.delete(schema.users);
  console.log("🎉 Database cleanup completed!");
}

async function seedData() {
  console.log("Seeding data...");
  await seed(db, {
    users: schema.users,
    chatSessions: schema.chatSessions,
    messages: schema.messages,
  }).refine((f) => ({
    users: {
      count: 10,
      columns: {
        name: f.fullName(),
        email: f.email(),
        emailVerified: f.date(),
        createdAt: f.datetime(),
        updatedAt: f.datetime(),
      },
    },
    chatSessions: {
      count: 30,
      columns: {
        title: f.string(),
        createdAt: f.datetime(),
        updatedAt: f.datetime(),
      },
    },
    messages: {
      count: 300,
      columns: {
        content: f.string(),
        role: f.valuesFromArray({
          values: ["user", "assistant", "system"],
        }),
        createdAt: f.datetime(),
      },
    },
  }));
}

async function main() {
  await cleanDatabase();
  await seedData();
  console.log("Seeding completed successfully!");
}

main().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
