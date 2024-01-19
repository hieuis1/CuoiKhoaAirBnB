import React from 'react'
import { Helmet } from 'react-helmet-async'
import { ListRoomView } from '../sections/list-room/view'

const ListRoom = () => {
  return (
    <>
      <Helmet>List room view</Helmet>
      <ListRoomView />
    </>
  )
}

export default ListRoom
