import { useState } from 'react'
import {
  Button,
  Card,
  Container,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material'
import React from 'react'
import Scrollbar from '../../../components/scrollbar'
import { useQuery } from '@tanstack/react-query'
import Iconify from '../../../components/iconify'

import LocationTableHead from '../location-table-head'
import LocationTableToolbar from '../location-table-toolbar'
import { getListLocationAPI } from '../../../../../apis/locationAPI'
import { applyFilter, getComparator, emptyRows } from '../utils'
import LocationTableRow from '../location-table-row'
import ModalView from '../../modal/modal'
import AddLocation from '../add-location/AddLocation'

const LocationView = () => {
  const [page, setPage] = useState(0)

  const [order, setOrder] = useState('asc')

  const [selected, setSelected] = useState([])

  const [orderBy, setOrderBy] = useState('tenPhim')

  const [filterName, setFilterName] = useState('')

  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const {
    data: ListLocation,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['get-list-location'],
    queryFn: getListLocationAPI,
  })

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc'
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(id)
    }
  }
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = ListLocation.map((n) => n.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setPage(0)
    setRowsPerPage(parseInt(event.target.value, 10))
  }

  const handleFilterByName = (event) => {
    setPage(0)
    setFilterName(event.target.value)
  }

  const dataLocation = applyFilter({
    inputData: ListLocation,
    comparator: getComparator(order, orderBy),
    filterName,
  })

  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4">Quản lý vị trí</Typography>

          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpen}
          >
            New location
          </Button>
        </Stack>

        <Card>
          <LocationTableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
            <TableContainer sx={{ overflow: 'scrollbar' }}>
              <Table sx={{ minWidth: 800 }}>
                <LocationTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={ListLocation?.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'id', label: 'Mã vị trí' },
                    { id: 'tenViTri', label: 'Tên vị trí' },
                    { id: 'tinhThanh', label: 'Tỉnh thành' },
                    { id: 'quocGia', label: 'Quốc gia' },
                    { id: 'hinhAnh', label: 'Hình ảnh' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {dataLocation
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((location, index) => (
                    <LocationTableRow
                      key={index}
                      id={location.id}
                      tenViTri={location.tenViTri}
                      tinhThanh={location.tinhThanh}
                      quocGia={location.quocGia}
                      hinhAnh={location.hinhAnh}
                      selected={selected.indexOf(location.id) !== -1}
                      handleClick={(event) => handleClick(event, location.id)}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
         

          <TablePagination
            page={page || 0}
            component="div"
            count={ListLocation?.length || 0}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <ModalView open={open} handleClose={handleClose}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Thêm vị trí
        </Typography>
        {/* <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
        </Scrollbar> */}
        <AddLocation handleClose={handleClose} />
      </ModalView>
    </>
  )
}

export default LocationView
