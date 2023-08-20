import { Card, CardContent } from "@mui/material";
import Paper from "@mui/material/Paper";

interface Props {
  children: JSX.Element[] | JSX.Element;
}
export default function SimplePaper({ children }: Props) {
  return (
    <Paper elevation={3} square={true} sx={{ cursor: "pointer" }}>
      <Card sx={{ minWidth: 200, minHeight: 180 }}>
        <CardContent sx={{ padding: "60px" }}>{children}</CardContent>
      </Card>
    </Paper>
  );
}
