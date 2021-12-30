import nc from 'next-connect'
import { PrismaClient } from '@prisma/client'
import moment from 'moment'

const prisma = new PrismaClient()

const handler = nc()

handler.get(async (req, res) => {
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

handler.post(async (req, res) => {
  const {
    PatientID,
    DoctorID,
    UserName,
    PatientType,
    Tel,
    BookingTel,
    Date: AppDate,
    AddedBy,
  } = req.body

  const doctor = await prisma.doctors.findMany({
    where: {
      DoctorID,
      Doctor: 'Yes',
      Active: 'Yes',
      WorkingDays: { contains: moment().format('dddd') },
    },
  })

  try {
    if (doctor.length > 0) {
      const data = {
        PatientID,
        DoctorID,
        UserName,
        PatientType,
        Tel,
        BookingTel,
        Cost: doctor[0].Cost,
        Status: 'Existing',
        AddedBy,
        Date: moment(AppDate).format(),
        DateAdded: new Date(),
      }

      await prisma.doctorAssignation.createMany({
        data: [data],
      })

      return res.status(200).json({ status: '200', message: 'Success' })
    } else {
      return res
        .status(404)
        .json({ status: '404', message: 'Doctor not found' })
    }
  } catch (error) {
    throw new Error(error)
  }
})

export default handler
