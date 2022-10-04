import axios from "axios";

let instance = axios.create({
    timeout:12000
})

instance.interceptors.request.use(config=>{
    let authorization = localStorage.getItem('jwt')
    if(authorization){
        config.headers['authorization'] = authorization
    }
    return config
})
instance.interceptors.response.use(config=>{
    if(config.data.context){
        localStorage.setItem('jwt',config.data.context.jwt)
    }
    return config
})
export default instance

