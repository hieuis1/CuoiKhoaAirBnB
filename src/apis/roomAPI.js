import { GROUP_CODE } from '../constants'
import fetcher from './fetcher'

export const getBannersAPI = async () => {
  try {
    const response = await fetcher.get('/QuanLyPhim/LayDanhSachBanner')
    // console.log('response', response)
    return response.data.content // []
  } catch (error) {}
}

export const getListRoomAPI = async () => {
  try {
    const response = await fetcher.get('/phong-thue')
    //console.log('response', response.data.content)
    return response.data.content
  } catch (error) {}
}

export const getRoomDetailsAPI = async (roomID) => {
  try {
    const response = await fetcher.get(`/phong-thue/${roomID}`)
    // console.log('response', response)
    return response.data.content
  } catch (error) {}
}

// ADD room api
export const addRoomAPI = async (payload) => {
  try {
    const response = await fetcher.post(
      '/phong-thue',
      payload
    )
    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}

// DELETE room api
export const deleteRoomAPI = async (roomID) => {
  try {
    const response = await fetcher.delete(`/phong-thue/${roomID}`)
    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}

// UPDATE room api
export const updateRoomAPI = async (payload) => {
  try {
    const response = await fetcher.put(
      `/phong-thue/${payload.id}`,
      payload
    )
    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}

// Upload images room api
export const uploadHinhPhongApi = async (payload, id) => {
  try {
    const response = await fetcher.post(`/phong-thue/upload-hinh-phong?maphong=${id}`, payload
    )
    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}

export const getCommentRoom =async (id) =>{
  try {
    const response = await fetcher.get(`/binh-luan/lay-binh-luan-theo-phong/${id}`
    )
    
    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}
export const postComment = async(payload) =>{
  try {
    const response = await fetcher.post(`/binh-luan`,payload)
    return response
  } catch (error) {
    throw 'Lỗi rồi'
  }
}

export const orderRoomApi = async (payload) =>{
  try {
    const response = await fetcher.post("/dat-phong",payload)
    return response.data.content
  } catch (error) {
    return error
  }
}
export const getOrderRoomApi = async (id) =>{
  try {
    const respone = await fetcher.get(`/dat-phong/lay-theo-nguoi-dung/${id}`)
    return respone.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}
export const upDateOrderRoomApi= async (id,payload) =>{
  try {
    const response = await fetcher.put(`/dat-phong/${id}`,payload)
    return response
  } catch (error) {
    throw 'Lỗi rồi'
  }
}
export const deleteOrderRoomApi = async (id) =>{
  try {
    const respone = await fetcher.delete(`/dat-phong/${id}`)
    return respone
     } catch (error) {
      throw 'Lỗi rồi'
  }

}