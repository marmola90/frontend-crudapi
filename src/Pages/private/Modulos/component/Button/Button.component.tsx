import { Card, CardContent } from "@mui/material";
import Paper from "@mui/material/Paper";
import "./Button.style.scss";

interface Props {
  children: JSX.Element[] | JSX.Element;
  onClick: React.MouseEventHandler<HTMLElement>;
}
export default function SimplePaper({ children, onClick }: Props) {
  return (
    <Paper
      elevation={3}
      square={true}
      onClick={onClick}
      sx={{ borderRadius: "25px" }}
      key={Math.random() * 200}
    >
      <Card
        sx={{
          minWidth: 200,
          minHeight: 180,
          width: 270,
          height: 180,
          borderRadius: "25px",
          textAlign: "center",
        }}
        className="modul"
      >
        <CardContent sx={{ padding: "60px" }}>{children}</CardContent>
      </Card>
    </Paper>
  );
}
