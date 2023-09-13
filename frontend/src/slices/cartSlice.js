import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cartItems: []}

const addDecimals = (n) => {
    return (Math.round(n * 100) / 100).toFixed(2)
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload

            const existItem = state.cartItems.find((i) => i._id === item._id)

            if (existItem) {
                state.cartItems = state.cartItems.map((i) => i._id === existItem._id ? item : i)
            } else {
                state.cartItems = [...state.cartItems, item]
            }

            //calculate items price
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

            //calculate shipping price, if the order > 400 free : 30
            state.shippingPrice = addDecimals(state.itemsPrice > 400 ? 0 : 30)

            //calculate total
            state.totalPrice = (Number(state.itemsPrice + Number(state.shippingPrice))).toFixed(2)
            localStorage.setItem('cart', JSON.stringify(state))
        }
    }
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer