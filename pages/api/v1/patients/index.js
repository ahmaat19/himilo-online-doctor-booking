import nc from 'next-connect'
import { Prisma, PrismaClient } from '@prisma/client'
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
    Status,
    Date,
    DateAdded,
    AddedBy,
    Booked,
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
        Cost: doctor[0].Cost,
        Tel,
        BookingTel,
        Status,
        Date: moment(Date).format(),
        DateAdded: moment(DateAdded).format(),
        AddedBy,
      }

      // console.log(data)

      const pat = await prisma.$queryRaw(
        Prisma.sql`INSERT INTO DoctorAssignation (PatientID,
          DoctorID,
          UserName,
          PatientType,
          Cost,
          Tel,
          BookingTel,
          Status,
          Date,
          DateAdded,
          AddedBy) VALUES (${PatientID},
            ${DoctorID},
            ${UserName},
            ${PatientType},
            ${doctor[0].Cost},
            ${Tel},
            ${BookingTel},
            ${Status},
           ${Date}, ${DateAdded},
            ${AddedBy})`
      )
      console.log(pat)

      // const patient = await prisma.town.create({
      //   data,
      // })

      return res.status(200).json(pat)
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
