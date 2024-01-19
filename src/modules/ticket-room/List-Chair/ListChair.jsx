import React from 'react'
import Chair from './Chair'
import { useQuery } from '@tanstack/react-query'
import { Container, Box, Typography, Stack, Grid } from '@mui/material'
const ListChair = ({ chair }) => {
  return (
    <Box>
      <Box
        sx={{
          background: '#333',
          marginBottom: 3,
          height: '50px',
          color: '#FFF',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant={'h4'}>SCREEN</Typography>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(16, 1fr)',
          gap: '10px',
        }}
      >
        {chair &&
          chair.map((ghe) => {
            return <Chair ghe={ghe} key={ghe.maGhe} />
          })}
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '20px 0',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box className="Chair booked">X</Box>Đã đặt
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            margin: '0 50px',
            alignItems: 'center',
          }}
        >
          <Box className="Chair regularChair"></Box>Thường{' '}
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box className="Chair vipChair"></Box>Vip{' '}
        </Box>
      </Box>
    </Box>
  )
}

export default ListChair
