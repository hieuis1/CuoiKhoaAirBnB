import React, { memo } from 'react'

const Child = () => {
  console.log('child-re-render')
  return <div>Hiển thị chart</div>
}

export default memo(Child)
