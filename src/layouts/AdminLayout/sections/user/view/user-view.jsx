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

import TableNoData from '../table-no-data'
import UserTableRow from '../user-table-row'
import UserTableHead from '../user-table-head'
import TableEmptyRows from '../table-empty-rows'
import UserTableToolbar from '../user-table-toolbar'
import { emptyRows, applyFilter, getComparator } from '../utils'
import { useQuery } from '@tanstack/react-query'
import { getListUser } from '../../../../../apis/userAPI'
import ModalView from '../../modal/modal'
import AddUser from '../add-user'

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0)

  const [order, setOrder] = useState('asc')

  const [selected, setSelected] = useState([])

  const [orderBy, setOrderBy] = useState('taiKhoan')

  const [filterName, setFilterName] = useState('')

  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { data: userList, isLoading } = useQuery({
    queryKey: ['get-list-user'],
    queryFn: () => getListUser(),
  })

  console.log(userList)

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc'
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(id)
    }
  }
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userList.map((n) => n.taiKhoan)
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
    setRowsPerPage(parseInt(event.target.value, 10))
    console.log(rowsPerPage)
    setPage(0)
  }

  const handleFilterByName = (event) => {
    setPage(0)
    setFilterName(event.target.value)
  }

  const dataUser = applyFilter({
    inputData: userList,
    comparator: getComparator(order, orderBy),
    filterName,
  })

  const notFound = !userList?.length && !!filterName

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Quản lý tài khoản</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpen}
        >
          New User
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        {/* <Scrollbar> */}
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={userList?.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick} 
                headLabel={[
                  { id: 'taiKhoan', label: 'ID' },
                  { id: 'hoTen', label: 'Họ tên' },
                  { id: 'email', label: 'Email' },
                  { id: 'soDT', label: 'Số điện thoại' },
                  { id: 'maLoaiNguoiDung', label: 'Mã loại người dùng' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataUser?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => (
                  <UserTableRow
                    key={index}
                    taiKhoan={user.id}
                    hoTen={user.name}
                    birthday={user.birthday}
                    email={user.email}
                    soDT={user.phone}
                    gender={user.gender}
                    maLoaiNguoiDung={user.role}
                    selected={selected.indexOf(user.id) !== -1}
                    handleClick={(event) => handleClick(event, user.id)}
                  />
                ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, userList?.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        {/* </Scrollbar> */}

        <TablePagination
          page={page}
          component="div"
          count={userList?.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <ModalView open={open} handleClose={handleClose}>
        <Typography variant="h4" sx={{ mb: 5, textAlign: 'center' }}>
          Thêm người dùng
        </Typography>
        <AddUser handleClose={handleClose} />
      </ModalView>
    </Container>
  )
}
