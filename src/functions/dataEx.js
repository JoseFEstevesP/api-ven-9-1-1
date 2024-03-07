import moment from "moment";

  // Crear datos adicionales para el registro de compra
export  const extraData = ({id,uidSite})=>( {
    uidUser: id, // ID del usuario que realiza la compra
    uidSite, // ID del sitio donde se realiza la compra
    createAtDate: moment().format('YYYY-MM-DD'), // Fecha de creación de la compra
    createAtTime: moment().format('hh:mm A'), // Hora de creación de la compra (formato de 12 horas)
    updateAtDate: moment().format('YYYY-MM-DD'), // Fecha de actualización de la compra (inicialmente igual a la fecha de creación)
    updateAtTime: moment().format('hh:mm A'), // Hora de actualización de la compra (inicialmente igual a la hora de creación)
  });
