import fetcher from './fetcher'

export const getChair = async (showtimesId) => {
  try {
    const response = await fetcher.get('/QuanLyDatVe/LayDanhSachPhongVe/', {
      params: {
        MaLichChieu: showtimesId,
      },
    })
    return response.data.content
  } catch (error) {
    throw 'Lỗi'
  }
}

export const ticketSet = async (ticket) => {
  try {
    const response = await fetcher.post('/QuanLyDatVe/DatVe/', ticket)
    return response.data.content
  } catch (error) {
    throw 'Lỗi'
  }
}

export const createTimeAPI = async (payload) => {
  try {
    const response = await fetcher.post('/QuanLyDatVe/TaoLichChieu', payload)
    return response.data.content
  } catch (error) {
    throw 'Lỗi'
  }
}
