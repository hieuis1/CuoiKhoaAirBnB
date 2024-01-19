import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/UserContext/UserContext'
import Router from './routes/sections'
import { PATH } from '../../routes/path'

// ----------------------------------------------------------------------
// Xét điều kiện admin
// export default function App() {
//   const { currentUser } = useAuth()
//   if (currentUser && currentUser.role === 'ADMIN') {
//     return <Router />
//   }

//   return <Navigate to={PATH.HOME} />
// }
// ----------------------------------------------------------------------


// Tạm thời chưa xét điều kiện admin
export default function App() {
  return <Router />
}
