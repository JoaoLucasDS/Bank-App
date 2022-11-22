import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    account: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        set(state, action) {
            state.account = action.payload;
        },
        updateBalance(state, action) {
            state.account.balance = action.payload;
        },
        logout(state) {
            state.account = {};
        }
        
    },
});

export const { set, updateBalance, logout } = userSlice.actions;
export default userSlice.reducer;