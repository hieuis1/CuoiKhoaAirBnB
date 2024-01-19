import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import {
  Box,
  Grid,
  Stack,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Switch,
  Checkbox,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { styled } from '@mui/material/styles'
import { useForm, Controller } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LoadingButton } from '@mui/lab'
import { addRoomAPI } from '../../../../../apis/roomAPI'
import Swal from 'sweetalert2'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object({
  tenPhong: yup.string().required('Vui lòng nhập thông tin'),
  khach: yup.string().matches(/^[0-9]+$/, 'Chỉ được chứa các ký tự số'),
  phongNgu: yup.string().matches(/^[0-9]+$/, 'Chỉ được chứa các ký tự số'),
  giuong: yup.string().matches(/^[0-9]+$/, 'Chỉ được chứa các ký tự số'),
  phongTam: yup.string().matches(/^[0-9]+$/, 'Chỉ được chứa các ký tự số'),
  moTa: yup.string().required('Vui lòng nhập thông tin'),
  giaTien: yup.string().matches(/^[0-9]+$/, 'Chỉ được chứa các ký tự số'),
})

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

const AddRoom = ({ handleClose }) => {
  const queryClient = useQueryClient()
  const { handleSubmit, register, control, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      id: 0,
      tenPhong: '',
      khach: 0,
      phongNgu: 0,
      giuong: 0,
      phongTam: '',
      moTa: '',
      giaTien: '',
      mayGiat: false,
      banLa: false,
      tivi: false,
      dieuHoa: false,
      wifi: false,
      bep: false,
      doXe: false,
      hoBoi: false,
      banUi: false,
      maViTri: 0,
      hinhAnh: 'string',
    },
    resolver: yupResolver(schema),
  })

  const { mutate: handleAddRoom, isPending } = useMutation({
    mutationFn: (payload) => {
      addRoomAPI(payload)
    },
    onSuccess: () => {
      handleClose()

      // Hiển thị thông báo thành công (nếu cần)
      Swal.fire({
        icon: 'success',
        title: 'Thêm phòng thành công',
        confirmButtonText: 'Ok luôn',
      }).then((result) => {
        if (result.isConfirmed) {
          queryClient.invalidateQueries('get-list-room')
        }
      })
    },
  })

  const onSubmit = (values) => {
    handleAddRoom(values)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Grid
          container
          justifyContent={'center'}
          alignItems={'center'}
          spacing={3}
        >
          <Grid item md={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2} direction={'column'}>
                <TextField
                  label="Tên phòng"
                  fullWidth
                  error={Boolean(errors.tenPhong)}
                  helperText={
                    Boolean(errors.tenPhong) && errors.tenPhong.message
                  }
                  {...register('tenPhong')}
                />

                <Stack direction={'row'} spacing={2} alignItems="center">
                  <TextField label="Khách tối đa" fullWidth {...register('khach')}
                    error={Boolean(errors.khach)}
                    helperText={
                      Boolean(errors.khach) && errors.khach.message
                    } 
                    />
                  <TextField label="Phòng ngủ" fullWidth {...register('phongNgu')}
                    error={Boolean(errors.phongNgu)}
                    helperText={
                      Boolean(errors.phongNgu) && errors.phongNgu.message
                    }
                  />
                </Stack>

                <Stack direction={'row'} spacing={2} alignItems="center">
                  <TextField label="Giường" fullWidth {...register('giuong')}
                    error={Boolean(errors.giuong)}
                    helperText={
                      Boolean(errors.giuong) && errors.giuong.message
                    }
                  />
                  <TextField label="Phòng tắm" fullWidth {...register('phongTam')}
                    error={Boolean(errors.phongTam)}
                    helperText={
                      Boolean(errors.phongTam) && errors.phongTam.message
                    }
                  />
                </Stack>

                <TextField label="Mô tả" fullWidth {...register('moTa')}
                  error={Boolean(errors.moTa)}
                  helperText={
                    Boolean(errors.moTa) && errors.moTa.message
                  }
                />
                <TextField label="Giá tiền" fullWidth {...register('giaTien')}
                  error={Boolean(errors.giaTien)}
                  helperText={
                    Boolean(errors.giaTien) && errors.giaTien.message
                  }
                />

                <Stack direction={'row'} spacing={2} alignItems="center">
                  <Stack direction={'row'} spacing={1} alignItems="center">
                    <Typography component={'h2'}>Máy giặt</Typography>
                    <Controller
                      control={control}
                      name="mayGiat"
                      render={() => {
                        return (
                          <Checkbox
                            checked={watch('mayGiat')}
                            onChange={(event) => {
                              setValue('mayGiat', event.target.checked)
                            }}
                          />
                        )
                      }}
                    />
                  </Stack>

                  <Stack direction={'row'} spacing={1} alignItems="center">
                    <Typography component={'h2'}>Bàn là</Typography>
                    <Controller
                      control={control}
                      name="banLa"
                      render={() => {
                        return (
                          <Checkbox
                            checked={watch('banLa')}
                            onChange={(event) => {
                              setValue('banLa', event.target.checked)
                            }}
                          />
                        )
                      }}
                    />
                  </Stack>

                  <Stack direction={'row'} spacing={1} alignItems="center">
                    <Typography component={'h2'}>Tivi</Typography>
                    <Controller
                      control={control}
                      name="tivi"
                      render={() => {
                        return (
                          <Checkbox
                            checked={watch('tivi')}
                            onChange={(event) => {
                              setValue('tivi', event.target.checked)
                            }}
                          />
                        )
                      }}
                    />
                  </Stack>
                </Stack>

                <Stack direction={'row'} spacing={2} alignItems="center">
                  <Stack direction={'row'} spacing={1} alignItems="center">
                      <Typography component={'h2'}>Điều hoà</Typography>
                      <Controller
                        control={control}
                        name="dieuHoa"
                        render={() => {
                          return (
                            <Checkbox
                              checked={watch('dieuHoa')}
                              onChange={(event) => {
                                setValue('dieuHoa', event.target.checked)
                              }}
                            />
                          )
                        }}
                      />
                  </Stack>

                  <Stack direction={'row'} spacing={1} alignItems="center">
                      <Typography component={'h2'}>Wifi</Typography>
                      <Controller
                        control={control}
                        name="wifi"
                        render={() => {
                          return (
                            <Checkbox
                              checked={watch('wifi')}
                              onChange={(event) => {
                                setValue('wifi', event.target.checked)
                              }}
                            />
                          )
                        }}
                      />
                  </Stack>

                  <Stack direction={'row'} spacing={1} alignItems="center">
                      <Typography component={'h2'}>Bếp</Typography>
                      <Controller
                        control={control}
                        name="bep"
                        render={() => {
                          return (
                            <Checkbox
                              checked={watch('bep')}
                              onChange={(event) => {
                                setValue('bep', event.target.checked)
                              }}
                            />
                          )
                        }}
                      />
                  </Stack>
                </Stack>

                <Stack direction={'row'} spacing={2} alignItems="center">
                  <Stack direction={'row'} spacing={1} alignItems="center">
                      <Typography component={'h2'}>Đỗ xe</Typography>
                      <Controller
                        control={control}
                        name="doXe"
                        render={() => {
                          return (
                            <Checkbox
                              checked={watch('doXe')}
                              onChange={(event) => {
                                setValue('doXe', event.target.checked)
                              }}
                            />
                          )
                        }}
                      />
                  </Stack>

                  <Stack direction={'row'} spacing={1} alignItems="center">
                      <Typography component={'h2'}>Hồ bơi</Typography>
                      <Controller
                        control={control}
                        name="hoBoi"
                        render={() => {
                          return (
                            <Checkbox
                              checked={watch('hoBoi')}
                              onChange={(event) => {
                                setValue('hoBoi', event.target.checked)
                              }}
                            />
                          )
                        }}
                      />
                  </Stack>

                  <Stack direction={'row'} spacing={1} alignItems="center">
                      <Typography component={'h2'}>Bàn ủi</Typography>
                      <Controller
                        control={control}
                        name="banUi"
                        render={() => {
                          return (
                            <Checkbox
                              checked={watch('banUi')}
                              onChange={(event) => {
                                setValue('banUi', event.target.checked)
                              }}
                            />
                          )
                        }}
                      />
                  </Stack>
                </Stack>

                <TextField label="Mã vị trí" fullWidth {...register('maViTri')} />

                <LoadingButton
                  loading={isPending}
                  variant="contained"
                  size="large"
                  type="submit"
                >
                  Thêm phòng
                </LoadingButton>
              </Stack>
            </form>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  )
}

export default AddRoom
