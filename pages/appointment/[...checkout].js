import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { FaArrowCircleLeft, FaDollarSign } from 'react-icons/fa'
import Link from 'next/link'
import moment from 'moment'
import { useForm } from 'react-hook-form'
import {
  dynamicInputSelect,
  inputNumber,
  staticInputSelect,
} from '../../utils/dynamicForm'
const CheckOut = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  })
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
  const toUpper = (str) => str.charAt(0) + str.slice(1).toLowerCase()

  const submitHandler = (data) => {
    console.log({ data, patient, doctor })
  }

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
            <button
              onClick={() => router.back()}
              className='btn btn-primary btn-sm rounded-pill'
            >
              <FaArrowCircleLeft className='mb-1' /> Go Back
            </button>

            <div className='row shadow mt-2 rounded-3'>
              <div className='col-12 mx-auto p-3'>
                <hr />
                <div className='row'>
                  <div className='col-md-6 col-12'>
                    <span className='fw-bold'>Patient ID: </span>{' '}
                    {patient.PatientID}
                  </div>
                  <div className='col-md-6 col-12'>
                    <span className='fw-bold'>Patient Name: </span>{' '}
                    {toUpper(patient.Name)}
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
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className='row mt-3'>
                <div className='col-md-4 col-6'>
                  {staticInputSelect({
                    register,
                    errors,
                    label: 'Appointment Date',
                    name: 'appointment',
                    data: [
                      { name: moment(toDay).format('YYYY-MM-DD') },
                      {
                        name: moment(toDay).add(1, 'days').format('YYYY-MM-DD'),
                      },
                    ],
                  })}
                </div>
                <div className='col-md-4 col-6'>
                  {inputNumber({
                    register,
                    errors,
                    label: 'Mobile Number',
                    name: 'mobile',
                  })}
                </div>
                <div className='col-md-4 col-12 mt-2'>
                  <button
                    onClick={() =>
                      alert(
                        `Your have paid $${(doctor.Cost + 1).toFixed(
                          2
                        )} for booking`
                      )
                    }
                    className='btn btn-primary btn-lg mt-3 form-control'
                  >
                    <FaDollarSign className='mb-1' /> Pay Now
                  </button>
                </div>
              </div>
            </form>
          </>
        )
      )}
    </>
  )
}

export default CheckOut
