import{
    GET_ALL_CONNECT_MAILS_REQUEST,
    GET_ALL_CONNECT_MAILS_SUCCESS,
    GET_ALL_CONNECT_MAILS_FAIL,
    GET_INBOX_MAILS_REQUEST,
    GET_INBOX_MAILS_SUCCESS,
    GET_INBOX_MAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/MailConstants'



export const connectedMailReducer = (state = {connectedMails: []}, action) =>{

    switch(action.type){

        case GET_ALL_CONNECT_MAILS_REQUEST:
            return{
                loading: true,
                isAuthenticated: false,
            }

        case GET_ALL_CONNECT_MAILS_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                connectedMails: action.payload,
            }


        case GET_ALL_CONNECT_MAILS_FAIL:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                connectedMails: null,
                error: action.payload,
            };
        

        case  CLEAR_ERRORS:
            return{
                ...state,
                error: null,
            }

        default:
            return state;    
    }
}

export const getAllMailsReducer = (state = {allMails: []}, action) =>{

    switch(action.type){

        case GET_INBOX_MAILS_REQUEST:
            return{
                loading: true,
                isAuthenticated: false,
            }

        case GET_INBOX_MAILS_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                allMails: action.payload,
            }


        case GET_INBOX_MAILS_FAIL:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                allMails: null,
                error: action.payload,
            };
        

        case  CLEAR_ERRORS:
            return{
                ...state,
                error: null,
            }

        default:
            return state;    
    }
}