import nc from 'next-connect'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const handler = nc()

export default handler.get(async (req, res) => {
  try {
    const towns = await prisma.town.findMany()
    return res.status(200).json(towns)
  } catch (error) {
    throw new Error(error)
  }
})
