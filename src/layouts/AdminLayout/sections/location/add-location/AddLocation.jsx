import React, { useEffect, useState } from 'react'
import {
  Box,
  Grid,
  Stack,
  TextField,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useForm, Controller } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LoadingButton } from '@mui/lab'
import { addLocationAPI } from '../../../../../apis/locationAPI'
import Swal from 'sweetalert2'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object({
  tenViTri: yup.string().required('Vui lòng nhập thông tin'),
  tinhThanh: yup.string().required('Vui lòng nhập thông tin'),
  quocGia: yup.string().required('Vui lòng nhập thông tin'),
})

const AddLocation = ({ handleClose }) => {
  const queryClient = useQueryClient()
  const { handleSubmit, register, control, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      id: 0,
      ç: '',
      tinhThanh: '',
      quocGia: '',
      hinhAnh: ''
    },
    resolver: yupResolver(schema),
  })

  const { mutate: handleAddLocation, isPending } = useMutation({
    mutationFn: (payload) => {
      addLocationAPI(payload)
    },
    onSuccess: () => {
      handleClose()

      // Hiển thị thông báo thành công (nếu cần)
      Swal.fire({
        icon: 'success',
        title: 'Thêm vị trí thành công',
        confirmButtonText: 'Ok luôn',
      }).then((result) => {
        if (result.isConfirmed) {
          queryClient.invalidateQueries('get-list-location')
        }
      })
    },
  })

  const onSubmit = (values) => {
    handleAddLocation(values)
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
                  label="Tên vị trí"
                  fullWidth
                  {...register('tenViTri')}
                  error={Boolean(errors.tenViTri)}
                  helperText={
                    Boolean(errors.tenViTri) && errors.tenViTri.message
                  }
                />
                <TextField l
                  abel="Tỉnh thành"
                  fullWidth
                  {...register('tinhThanh')}
                  error={Boolean(errors.tinhThanh)}
                  helperText={
                    Boolean(errors.tinhThanh) && errors.tinhThanh.message
                  }
                />
                <TextField
                  label="Quốc gia"
                  fullWidth
                  {...register('quocGia')}
                  error={Boolean(errors.quocGia)}
                  helperText={
                    Boolean(errors.quocGia) && errors.quocGia.message
                  }
                />

                <LoadingButton
                  loading={isPending}
                  variant="contained"
                  size="large"
                  type="submit"
                >
                  Thêm vị trí
                </LoadingButton>
              </Stack>
            </form>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  )
}

export default AddLocation
