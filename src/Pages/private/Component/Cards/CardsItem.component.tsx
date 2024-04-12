import { Avatar, Card, CardContent, Stack, SvgIcon } from "@mui/material";
import { lazy } from "react";
const TextTitleComponent = lazy(
  () => import("@/components/TextTitle/TextTitle.component")
);

interface props {
  sx: object;
  value: string;
  title: string;
  icon: JSX.Element;
  color: string;
  colorText: string;
}

const CardsItemComponent = ({
  sx,
  value,
  title,
  icon,
  color,
  colorText,
}: props) => {
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <TextTitleComponent
              variante="overline"
              color={colorText}
              titleName={title}
            />
            <TextTitleComponent
              variante="h4"
              color={colorText}
              titleName={value}
            />
          </Stack>
          <Avatar
            sx={{
              backgroundColor: `${color}`,
              height: 60,
              width: 60,
            }}
          >
            <SvgIcon>{icon}</SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};
export default CardsItemComponent;
