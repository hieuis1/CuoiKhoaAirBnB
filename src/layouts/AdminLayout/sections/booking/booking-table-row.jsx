import { useState } from 'react'
import PropTypes from 'prop-types'

import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Popover from '@mui/material/Popover'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import Label from '../../components/label/index.js'
import Iconify from '../../components/iconify/index.js'
import { Button, TextField } from '@mui/material'
import ModalView from '../modal/modal.jsx'
import EditBooking from '../booking/edit-booking/index.js'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteBookingApi } from '../../../../apis/bookingAPI.js'
import Swal from 'sweetalert2'
import dayjs from 'dayjs'



// ----------------------------------------------------------------------

export default function BookingTableRow({
  selected,
  id,
  maPhong,
  ngayDen,
  ngayDi,
  soLuongKhach,
  maNguoiDung,
  handleClick,
}) {
  const bookingInfor = {
    id,
    maPhong,
    ngayDen,
    ngayDi,
    soLuongKhach,
    maNguoiDung,
  }
  const [open, setOpen] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const queryClient = useQueryClient()
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setOpen(null)
  }

  const { mutate: deleteBooking, isPending } = useMutation({
    mutationFn: (bookingId) => {
      deleteBookingApi(bookingId)
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Xóa booking thành công',
        confirmButtonText: 'Đồng ý',
      }).then((result) => {
        if (result.isConfirmed) {
          queryClient.invalidateQueries('get-list-booking')
        }
        return
      })
    },
    onError: (error) => {
      console.log('🚀  error:', error)
    },
  })

  const handleDeleteBooking = (bookingId) => {
    Swal.fire({
      icon: 'warning',
      title: 'Bạn có chắc chắn muốn xóa booking này?',
      confirmButtonText: 'Đồng ý',
      showDenyButton: true,
      denyButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBooking(bookingId)
      }
      return
    })
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>{maPhong}</TableCell>

        <TableCell>{dayjs(ngayDen).format('DD-MM-YYYY')}</TableCell>

        <TableCell>{dayjs(ngayDi).format('DD-MM-YYYY')}</TableCell>

        <TableCell>{soLuongKhach}</TableCell>

        <TableCell>{maNguoiDung}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Button fullWidth onClick={handleOpenModal}>
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Edit
          </Button>
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <Button
            sx={{ color: 'error.main' }}
            fullWidth
            onClick={() => {
              handleDeleteBooking(id)
            }}
          >
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            Delete
          </Button>
        </MenuItem>
      </Popover>
      <ModalView open={openModal} handleClose={handleCloseModal}>
        <Typography variant="h4" sx={{ mb: 5, textAlign: 'center' }}>
          Cập nhật thông tin phòng
        </Typography>
        <EditBooking bookingInfor={bookingInfor} handleClose={handleCloseModal}/>
      </ModalView>
    </>
  )
}

BookingTableRow.propTypes = {
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  id: PropTypes.any,
  maPhong: PropTypes.any,
  ngayDen: PropTypes.any,
  ngayDi: PropTypes.any,
  soLuongKhach: PropTypes.any,
  maNguoiDung: PropTypes.string
}
