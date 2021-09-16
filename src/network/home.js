import {request} from "./request";

export function homeData(){
    return request({
        url:"/home/multidata"
    })
}

export function getGoodsMessage(type,page){
    return request({
        url:"/home/data",
        // params表示在相应的链接后面添加？type=""&page=
        params:{
            type,
            page
        }
    })
}