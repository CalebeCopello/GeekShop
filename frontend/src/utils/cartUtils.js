export const addDecimals = (n) => {
    return (Math.round(n * 100) / 100).toFixed(2)
}

export const updateCart = (state) => {
    //calculate items price
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

    //calculate shipping price, if the order > 400 free : 30
    state.shippingPrice = addDecimals(state.itemsPrice > 400 ? 0 : 30)

    //calculate total
    state.totalPrice = (Number(state.itemsPrice + Number(state.shippingPrice))).toFixed(2)
    localStorage.setItem('cart', JSON.stringify(state))

    return state
}