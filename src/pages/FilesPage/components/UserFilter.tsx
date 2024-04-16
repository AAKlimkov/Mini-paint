import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  SelectChangeEvent,
} from "@mui/material";

interface UserFilterProps {
  selectedUsers: string[];
  userOptions: string[];
  handleUserSelectionChange: (event: SelectChangeEvent<string[]>) => void;
}

const UserFilter: React.FC<UserFilterProps> = ({
  selectedUsers,
  userOptions,
  handleUserSelectionChange,
}) => (
  <FormControl sx={{ m: 1, width: 300 }}>
    <InputLabel id="user-select-label">Filter by User</InputLabel>
    <Select
      labelId="user-select-label"
      multiple
      value={selectedUsers}
      onChange={handleUserSelectionChange}
      input={<OutlinedInput id="select-multiple-chip" label="Filter by User" />}
      renderValue={(selected) => (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {selected.map((value) => (
            <Chip key={value} label={value} style={{ margin: 2 }} />
          ))}
        </div>
      )}
    >
      {userOptions.map((name) => (
        <MenuItem key={name} value={name}>
          {name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default UserFilter;
