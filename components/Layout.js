import Navigation from './Navigation'
import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Himilo Online Doctor Booking</title>
        <meta
          property='og:title'
          content='Himilo Online Doctor Booking'
          key='title'
        />
      </Head>
      <Navigation />
      <div className='container py-2'>{children}</div>
    </>
  )
}
