import {
  Box,
  InputAdornment,
  TextField,
  TextFieldVariants,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEventHandler } from "react";

interface Props {
  placeholder?: string;
  onSearchChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  variant?: TextFieldVariants;
}

const Search = ({
  placeholder = "Buscar",
  onSearchChange,
  variant = "standard",
}: Props) => {
  return (
    <>
      <Box
        sx={{
          width: 500,
        }}
      >
        <TextField
          fullWidth
          id="fullWidth"
          placeholder={placeholder}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={onSearchChange}
          variant={variant}
        />
      </Box>
    </>
  );
};

export default Search;
