import Typography from '@mui/material/Typography'
import { PATH } from '../../../../../routes/path'
import { useAuth } from '../../../../../contexts/UserContext/UserContext'
import { Button } from '@mui/material'
import { Navigate, useNavigate } from 'react-router-dom'

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { currentUser, handleLogout } = useAuth()
  const navigate = useNavigate()
  // if (currentUser) {
  //   return <Navigate to={PATH.HOME} />
  // }
  return (
    <>
      <Typography
        variant="subtitle2"
        sx={{ color: '#000', textTransform: 'uppercase' }}
      >
        {currentUser.hoTen}
      </Typography>
      <Button
        variant="outlined"
        sx={{ ml: 1, fontSize: '14px' }}
        onClick={() => {
          handleLogout()
          navigate(PATH.HOME)
        }}
      >
        Log out
      </Button>
    </>
  )
}
