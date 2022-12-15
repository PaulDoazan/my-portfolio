import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
// import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface PostState {
  postState: 'string' | null;
}

// Initial state
const initialState: PostState = {
  postState: null,
};

// Actual Slice
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {

    // Action to set the authentication status
    setPostState(state, action) {
      state.postState = action.payload;
    },

    // // Special reducer for hydrating the state. Special case for next-redux-wrapper
    // extraReducers: {
    //   [HYDRATE]: (state, action) => {
    //     return {
    //       ...state,
    //       ...action.payload.post,
    //     };
    //   },
    // },

  },
});

export const { setPostState } = postSlice.actions;

export const selectPostState = (state: AppState) => state.post.postState;

export default postSlice.reducer;