import nc from 'next-connect'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const handler = nc()

export default handler.get(async (req, res) => {
  const search = req.query.search
  if (search.length < 5)
    return res.status(404).json({
      status: 'Failed',
      message: 'Search must be at least 5 characters long',
    })

  try {
    const patient = await prisma.patients.findMany({
      where: {
        OR: [
          {
            PatientID: {
              contains: search,
            },
          },
          { Tel: { contains: search } },
        ],
      },
    })
    return res.status(200).json(patient)
  } catch (error) {
    throw new Error(error)
  }
})
