const useLoadPermisos = () => {
  const cargarPermisosAsignados = async (IDPerfil: number) => {
    await permisosAsignados(IDPerfil)
      .then((res) => res.json())
      .then((datos) => {
        if (datos.status === "Error") {
          setSnackbar({
            children: datos.data.ErrorDetail,
            severity: "error",
          });
        } else {
          //console.log(datos.data);
          const data = datos.data.map((item: IItems) => item.Id);
          setPermisos(data);
        }
      })
      .catch((err) => {
        const status = err.message.match("SESSION_NO_VALIDA");
        console.log(err);
        managesSession(status?.[0]);
      });
  };
  return <div>useLoadPermisos</div>;
};
export default useLoadPermisos;
