import { configureStore } from '@reduxjs/toolkit';
import {combineReducers } from "redux"
import {thunk} from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userReducer } from './global/reducers/UserReducer';


const reducer = combineReducers({
    user: userReducer
})


const persistConfig = {
    key: 'root',
    storage,
};


const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({

    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false, // Ignore serializability for now
    }).concat(thunk),

    devTools: process.env.NODE_ENV !== 'production',


})

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch

export default store;