import { styled } from "@mui/material/styles";
import { lazy } from "react";
//import Chart from "react-apexcharts";

const Chart = lazy(() => import("react-apexcharts"));
export const ChartComponent = styled(Chart)``;
