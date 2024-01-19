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
import Box from '@mui/material/Box'

import Label from '../../components/label'
import Iconify from '../../components/iconify'
import { Button } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteRoomAPI, uploadHinhPhongApi } from '../../../../apis/roomAPI'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import ModalView from '../modal/modal'
import AddRoom from './add-room/AddRoom'
import UpdateRoom from './update-room/UpdateRoom'
import CreateTimeRoom from './create-time-room'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'

// ----------------------------------------------------------------------

export default function RoomTableRow({
  selected,
  id,
  tenPhong,
  hinhAnh,
  maViTri,
  khach,
  giaTien,
  handleClick,
}) {
  const [selectedModal, setSelectedModal] = useState(null)

  const [openMenu, setOpenMenu] = useState(null)

  const queryClient = useQueryClient()

  const [openModal, setOpenModal] = useState(false)
  const [file, setFile] = useState('')

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  })

  const handleOpenModal = (modalType) => {
    setOpenModal(true)
    setSelectedModal(modalType)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedModal(null)
  }

  const handleOpenMenu = (event) => {
    setOpenMenu(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setOpenMenu(null)
  }

  const { mutate: deleteRoom, isPending } = useMutation({
    mutationFn: (roomID) => {
      deleteRoomAPI(roomID)
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Xóa phòng thành công',
        confirmButtonText: 'Đồng ý',
      }).then((result) => {
        if (result.isConfirmed) {
          queryClient.invalidateQueries('get-list-room')
        }
        return
      })
    },
    onError: (error) => {
      console.log('🚀  error:', error)
    },
  })

  const handleDeleteRoom = (roomID) => {
    Swal.fire({
      icon: 'warning',
      title: 'Bạn có chắc chắn muốn xóa phòng này?',
      confirmButtonText: 'Đồng ý',
      showDenyButton: true,
      denyButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRoom(roomID)
      }
      return
    })
  }

  const { mutate: handleUploadHinhPhong } = useMutation({
    mutationFn: (payload) => {
      uploadHinhPhongApi(payload, id)
    },
    onSuccess: () => {
      // Hiển thị thông báo thành công (nếu cần)
      Swal.fire({
        icon: 'success',
        title: 'Thêm hình thành công',
        confirmButtonText: 'Ok luôn',
      }).then((result) => {
        if (result.isConfirmed) {
          queryClient.invalidateQueries('get-list-room')
          setFile('')
        }
      })
    },
  })

  const onSubmitUpload = () => {
    const formData = new FormData()
    if (file !== ''){
      formData.append('formFile', file)
    }
    handleUploadHinhPhong(formData)
  }

  const handleChangeImg = (e) => {
    setFile(e.target.files[0])
  }

  const previewImage = (file) => {
    if (file instanceof File || file instanceof Blob) {
      return URL.createObjectURL(file)
    } else if (typeof file === 'string') {
      return file 
    } else {
      return '' 
    }
  }

  function checkImageValid(chuoi) {
    const regexp = /\.(png|gif|jpg)$/i; 
    return regexp.test(chuoi);
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell width={100}>{id}</TableCell>

        <TableCell>{tenPhong}</TableCell>

        <TableCell>
          {(checkImageValid(hinhAnh) || file)&&
            <img
              src={file !== '' ? previewImage(file) : hinhAnh}
              alt={tenPhong}
              style={{ width: 160, height: 50 , display: 'block'}}
            />
          }


          {(!file || file.length === 0) && (
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              style={{ marginTop: 5, width: 160 }}
            >
              Upload file
              <VisuallyHiddenInput
                accept=".png, .gif, .jpg"
                type="file"
                onChange={handleChangeImg}
              />
            </Button>
          )}

          {file && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
              </Box>
              <Button 
                onClick={() => {
                  onSubmitUpload()
                }}
              >
                Lưu hình 
              </Button> |
              <Button
                onClick={() => {
                  setFile('')
                }}
                style={{color: 'red'}}
              >
                Xóa hình
              </Button>
            </>
          )}

        </TableCell>

        <TableCell>{maViTri}</TableCell>

        <TableCell>{khach}</TableCell>

        <TableCell>{giaTien}</TableCell>



        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openMenu}
        anchorEl={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Button
            fullWidth
            onClick={() => {
              handleOpenModal('update')
            }}
          >
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Sửa
          </Button>
        </MenuItem>

        <MenuItem onClick={handleCloseMenu}>
          <Button
            sx={{ color: 'error.main' }}
            fullWidth
            onClick={() => {
              handleDeleteRoom(id)
            }}
          >
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            Xóa
          </Button>
        </MenuItem>
      </Popover>

      <ModalView open={openModal} handleClose={handleCloseModal}>
        <Typography variant="h4" sx={{ mb: 5, textAlign: 'center' }}>
            Cập nhật thông tin phòng
        </Typography>
        {selectedModal === 'update' ? (
          <UpdateRoom id={id} handleClose={handleCloseModal} />
        ) : (
          <CreateTimeRoom handleClose={handleCloseModal} id={id} />
        )}
      </ModalView>
    </>
  )
}

RoomTableRow.propTypes = {
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  maLoaiNguoiDung: PropTypes.any,
  matKhau: PropTypes.any,
  soDT: PropTypes.any,
  taiKhoan: PropTypes.any,
  hoTen: PropTypes.any,
  email: PropTypes.string,
}