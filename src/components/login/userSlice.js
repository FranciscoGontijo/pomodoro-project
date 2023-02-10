import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            userEmail: ''
        }
    },
    reducers: {
        createUser: (state, action) => {
            state.user.userEmail = action.payload.userEmail;
        }
    }
});

export const { createUser } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;