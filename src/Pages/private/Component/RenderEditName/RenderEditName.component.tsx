import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";
import { GridEditInputCell, GridRenderEditCellParams } from "@mui/x-data-grid";

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
}));

function NameEditInputCell(props: GridRenderEditCellParams) {
  const { error } = props;
  const props1 = { ...props, ediTable: false };
  return (
    <StyledTooltip open={!!error} title={error}>
      <GridEditInputCell {...props1} />
    </StyledTooltip>
  );
}

const RenderEditName = (params: GridRenderEditCellParams) => {
  return <NameEditInputCell {...params} />;
};

export default RenderEditName;
