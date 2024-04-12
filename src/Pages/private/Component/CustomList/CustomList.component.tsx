import {
  Card,
  CardHeader,
  Checkbox,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { IItems } from "@/models";

interface Props {
  title: string;
  items: IItems[];
  available: boolean;
  handleToggle(items: IItems): void;
  handleToggleAll(items: IItems[]): React.MouseEventHandler<HTMLButtonElement>;
  numberOfChecked(items: IItems[]): number;
  checked: IItems[];
}

const CustomListComponent = ({
  title,
  items,
  available,
  handleToggle,
  handleToggleAll,
  numberOfChecked,
  checked,
}: Props) => {
  return (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0 || available === false}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 230,
          height: 320,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value, i: number) => {
          const labelId = `transfer-list-all-item-${i}-label`;
          //  console.log(value);
          return (
            <ListItemButton
              key={i}
              onClick={() => available && handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={available && checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disabled={available === false}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.Descripcion} />
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );
};
export default CustomListComponent;
