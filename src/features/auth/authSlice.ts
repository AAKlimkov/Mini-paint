import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

interface SimplifiedUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthState {
  user: SimplifiedUser;
  error: string | null;
}

const initialState: AuthState = {
  user: auth.currentUser || { uid: "", email: null, displayName: null },
  error: null,
};

export const monitorAuthState = createAsyncThunk(
  "auth/monitorAuthState",
  async (_, { rejectWithValue }) => {
    try {
      return await new Promise<SimplifiedUser | null>((resolve) => {
        auth.onAuthStateChanged((user) => {
          console.log(user);

          if (user) {
            const userData = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
            };
            resolve(userData);
          } else {
            resolve(null);
          }
        });
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SimplifiedUser>) => {
      state.user.uid = action.payload.uid;
      state.user.email = action.payload.email;
      state.user.displayName = action.payload.displayName;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        monitorAuthState.fulfilled,
        (state, action: PayloadAction<SimplifiedUser | null>) => {
          state.user = action.payload;
          state.error = null;
        },
      )
      .addCase(monitorAuthState.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
