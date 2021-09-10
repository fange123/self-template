import { Effect, Reducer } from 'umi'
import api from '@/services'

export interface IUserState {
  userInfo:IUserInfo
}

export interface IUserModel {
  state: IUserState
  effects: {
    getUserInfo:Effect
  }
  reducers: {
    updateState: Reducer<IUserState>
  }
}

const {getUserInfo} = api

interface IUserInfo {
  username:string
}

const User: IUserModel = {
  state: {
    userInfo:{} as IUserInfo
  },
  effects: {
    *getUserInfo({ payload, callback }, { call, put }) {
      const response = yield call(getUserInfo, payload)
      if(response){
        yield put({
          type: 'updateState',
          payload: {
            userInfo:response
          }
        })
      }
      callback && callback(response)

    }
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  }
}

export default User
