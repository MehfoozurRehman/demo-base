import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  const globalWithPrisma = global as typeof globalThis & {
    prisma?: PrismaClient;
  };
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
  }
  prisma = globalWithPrisma.prisma;
}

const disconnectPrisma = async () => {
  await prisma.$disconnect();
};

process.on("beforeExit", disconnectPrisma);
process.on("SIGINT", async () => {
  await disconnectPrisma();
  process.exit(0);
});
process.on("SIGTERM", async () => {
  await disconnectPrisma();
  process.exit(0);
});
process.on("SIGQUIT", async () => {
  await disconnectPrisma();
  process.exit(0);
});

export default prisma;
