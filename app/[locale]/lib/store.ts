import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './todosSlice'

// قم بإنشاء الـ store أولاً
const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

// ثم تصدير الـ store
export default store;

// الآن يمكنك تصدير النوع AppDispatch
export type AppDispatch = typeof store.dispatch;
