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
import { editUserApi, infoUserAPI } from '../../../../../apis/userAPI'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object({
  name: yup
    .string()
    .required('Vui lòng nhập thông tin'),
  email: yup.string().required('Vui lòng nhập thông tin'),
  phone: yup.string()
    .matches(/^[0-9]+$/, 'Số điện thoại chỉ được chứa các ký tự số')
    .min(10, 'Số điện thoại phải có ít nhất 10 số')
    .max(12, 'Số điện thoại không được quá 12 số')
    .required('Vui lòng nhập số điện thoại'),
  birthday: yup.date().required('Vui lòng nhập thông tin'),
})

const editUser = ({handleClose, userInfor }) => {
  const queryClient = useQueryClient()
  const [gender, setGender] = useState(userInfor.gender);
  const { handleSubmit, register, control, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      id: userInfor.taiKhoan || '',
      email: userInfor.email || '',
      phone: userInfor.soDt || '',
      role: userInfor.maLoaiNguoiDung.toLowerCase() || 'user',
      name: userInfor.hoTen || '',
      gender: userInfor.gender,
      birthday: userInfor.birthday || ''
    },
    resolver: yupResolver(schema),
  })
  useEffect(() => {
    setValue('email', userInfor.email || '')
    setValue('phone', userInfor.soDT || '')
    setValue('role', userInfor.maLoaiNguoiDung.toLowerCase() || '')
    setValue('name', userInfor.hoTen || '')
    setValue('birthday', userInfor.birthday || '')
  }, [userInfor, setValue, control])

  const { mutate: handleEditUser, isPending } = useMutation({
    mutationFn: (payload) => {
      editUserApi(payload)
    },
    onSuccess: () => {
      handleClose()

      Swal.fire({
        icon: 'success',
        title: 'Cập nhật người dùng thành công',
        confirmButtonText: 'Ok luôn',
      }).then((result) => {
        if (result.isConfirmed) {
          queryClient.invalidateQueries('get-list-user')
        }
      })
    },
  })
  const onSubmit = (userInfor) => {
    handleEditUser(userInfor)
  }

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

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
                  label="Tài khoản"
                  fullWidth
                  disabled
                  {...register('id')}
                />
                <TextField label="Họ tên" fullWidth {...register('name')}
                  error={Boolean(errors.name)}
                  helperText={
                    Boolean(errors.name) && errors.name.message
                  }
                />

                <FormLabel component="legend">Giới tính</FormLabel>
                <RadioGroup value={gender ? 'female' : 'male'} onChange={handleGenderChange} row>
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>

                <Controller
                  control={control}
                  name="birthday"
                  error={Boolean(errors.birthday)}
                  helperText={
                    Boolean(errors.birthday) && errors.birthday.message
                  }
                  render={(field) => {
                    return (
                      <DatePicker
                        label="Ngày sinh"
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
                          setValue('birthday', formattedDate)
                        }}
                        {...field}
                      />
                    )
                  }}
                />                
                <TextField label="Email" fullWidth {...register('email')}
                  error={Boolean(errors.email)}
                  helperText={
                    Boolean(errors.email) && errors.email.message
                  }
                />
                <TextField
                  label="Số điện thoại"
                  fullWidth
                  error={Boolean(errors.phone)}
                  helperText={
                    Boolean(errors.phone) && errors.phone.message
                  }
                  {...register('phone')}
                />

                <Controller
                  control={control}
                  name="role"
                  render={({ field }) => {
                    return (
                      <TextField
                        select
                        fullWidth
                        label="Loại người dùng"
                        {...field}
                      >
                        <MenuItem value="admin">Quản Trị</MenuItem>
                        <MenuItem value="user">Khách Hàng</MenuItem>
                      </TextField>
                    )
                  }}
                />

                <LoadingButton
                  loading={isPending}
                  variant="contained"
                  size="large"
                  type="submit"
                >
                  Cập nhật người dùng
                </LoadingButton>
              </Stack>
            </form>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  )
}

export default editUser
