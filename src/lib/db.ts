import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  // Bypassing Prisma instantiation since we use mock data when DB is unconfigured
  return {} as PrismaClient;
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
