import fetcher from './fetcher'

export const getListLocationAPI = async () => {
  try {
    const response = await fetcher.get('/vi-tri')
    return response.data.content
  } catch (error) {}
}

export const getLocationDetailsAPI = async (roomID) => {
  try {
    const response = await fetcher.get(`/phong-thue/${roomID}`)
    return response.data.content
  } catch (error) {}
}

// ADD room api
export const addLocationAPI = async (payload) => {
  try {
    const response = await fetcher.post(
      '/vi-tri',
      payload
    )
    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}

// DELETE room api
export const deleteLocationAPI = async (roomID) => {
  try {
    const response = await fetcher.delete(`/vi-tri/${roomID}`)
    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}

// UPDATE room api
export const updateLocationAPI = async (payload) => {
  try {
    const response = await fetcher.put(
      `/vi-tri/${payload.id}`,
      payload
    )
    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}

// Upload images room api
export const uploadLocationImageApi = async (payload, id) => {
  try {
    const response = await fetcher.post(`/vi-tri/upload-hinh-vitri?maViTri=${id}`, payload
    )
    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
}

export const getRoomWithLocation = async(id) =>{
  try {
    const response = await fetcher.get("/phong-thue/lay-phong-theo-vi-tri",{
      params:{
        maViTri:id
      }
    })
    return response.data.content
  } catch (error) {
    throw 'Lỗi rồi'
  }
} 