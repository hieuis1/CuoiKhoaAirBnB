import React from 'react'
import Header from '../../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'
import { Helmet } from 'react-helmet-async'

const RoomLayout = () => {
  return (
    <>
      {/* <div className="container"> */}
      <Header />
      <Outlet />
      <Footer />
      {/* </div> */}
    </>
  )
}

export default RoomLayout
