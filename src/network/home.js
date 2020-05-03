import {request} from "./request";

export function getHomeMulitData() {
  return request({
    url: '/home/multidata'
  })
}

// export function getRecommendData() {
//   return request({
//     url: '/home/'
//   })
// }
