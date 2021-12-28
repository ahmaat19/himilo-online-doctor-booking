import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { FaArrowCircleLeft, FaDollarSign } from 'react-icons/fa'
import Link from 'next/link'
import moment from 'moment'

const CheckOut = () => {
  const router = useRouter()

  const [checkout, setCheckout] = useState({})
  const [loading, setLoading] = useState(false)
  const patientId =
    router.query && router.query.checkout && router.query.checkout[0]
  const doctorId =
    router.query && router.query.checkout && router.query.checkout[1]

  useEffect(() => {
    const getCheckout = async () => {
      setLoading(true)
      const { data } = await axios.get(
        `/api/v1/checkout/${patientId}/${doctorId}`
      )
      setCheckout(await data)
      setLoading(false)
    }
    try {
      if (doctorId && patientId) getCheckout()
    } catch (error) {
      console.error(error.response.data)
      setCheckout([])
      setLoading(false)
    }
  }, [patientId, doctorId])

  const doctor = checkout && checkout.doctor && checkout.doctor[0]
  const patient = checkout && checkout.patient && checkout.patient[0]

  const toDay = new Date()

  return (
    <>
      {loading ? (
        <div className='text-center' style={{ fontSize: '200px' }}>
          <div className='spinner-border' role='status'></div>
        </div>
      ) : (
        patient &&
        doctor && (
          <>
            <div className='row shadow mt-2'>
              <div className='col-md-10 col-12 mx-auto p-3'>
                <hr />
                <div className='row'>
                  <div className='col-md-6 col-12'>
                    <span className='fw-bold'>Patient ID: </span>{' '}
                    {patient.PatientID}
                  </div>
                  <div className='col-md-6 col-12'>
                    <span className='fw-bold'>Patient Name: </span>{' '}
                    {patient.Name}
                  </div>

                  <div className='col-md-6 col-12'>
                    <span className='fw-bold'>Doctor Name: </span> {doctor.Name}
                  </div>
                  <div className='col-md-6 col-12'>
                    <span className='fw-bold'>Doctor Queue No: </span> #
                    {doctor.OnlineDoctorNo}
                  </div>
                </div>
                <hr />

                <div className='row'>
                  <div className='col-md-4 col-12'>
                    <span className='fw-bold'>Ticket Cost: </span> $
                    {doctor.Cost.toFixed(2)}
                  </div>

                  <div className='col-md-4 col-12'>
                    <span className='fw-bold'>Service Cost: </span> $1.00
                  </div>

                  <div className='col-md-4 col-12'>
                    <span className='fw-bold'>Total Cost: </span> $
                    {(doctor.Cost + 1).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-md-4 col-6'>
                <div className='mb-3'>
                  <label htmlFor='mobile' className='form-label'>
                    Appointment Date
                  </label>
                  <select
                    type='number'
                    className='form-select'
                    id='mobile'
                    placeholder='Enter your mobile number'
                  >
                    <option value=''>-----------</option>
                    <option value={moment(toDay).format('YYYY-MM-DD')}>
                      {moment(toDay).format('YYYY-MM-DD')}
                    </option>
                    <option value={moment(toDay).format('YYYY-MM-DD')}>
                      {moment(toDay).add(1, 'days').format('YYYY-MM-DD')}
                    </option>
                  </select>
                </div>
              </div>
              <div className='col-md-4 col-6'>
                <div className='mb-3'>
                  <label htmlFor='mobile' className='form-label'>
                    Mobile Number
                  </label>
                  <input
                    type='number'
                    className='form-control'
                    id='mobile'
                    placeholder='Enter your mobile number'
                  />
                </div>
              </div>
              <div className='col-md-2 col-6 mt-2 '>
                <button
                  onClick={() =>
                    alert(
                      `Your have paid $${(doctor.Cost + 1).toFixed(
                        2
                      )} for booking`
                    )
                  }
                  className='btn btn-dark btn sm mt-4 form-control'
                >
                  <FaDollarSign className='mb-1' /> Pay Now
                </button>
              </div>
              <div className='col-md-2 col-6 mt-2 '>
                <button
                  onClick={() => router.back()}
                  className='btn btn-secondary btn sm mt-4 form-control'
                >
                  <FaArrowCircleLeft className='mb-1' /> Go Back
                </button>
              </div>
            </div>
          </>
        )
      )}
    </>
  )
}

export default CheckOut
