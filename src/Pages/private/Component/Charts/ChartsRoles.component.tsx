import {
  Card,
  CardContent,
  CardHeader,
  // SvgIcon,
  SxProps,
  useTheme,
} from "@mui/material";
import { ChartComponent } from "@/components/Chart/Chart.component";

const useChartOptions = (labels: string[]) => {
  const theme = useTheme();

  return {
    chart: {
      background: "transparent",
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.error.main,
      theme.palette.primary.light,
      theme.palette.success.dark,
      theme.palette.warning.dark,
      theme.palette.secondary.main,
    ],
    dataLabels: {
      enabled: true,
    },
    labels,
    legend: {
      show: true,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    states: {
      active: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      fillSeriesColor: false,
    },
  };
};

interface Props {
  chartSeries: number[];
  labels: string[];
  sx: SxProps;
  title: string;
}
const ChartsRolesComponent = ({ chartSeries, labels, sx, title }: Props) => {
  const chartOptions = useChartOptions(labels);

  return (
    <Card sx={sx}>
      <CardHeader title={title} />
      <CardContent>
        <ChartComponent
          height={400}
          options={chartOptions}
          series={chartSeries}
          type="donut"
          width="100%"
        />
      </CardContent>
    </Card>
  );
};

export default ChartsRolesComponent;
