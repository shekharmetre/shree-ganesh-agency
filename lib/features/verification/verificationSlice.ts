import { createSlice } from "@reduxjs/toolkit";

interface VerificationState {
  isVerified: boolean;
}

const initialState: VerificationState = {
  isVerified: false,
};

const verificationSlice = createSlice({
  name: "verification",
  initialState,
  reducers: {
    verifyUser: (state) => {
      state.isVerified = true;
    },
    resetVerification: (state) => {
      state.isVerified = false;
    },
  },
});

export const { verifyUser, resetVerification } = verificationSlice.actions;
export default verificationSlice.reducer;
