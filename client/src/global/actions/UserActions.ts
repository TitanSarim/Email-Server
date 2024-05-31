import{
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    CLEAR_ERRORS
} from '../constants/UserConstants'
import { Dispatch } from 'redux';
import axios from "axios";
import Cookies from 'js-cookie';

const BASE_URL = "http://localhost:4000"

export interface REGISTER_REQUEST {
  type: typeof REGISTER_REQUEST;
}

export interface REGISTER_SUCCESS {
  type: typeof REGISTER_SUCCESS;
}

export interface REGISTER_FAIL {
  type: typeof REGISTER_FAIL;
}

export interface LOGIN_REQUEST {
  type: typeof LOGIN_REQUEST;
}

export interface LOGIN_SUCCESS {
  type: typeof LOGIN_SUCCESS;
}

export interface LOGIN_FAIL {
  type: typeof LOGIN_FAIL;
}

export interface CLEAR_ERRORS {
  type: typeof CLEAR_ERRORS;
}



interface  RegisterFormData {
  username?: string;
  email?: string;
  password?: string;
}

interface  LoginFormData {
  UsernameOrEmail?: string;
  password?: string;
}

type RegisterDispatchTypes = REGISTER_REQUEST | REGISTER_SUCCESS | REGISTER_FAIL
type LoginDispatchTypes = LOGIN_REQUEST | LOGIN_SUCCESS | LOGIN_FAIL

// USER ACTIONS
export const register = (formData: RegisterFormData) => async (dispatch : Dispatch<RegisterDispatchTypes>) => {
    try {
      dispatch({ type: REGISTER_REQUEST });
  
       const token = Cookies.get('token');
  
      const config = { headers: 
                        { 
                          "Content-Type": "application/json",
                           Authorization: `Bearer ${token}` 
                        }
                      }
  
      const { data } = await axios.post(`${BASE_URL}/api/v1/register`, formData, config);
  
      if(data.token){
        Cookies.set('token', data.token, { expires: 365 });
      }
      
  
      dispatch({ type: REGISTER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error?.response?.data?.message });
    }
  };
  
  export const login = (formData: LoginFormData) => async (dispatch: Dispatch<LoginDispatchTypes>) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
  
     
  
       const token = Cookies.get('token');
  
      const config = { 
        headers: 
        { 
          "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        }
      }
  
      const { data } = await axios.post(`${BASE_URL}/api/v1/login`, formData, config);
  
      if(data.token){
        Cookies.set('token', data.token, { expires: 365 });
      }
  
      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
  };


  export const clearErrors = () => async (dispatch :Dispatch<CLEAR_ERRORS>) => {
    dispatch({ type: CLEAR_ERRORS });
  };