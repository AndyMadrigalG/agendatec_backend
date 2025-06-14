import { PrismaClient } from '../generated/prisma/client';

// use `prisma` in your application to read and write data in your DB
const prisma = new PrismaClient()

export default prisma;