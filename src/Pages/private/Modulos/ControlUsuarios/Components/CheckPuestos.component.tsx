import { Roles } from "@/models";
import { puestos, puestosDescripcion } from "@/models/puestos";
import { AppStore } from "@/redux/store/v2/store";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import { useGridApiContext } from "@mui/x-data-grid/hooks/utils/useGridApiContext";
import { GridRenderCellParams } from "@mui/x-data-grid/models/params/gridCellParams";
import { useSelector } from "react-redux/es/hooks/useSelector";

const CheckPuestos = (props: GridRenderCellParams) => {
  const { id, value, field } = props;
  const userState = useSelector((store: AppStore) => store.user);
  const dato = JSON.parse(value);
  console.log(dato);
  const apiRef = useGridApiContext();
  console.log({ propies: props });

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const DBA = name === "1" ? checked : dato === null ? false : dato?.DBA;
    const SYSADMIN =
      name === "2" ? checked : dato === null ? false : dato?.SYSADMIN;
    const SUPP = name === "3" ? checked : dato === null ? false : dato?.SUPP;
    const BOSS = name === "4" ? checked : dato === null ? false : dato?.BOSS;
    console.log(event.target);
    const puest = { DBA: DBA, SYSADMIN: SYSADMIN, SUPP: SUPP, BOSS: BOSS };
    console.log({ puest });
    (userState.datos.IDPerfil === Roles.ADMINAPP ||
      userState.datos.IDPerfil === Roles.CONSULADMON) &&
      (await apiRef.current.setEditCellValue({
        id,
        field,
        value: JSON.stringify(puest),
      }));
  };
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={dato?.DBA}
            onChange={handleChange}
            name="1"
            size="small"
          />
        }
        label={puestosDescripcion[puestos.DBA]}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={dato?.SYSADMIN}
            onChange={handleChange}
            name="2"
            size="small"
          />
        }
        label={puestosDescripcion[puestos.SYSADMIN]}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={dato?.SUPP}
            onChange={handleChange}
            name="3"
            size="small"
          />
        }
        label={puestosDescripcion[puestos.SUPP]}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={dato?.BOSS}
            onChange={handleChange}
            name="4"
            size="small"
          />
        }
        label={puestosDescripcion[puestos.BOSS]}
      />
    </>
  );
};
export default CheckPuestos;
