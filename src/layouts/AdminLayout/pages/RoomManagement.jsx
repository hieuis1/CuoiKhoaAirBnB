import { Helmet } from 'react-helmet-async'

import { RoomView } from '../sections/room-management/view'

// ----------------------------------------------------------------------

export default function RoomManagement() {
  return (
    <>
      <Helmet>
        <title> Room Management </title>
      </Helmet>
        <RoomView />
    </>
  )
}
