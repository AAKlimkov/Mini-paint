import React from "react";
import Button from "@mui/material/Button";

interface SignOutAndCreateButtonsProps {
  onSignOut: () => void;
  onCreateImage: () => void;
}

const SignOutAndCreateButtons: React.FC<SignOutAndCreateButtonsProps> = ({
  onSignOut,
  onCreateImage,
}) => (
  <>
    <Button
      variant="outlined"
      onClick={onSignOut}
      style={{ marginBottom: "20px" }}
    >
      Sign Out
    </Button>
    <Button
      variant="outlined"
      onClick={onCreateImage}
      style={{ marginBottom: "20px" }}
    >
      Create New Image
    </Button>
  </>
);

export default SignOutAndCreateButtons;
