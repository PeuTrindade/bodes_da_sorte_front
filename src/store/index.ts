import { configureStore } from '@reduxjs/toolkit';
import betReducer from './betSlice';

const store = configureStore({
    reducer: {
        bets: betReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
