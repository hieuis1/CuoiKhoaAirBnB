import fetcher from './fetcher'

export const getListBooking = async () => {
  try {
    const response = await fetcher.get(
      '/dat-phong'
    )
    return response.data.content
  } catch (error) {
    throw 'Lỗi'
  }
}

export const addUserApi = async (user) => {
  try {
    const response = await fetcher.post('/users', user)
    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}
export const editBookingApi = async (booking) => {
  try {
    const response = await fetcher.put(`/dat-phong/${booking.id}`, booking)
    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}

export const deleteBookingApi = async (bookingId) => {
  try {
    const response = await fetcher.delete(`/dat-phong/${bookingId}`)
    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}
