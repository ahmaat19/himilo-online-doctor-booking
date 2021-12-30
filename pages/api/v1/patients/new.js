import nc from 'next-connect'
import { PrismaClient } from '@prisma/client'
import moment from 'moment'

const prisma = new PrismaClient()

const handler = nc()

handler.post(async (req, res) => {
  const {
    Name,
    Gender,
    Age,
    DateUnit,
    Town,
    Tel,
    MaritalStatus,
    City,
    Status,
    Date: AppDate,
    AddedBy,
    DoctorID,
    BookingTel,
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
      const newPatient = {
        PatientID: 'P999922',
        Name,
        Gender,
        Age: Number(Age),
        Town,
        Tel,
        MaritalStatus,
        City,
        DateUnit,
        Date: moment(AppDate).format(),
        DateAdded: new Date(),
        AddedBy,
      }

      await prisma.patients.createMany({
        data: [newPatient],
      })

      const pat = await prisma.patients.findMany({
        where: {
          Name,
          Gender,
          Age: Number(Age),
          Town,
          Tel,
          MaritalStatus,
          City,
          DateUnit,
          AddedBy,
        },
      })
      const data = {
        PatientID: pat[0].PatientID,
        DoctorID,
        UserName: 'Samow',
        PatientType: 'OutPatient',
        Tel,
        BookingTel,
        Cost: doctor[0].Cost,
        Status,
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
