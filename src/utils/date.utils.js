const dateFormateado = (fecha, hora) => {
  // Separar los componentes de fecha y hora
  const [anio, mes, dia] = fecha.split("-");
  const [horaParte, minutoParte] = hora.split(":");

  // Instanciar un objeto Date con los componentes
  const fechaHora = new Date(anio, mes - 1, dia, horaParte, minutoParte);

  return fechaHora;
};

module.exports = {
    dateFormateado
}
