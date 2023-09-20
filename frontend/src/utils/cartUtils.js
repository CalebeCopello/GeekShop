export const updateCart = (state) => {
    //calculate items price
    state.itemsPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)

    //calculate shipping price, if the order > 400 free : 30
    state.shippingPrice = state.itemsPrice > 400 ? 0 : 30

    //calculate total
    state.totalPrice = (Number(state.itemsPrice + Number(state.shippingPrice)))
    localStorage.setItem('cart', JSON.stringify(state))

    return state
}