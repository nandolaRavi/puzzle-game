import { configureStore } from '@reduxjs/toolkit'
import shipSlice from './boatSlice'
export const store = configureStore({
    reducer: {
        ship: shipSlice
    },
})
