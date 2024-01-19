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

import RoomTableHead from '../room-table-head'
import RoomTableToolbar from '../room-table-toolbar'
import { getListRoomAPI } from '../../../../../apis/roomAPI'
import { applyFilter, getComparator, emptyRows } from '../utils'
import RoomTableRow from '../room-table-row'
import ModalView from '../../modal/modal'
import AddRoom from '../add-room/AddRoom'

const ListRoomView = () => {
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
    data: ListRoom,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['get-list-room'],
    queryFn: getListRoomAPI,
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
      const newSelecteds = ListRoom.map((n) => n.id)
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

  const dataRoom = applyFilter({
    inputData: ListRoom,
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
          <Typography variant="h4">Quản lý phòng</Typography>

          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpen}
          >
            New room
          </Button>
        </Stack>

        <Card>
          <RoomTableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
            <TableContainer sx={{ overflow: 'scrollbar' }}>
              <Table sx={{ minWidth: 800 }}>
                <RoomTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={ListRoom?.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'id', label: 'Mã phòng' },
                    { id: 'tenPhong', label: 'Tên phòng' },
                    { id: 'hinhAnh', label: 'Hình ảnh' },
                    { id: 'maViTri', label: 'Mã Vị trí' },
                    { id: 'khach', label: 'Khách tối đa' },
                    { id: 'giaTien', label: 'Giá tiền' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {dataRoom?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((room, index) => (
                    <RoomTableRow
                      key={index}
                      id={room.id}
                      tenPhong={room.tenPhong}
                      hinhAnh={room.hinhAnh}
                      maViTri={room.maViTri}
                      khach={room.khach}
                      giaTien={room.giaTien}
                      selected={selected.indexOf(room.id) !== -1}
                      handleClick={(event) => handleClick(event, user.id)}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
         

          <TablePagination
            page={page || 0}
            component="div"
            count={ListRoom?.length || 0}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <ModalView open={open} handleClose={handleClose}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Thêm phòng
        </Typography>
        {/* <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
        </Scrollbar> */}
        <AddRoom handleClose={handleClose} />
      </ModalView>
    </>
  )
}

export default ListRoomView
