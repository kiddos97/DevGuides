import { configureStore } from '@reduxjs/toolkit'
import socialReducer from './features/PostandComments/socialSlice'
import userReducer from './features/user/userSlice';
import searchReducer from './features/search/searchSlice';
import { persistStore, persistReducer } from "redux-persist";
import  messageidSlice  from './features/Message/messageidSlice';
import { combineReducers } from 'redux'
import storage from "redux-persist/lib/storage"

const rootReducer = combineReducers({
  social:socialReducer,
  user:userReducer,
  search:searchReducer,
  message:messageidSlice,
})
const persistConfig = {
  key: "root",
  storage,
  whitelist:['message']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})


export const persistor = persistStore(store)

