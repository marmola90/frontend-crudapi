import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  return (
    <Box
      sx={{
        width: 500,
      }}
    >
      <TextField
        fullWidth
        id="fullWidth"
        placeholder="Buscar...."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
    </Box>
  );
};
export default Search;
