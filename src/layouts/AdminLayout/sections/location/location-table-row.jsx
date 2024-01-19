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
import { deleteLocationAPI, uploadLocationImageApi } from '../../../../apis/locationAPI'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import ModalView from '../modal/modal'
import AddLocation from './add-location/AddLocation'
import UpdateLocation from './update-location/UpdateLocation'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'

// ----------------------------------------------------------------------

export default function LocationTableRow({
  selected,
  id,
  tenViTri,
  tinhThanh,
  quocGia,
  hinhAnh,
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

  const locationInfor = {
    id,
    tenViTri,
    tinhThanh,
    quocGia
  }

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

  const { mutate: deleteLocation, isPending } = useMutation({
    mutationFn: (roomID) => {
      deleteLocationAPI(roomID)
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Xóa vị trí thành công',
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

  const handleDeleteLocation = (locationId) => {
    Swal.fire({
      icon: 'warning',
      title: 'Bạn có chắc chắn muốn xóa vị trí này?',
      confirmButtonText: 'Đồng ý',
      showDenyButton: true,
      denyButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteLocation(locationId)
      }
      return
    })
  }

  const { mutate: handleUploadLocationImage } = useMutation({
    mutationFn: (payload) => {
      uploadLocationImageApi(payload, id)
    },
    onSuccess: () => {
      // Hiển thị thông báo thành công (nếu cần)
      Swal.fire({
        icon: 'success',
        title: 'Thêm ảnh vị trí thành công',
        confirmButtonText: 'Ok luôn',
      }).then((result) => {
        if (result.isConfirmed) {
          queryClient.invalidateQueries('get-list-location')
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
    handleUploadLocationImage(formData)
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

        <TableCell>{tenViTri}</TableCell>
        <TableCell>{tinhThanh}</TableCell>
        <TableCell>{quocGia}</TableCell>

        <TableCell>
            {(checkImageValid(hinhAnh) || file) &&
              <img
                src={file !== '' ? previewImage(file) : hinhAnh}
                alt={tenViTri}
                style={{ width: 100, height: 100, display: 'block', marginBottom: '5px'}}
              />
            }

            {(!file || file.length === 0) && (
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                style={{ width: 100 }}
              >
                Image
                <VisuallyHiddenInput
                  accept=".png, .gif, .jpg"
                  type="file"
                  onChange={handleChangeImg}
                />
              </Button>
            )}

            {file && (
              <>
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
                  style={{ color: 'red' }}
                >
                  Xóa hình
                </Button>
              </>
            )}
        </TableCell>

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
              handleDeleteLocation(id)
            }}
          >
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            Xóa
          </Button>
        </MenuItem>
      </Popover>

      <ModalView open={openModal} handleClose={handleCloseModal}>
        <Typography variant="h4" sx={{ mb: 5, textAlign: 'center' }}>
            Cập nhật thông tin vị trí
        </Typography>
        <UpdateLocation locationInfor={locationInfor} handleClose={handleCloseModal} />
      </ModalView>
    </>
  )
}

LocationTableRow.propTypes = {
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  id: PropTypes.any,
  tenViTri: PropTypes.any,
  tinhThanh: PropTypes.any,
  quocGia: PropTypes.any,
  hinhAnh: PropTypes.any,
}