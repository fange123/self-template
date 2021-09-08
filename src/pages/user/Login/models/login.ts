import type { Reducer } from 'umi';
import type { Effect } from 'umi'
import  { history } from 'umi'
import api from '@/services'
import { MS_LOGIN_TOKEN } from '@/utils/constant';

export interface ILoginState {}

export interface ILoginModel {
  state: ILoginState
  effects: {
    authLogin: Effect

  }
  reducers: {
    updateState: Reducer<ILoginState>
  }
}

const {authLogin} = api

const Login: ILoginModel = {
  state: {},
  effects: {
    *authLogin({ payload }, { call }) {
      const response = yield call(authLogin, payload)
      const { token} = response
      if(response){
        window.localStorage.setItem(MS_LOGIN_TOKEN,token)
        history.push('/home')
      }

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

export default Login
