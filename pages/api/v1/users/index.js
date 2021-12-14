import nc from 'next-connect'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const handler = nc()

export default handler.get(async (req, res) => {
  try {
    const users = await prisma.users.findMany()
    return res.status(200).json(users)
  } catch (error) {
    throw new Error(error)
  }
})
