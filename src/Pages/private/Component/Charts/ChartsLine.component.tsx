import {
  Card,
  CardContent,
  CardHeader,
  // SvgIcon,
} from "@mui/material";
import { SxProps, alpha, useTheme } from "@mui/material/styles";
import { ChartComponent } from "@/components/Chart/Chart.component";

const useChartOptions = (dataItem: string[]) => {
  const theme = useTheme();

  return {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: [
      theme.palette.primary.light,
      alpha(theme.palette.primary.main, 0.25),
    ],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: "solid",
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "40px",
      },
    },
    stroke: {
      colors: ["transparent"],
      show: true,
      width: 2,
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true,
      },
      categories: dataItem,
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value: number) => (value > 0 ? `${value}K` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  };
};

const useChartOptionsRoles = (labels: string[]) => {
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
  chartSeries: ApexAxisChartSeries | number[];
  sx: SxProps;
  dataItem: string[];
  title: string;
  height: number;
  type: string;
  option: boolean;
}
const ChartsLineComponent = ({
  chartSeries,
  sx,
  dataItem,
  title,
  height,
  type,
  option,
}: Props) => {
  const chartOptions = useChartOptions(dataItem);
  const chartOptionsRoles = useChartOptionsRoles(dataItem);

  return (
    <Card sx={sx}>
      <CardHeader title={title} />
      <CardContent>
        <ChartComponent
          height={height}
          options={option ? chartOptions : chartOptionsRoles}
          series={chartSeries}
          type={type}
          width="100%"
        />
      </CardContent>
    </Card>
  );
};
export default ChartsLineComponent;
