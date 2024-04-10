import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import router from "./routes/routes";
import { useAppDispatch } from "./store/hooks";
import { auth } from "./firebaseConfig";
import { setUser } from "./features/auth/authSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          }),
        );
      } else {
        dispatch(
          setUser({
            uid: null,
            email: null,
            displayName: null,
          }),
        );
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
