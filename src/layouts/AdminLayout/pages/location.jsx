import React from 'react'
import { Helmet } from 'react-helmet-async'
import { LocationView } from '../sections/location/view'

const LocationPage = () => {
  return (
    <>
      <Helmet>Location</Helmet>
      <LocationView />
    </>
  )
}

export default LocationPage
