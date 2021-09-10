import { IUserInfo } from "@/pages/user/Login/typing"
import { useEffect, useState } from "react"
import {useDispatch} from 'umi'

 function useUserInfo(){
  const dispatch = useDispatch()
   const [currentUserInfo, setCurrentUserInfo] = useState<Partial<IUserInfo>>()
    useEffect( () => {
    dispatch({
      type:'user/getUserInfo',
      callback:(value:Partial<IUserInfo>)=> {
         setCurrentUserInfo(value)
      }
    })

  }, [])
  return {
    ...currentUserInfo
  }
}

export default  useUserInfo
