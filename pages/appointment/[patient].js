import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { FaArrowCircleLeft, FaBook } from 'react-icons/fa'
import Link from 'next/link'

const Appointment = () => {
  const router = useRouter()
  const patient = router.query.patient

  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    try {
      const getDoctors = async () => {
        setLoading(true)
        const { data } = await axios.get(`/api/v1/doctors`)
        setDoctors(await data)
        setLoading(false)
      }
      getDoctors()
    } catch (error) {
      setDoctors([])
      setLoading(false)
    }
  }, [patient])

  return (
    <div>
      <button
        onClick={() => router.back()}
        className='btn btn-primary btn-sm rounded-pill'
      >
        <FaArrowCircleLeft className='mb-1' /> Go Back
      </button>

      {loading ? (
        <div className='text-center' style={{ fontSize: '200px' }}>
          <div className='spinner-border' role='status'></div>
        </div>
      ) : doctors && doctors.total > 0 ? (
        <table className='table table-sm hover bordered table-striped caption-top '>
          <caption>{doctors && doctors.total} doctors were found!</caption>
          <thead>
            <tr>
              <th scope='col'>NAME</th>
              <th scope='col'>SPECIALIZATION</th>
              <th scope='col'>COST</th>
              <th scope='col'>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {doctors &&
              doctors.doctors.map((doctor, index) => (
                <tr key={index}>
                  <td>{doctor.Name}</td>
                  <td>{doctor.Specialization}</td>
                  <td>${doctor.Cost.toFixed(2)}</td>

                  <td>
                    <Link href={`/appointment/${patient}/${doctor.DoctorID}`}>
                      <a className='btn btn-primary btn-sm  shadow-none'>
                        {' '}
                        <FaBook className='mb-1' /> Book Now
                      </a>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        doctors &&
        doctors.length === 0 && (
          <div className='text-center'>
            <span className='text-danger'>No Doctors Found</span>
          </div>
        )
      )}
    </div>
  )
}

export default Appointment
