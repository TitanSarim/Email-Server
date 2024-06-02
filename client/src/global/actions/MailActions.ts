import{
    GET_ALL_CONNECT_MAILS_REQUEST,
    GET_ALL_CONNECT_MAILS_SUCCESS,
    GET_ALL_CONNECT_MAILS_FAIL,
    GET_INBOX_MAILS_REQUEST,
    GET_INBOX_MAILS_SUCCESS,
    GET_INBOX_MAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/MailConstants'
import { Dispatch} from 'redux';
import axios from "axios";
import Cookies from 'js-cookie';

const BASE_URL = "http://localhost:4000"


  export interface GET_ALL_CONNECT_MAILS_REQUEST {
    type: typeof GET_ALL_CONNECT_MAILS_REQUEST;
  }
  
  export interface GET_ALL_CONNECT_MAILS_SUCCESS {
    type: typeof GET_ALL_CONNECT_MAILS_SUCCESS;
  }
  
  export interface GET_ALL_CONNECT_MAILS_FAIL {
    type: typeof GET_ALL_CONNECT_MAILS_FAIL;
  }

  export interface GET_INBOX_MAILS_REQUEST {
    type: typeof GET_INBOX_MAILS_REQUEST;
  }
  
  export interface GET_INBOX_MAILS_SUCCESS {
    type: typeof GET_INBOX_MAILS_SUCCESS;
  }
  
  export interface GET_INBOX_MAILS_FAIL {
    type: typeof GET_INBOX_MAILS_FAIL;
  }

  export interface CLEAR_ERRORS {
    type: typeof CLEAR_ERRORS;
  }

  interface  getAllMailFormData {
    type?: string;
    email?: string;
    password?: string;
  }

type getAllConnetedMailTypes = GET_ALL_CONNECT_MAILS_REQUEST | GET_ALL_CONNECT_MAILS_SUCCESS | GET_ALL_CONNECT_MAILS_FAIL
type getAllMailsTypes = GET_INBOX_MAILS_REQUEST | GET_INBOX_MAILS_SUCCESS | GET_INBOX_MAILS_FAIL
type clearErrorTypes =  CLEAR_ERRORS

export const getAllConnetedMail = () => async (dispatch : Dispatch<getAllConnetedMailTypes>) => {
    try {
      dispatch({ type: GET_ALL_CONNECT_MAILS_REQUEST });
  
       const token = Cookies.get('token');
  
      const config = { headers: 
                        { 
                          "Content-Type": "application/json",
                           Authorization: `Bearer ${token}` 
                        }
                      }
  
      const { data } = await axios.get(`${BASE_URL}/api/v1/connected-emails`, config);
      
  
      dispatch({ type: GET_ALL_CONNECT_MAILS_SUCCESS, payload: data.connectedMails });
    } catch (error) {
      dispatch({ type: GET_ALL_CONNECT_MAILS_FAIL, payload: error?.response?.data?.message });
    }
};

export const getAllMailsforSelected = (formData: getAllMailFormData) => async (dispatch : Dispatch<getAllMailsTypes>) => {

  console.log("formData", formData)

  try {
    dispatch({ type: GET_INBOX_MAILS_REQUEST });

     const token = Cookies.get('token');

    const config = { headers: 
                      { 
                        "Content-Type": "application/json",
                         Authorization: `Bearer ${token}` 
                      }
                    }

    const { data } = await axios.post(`${BASE_URL}/api/v1/all-emails`, formData, config);
    

    dispatch({ type: GET_INBOX_MAILS_SUCCESS, payload: data.allMails });
  } catch (error) {
    dispatch({ type: GET_INBOX_MAILS_FAIL, payload: error?.response?.data?.message });
  }
};


export const clearErrors = () => async (dispatch :Dispatch<clearErrorTypes>) => {
  dispatch({ type: CLEAR_ERRORS });
};