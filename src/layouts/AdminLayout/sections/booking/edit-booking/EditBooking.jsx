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
  MenuItem,
  RadioGroup,
  Radio,
  FormLabel
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { styled } from '@mui/material/styles'
import { useForm, Controller } from 'react-hook-form'
import dayjs from 'dayjs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LoadingButton } from '@mui/lab'
import { GROUP_CODE } from '../../../../../constants'
import Swal from 'sweetalert2'
import { editBookingApi } from '../../../../../apis/bookingAPI'

const editBooking = ({handleClose, bookingInfor }) => {
  const queryClient = useQueryClient()
  const [gender, setGender] = useState('');
  const { handleSubmit, register, control, setValue, watch, formState: { errors },} = useForm({
    defaultValues: {
      id: bookingInfor.id,
      maPhong: bookingInfor.maPhong || 0 ,
      ngayDen: bookingInfor.ngayDen || '',
      ngayDi: bookingInfor.ngayDi || '',
      soLuongKhach: bookingInfor.soLuongKhach || 0,
      maNguoiDung: bookingInfor.maNguoiDung || 0,
    }, 
  })

  useEffect(() => {
    setValue('maPhong', bookingInfor.maPhong || 0)
    setValue('ngayDen', bookingInfor.ngayDen || '')
    setValue('ngayDi', bookingInfor.ngayDi || '')
    setValue('soLuongKhach', bookingInfor.soLuongKhach || 0)
    setValue('maNguoiDung', bookingInfor.maNguoiDung || 0)
  }, [bookingInfor, setValue, control])

  const { mutate: handleEditBooking, isPending } = useMutation({
    mutationFn: (payload) => {
      editBookingApi(payload)
    },
    onSuccess: () => {
      handleClose()

      Swal.fire({
        icon: 'success',
        title: 'Cập nhật đặt phòng thành công',
        confirmButtonText: 'Ok luôn',
      }).then((result) => {
        if (result.isConfirmed) {
          queryClient.invalidateQueries('get-list-booking')
        }
      })
    },
  })
  const onSubmit = (bookingInfor) => {
    handleEditBooking(bookingInfor)
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
                <TextField label="Mã phòng" fullWidth disabled {...register('maPhong')}
                />
                <TextField label="Mã người dùng" fullWidth disabled {...register('maNguoiDung')} />


                <Controller
                  control={control}
                  name="ngayDen"
                  render={(field) => {
                    return (
                      <DatePicker
                        label="Ngày đến"
                        format="DD/MM/YYYY"
                        views={[
                          'day',
                          'month',
                          'year'
                        ]}
                        onChange={(date) => {
                          const formattedDate = dayjs(date).format(
                            'DD/MM/YYYY'
                          )
                          setValue('ngayDen', formattedDate)
                        }}
                        {...field}
                      />
                    )
                  }}
                />                
                <Controller
                  control={control}
                  name="ngayDi"
                  render={(field) => {
                    return (
                      <DatePicker
                        label="Ngày đi"
                        format="DD/MM/YYYY"
                        views={[
                          'day',
                          'month',
                          'year'
                        ]}
                        onChange={(date) => {
                          const formattedDate = dayjs(date).format(
                            'DD/MM/YYYY'
                          )
                          setValue('ngayDi', formattedDate)
                        }}
                        {...field}
                      />
                    )
                  }}
                />                
                <TextField label="Số lượng khách" fullWidth {...register('soLuongKhach')} />

                <LoadingButton
                  loading={isPending}
                  variant="contained"
                  size="large"
                  type="submit"
                >
                  Cập nhật đặt phòng
                </LoadingButton>
              </Stack>
            </form>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  )
}

export default editBooking
