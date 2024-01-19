import { useState } from 'react'

import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

import Iconify from '../../../components/iconify'
import Scrollbar from '../../../components/scrollbar'

//import TableNoData from '../table-no-data'
import BookingTableRow from '../booking-table-row'
import BookingTableHead from '../booking-table-head'
//import TableEmptyRows from '../table-empty-rows'
import BookingTableToolbar from '../booking-table-toolbar'
import { emptyRows, applyFilter, getComparator } from '../utils'
import { useQuery } from '@tanstack/react-query'
import { getListBooking } from '../../../../../apis/bookingAPI'
import ModalView from '../../modal/modal'
// ----------------------------------------------------------------------

export default function BookingPage() {
  const [page, setPage] = useState(0)

  const [order, setOrder] = useState('asc')

  const [selected, setSelected] = useState([])

  const [orderBy, setOrderBy] = useState('taiKhoan')

  const [filterName, setFilterName] = useState('')

  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { data: bookingList, isLoading } = useQuery({
    queryKey: ['get-list-booking'],
    queryFn: () => getListBooking(),
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
      const newSelecteds = bookingList.map((n) => n.taiKhoan)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, taiKhoan) => {
    const selectedIndex = selected.indexOf(taiKhoan)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, taiKhoan)
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

  const dataBooking = applyFilter({
    inputData: bookingList,
    comparator: getComparator(order, orderBy),
    filterName,
  })

  const notFound = !bookingList?.length && !!filterName

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Quản lý đặt phòng</Typography>
      </Stack>

      <Card>
        <BookingTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        {/* <Scrollbar> */}
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 100 }}>
              <BookingTableHead
                order={order}
                orderBy={orderBy}
                rowCount={bookingList?.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'maPhong', label: 'Mã Phòng' },
                  { id: 'ngayDen', label: 'Ngày đến' },
                  { id: 'ngayDi', label: 'Ngày đi' },
                  { id: 'soLuongKhach', label: 'Số lượng khách' },
                  { id: 'maNguoiDung', label: 'Mã người dùng' },
                  { id: '' }, 
                ]}
              />
              <TableBody>
                {dataBooking?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((booking, index) => (
                  <BookingTableRow
                    key={index}
                    id={booking.id}
                    maPhong={booking.maPhong}
                    ngayDen={booking.ngayDen}
                    ngayDi={booking.ngayDi}
                    soLuongKhach={booking.soLuongKhach}
                    maNguoiDung={booking.maNguoiDung}
                    selected={selected.indexOf(booking.id) !== -1}
                    handleClick={(event) => handleClick(event, booking.id)}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        {/* </Scrollbar> */}

        <TablePagination
          page={page}
          component="div"
          count={bookingList?.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  )
}
