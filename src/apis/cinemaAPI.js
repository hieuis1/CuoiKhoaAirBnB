import fetcher from './fetcher'

export const getRoomShowTimes = async (roomID) => {
  try {
    const response = await fetcher.get('/QuanLyRap/LayThongTinLichChieuPhim', {
      params: {
        MaPhim: roomID,
      },
    })
    // console.log('response', response)
    return response.data.content
  } catch (error) {
    throw 'Lỗi'
  }
}

export const getInfoCinemaSystem = async () => {
  try {
    const response = await fetcher.get('/QuanLyRap/LayThongTinHeThongRap')
    // console.log('response', response)
    return response.data.content
  } catch (error) {
    throw 'Lỗi'
  }
}

export const getInfoCinemaBySystem = async (maHeThongRap) => {
  try {
    const response = await fetcher.get(
      '/QuanLyRap/LayThongTinCumRapTheoHeThong',
      {
        params: {
          maHeThongRap,
        },
      }
    )
    return response.data.content
  } catch (error) {
    throw 'Lỗi'
  }
}
