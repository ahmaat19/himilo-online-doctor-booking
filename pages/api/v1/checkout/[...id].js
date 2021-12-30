import nc from 'next-connect'
import { PrismaClient } from '@prisma/client'
import moment from 'moment'

const prisma = new PrismaClient()

const handler = nc()

export default handler.get(async (req, res) => {
  try {
    const doctorId = req.query.id[1]
    const patientId = req.query.id[0]

    const patient = await prisma.patients.findMany({
      where: {
        PatientID: patientId,
      },
    })

    const doctor = await prisma.doctors.findMany({
      where: {
        DoctorID: doctorId,
        Doctor: 'Yes',
        Active: 'Yes',
        WorkingDays: { contains: moment().format('dddd') },
      },
    })

    return res.status(200).json({ doctor, patient })
  } catch (error) {
    throw new Error(error)
  }
})
