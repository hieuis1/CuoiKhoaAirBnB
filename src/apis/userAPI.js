
import { GROUP_CODE } from '../constants'
import fetcher from './fetcher'

export const getListUser = async () => {
  try {
    const response = await fetcher.get(
      '/users'
    )
    return response.data.content
  } catch (error) {
    throw 'Lỗi'
  }
}
export const signupAPI = async (payload) => {
  try {
    // console.log(payload)
    // payload: {taiKhoan: "", ...}
    const response = await fetcher.post('/auth/signup', payload)
    return response.data.content
  } catch (error) {
    return error
  }
}

export const signinAPI = async (payload) => {
  try {
    const response = await fetcher.post('/auth/signin', payload)
    return response.data.content
  } catch (error) {
    return error;
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
export const editUserApi = async (user) => {
  try {
    const response = await fetcher.put(`/users/${user.id}`, user)
    return response.data.content
   
  } catch (error) {
    throw 'Lỗi rồi'
  }
}

export const deleteUserApi = async (userID) => {
  try {
    debugger
    const response = await fetcher.delete(`/users`,
    {
      params: {
        id: userID,
      },
    })
    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}

export const infoUserAPI = async (userId) => {
  try {
    const response = await fetcher.post(
      '/QuanLyNguoiDung/LayThongTinNguoiDung',
      null,
      {
        params: {
          taiKhoan: userId,
        },
      }
    )
    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}

export const getInforUserApi = async(id) =>{
  try {
    const respone = await fetcher.get(`/users/${id}`)
    return  respone.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}

export const uploadAvatarApi = async (payload) =>{
 
  try {
    const data = new FormData()
    data.append("formFile",payload)
    const respone = await fetcher.post("/users/upload-avatar",data)
    return respone.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}