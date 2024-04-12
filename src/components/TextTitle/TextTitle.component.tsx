import Typography from "@mui/material/Typography";
import { Variant } from "@mui/material/styles/createTypography";

interface Props {
  variante: Variant;
  color: string;
  titleName: string | undefined;
}

const TextTitleComponent = ({ variante, color, titleName }: Props) => {
  return (
    <>
      <Typography variant={variante} gutterBottom color={color}>
        {titleName}
      </Typography>
    </>
  );
};

export default TextTitleComponent;
