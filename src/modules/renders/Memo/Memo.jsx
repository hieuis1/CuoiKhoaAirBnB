import React, { useState, useMemo } from 'react'
import { Button, Typography, Box } from '@mui/material'
import Child from './child'

const Memo = () => {
  console.log('parent re render')
  const [count, setCount] = useState(1)
  const [like, setLike] = useState(false)
  return (
    <div style={{ marginBottom: '200px' }}>
      <Button
        variant="contained"
        onClick={() => {
          return setCount(count + 1)
        }}
      >
        Tăng
      </Button>
      <Typography sx={{ fontSize: 20, fontWeight: 700, color: 'red' }}>
        {count}
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          return setCount(count - 1)
        }}
      >
        giảm
      </Button>

      <Box>
        <Button
          variant="contained"
          onClick={() => {
            return setLike(true)
          }}
        >
          Like
        </Button>
        <Typography sx={{ fontSize: 20, fontWeight: 700, color: 'red' }}>
          {like ? 'đã like' : 'Chưa like'}
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            return setLike(false)
          }}
        >
          Unlike
        </Button>
      </Box>

      <Child />
    </div>
  )
}

export default Memo
