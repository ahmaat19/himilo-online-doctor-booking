import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import {} from 'react-icons/fa'
import Link from 'next/link'

const CheckOut = () => {
  const router = useRouter()
  console.log(router.query)
  return <div className='text-center'>CheckOut Goes Here...</div>
}

export default CheckOut
