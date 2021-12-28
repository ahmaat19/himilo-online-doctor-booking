import nc from 'next-connect'
import { PrismaClient } from '@prisma/client'
import moment from 'moment'

const prisma = new PrismaClient()

const handler = nc()

export default handler.get(async (req, res) => {
  try {
    const doctors = await prisma.doctors.findMany({
      where: {
        Doctor: 'Yes',
        Active: 'Yes',
        WorkingDays: { contains: moment().format('dddd') },
      },
    })
    return res.status(200).json({ total: doctors.length, doctors })
  } catch (error) {
    throw new Error(error)
  }
})
