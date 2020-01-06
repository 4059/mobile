import axios from 'axios'
import jsonBig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
request.defaults.transformResponse = [
  data => {
    try {
      return jsonBig.parse(data)
    } catch {
      return {}
    }
  }
]
export default request
