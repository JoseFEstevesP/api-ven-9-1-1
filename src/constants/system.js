export const limitPage = 30;
export const vehicleMSG = {
  register: {
    uid: {
      status: 'Este Vehículo  ya esta registrado, pero fue deshabilitado',
      default: 'Este Vehículo ya esta registrado',
    },
    codeBN: {
      status: 'Ya existe un Vehículo con ese código, pero fue deshabilitado',
      default: 'Ya existe un Vehículo con ese código BN',
    },
    place: {
      status: 'Ya existe un Vehículo con ese placa, pero fue deshabilitado',
      default: 'Ya existe un Vehículo con ese placa',
    },
    msg: 'Vehículo registrado con éxito',
  },
  noFound: 'No se a encontrado ningún vehículo',
  update: {
    msg: 'Vehículo actualizado con éxito',
  },
  delete: {
    msg: 'Vehículo eliminado con éxito',
  },
};
export const technologyMSG = {
  register: {
    uid: {
      status: 'Esta tecnologia  ya esta registrado, pero fue deshabilitado',
      default: 'Esta tecnologia ya esta registrado',
    },
    codeBN: {
      status:
        'Ya existe una tecnologia con ese código BN, pero fue deshabilitado',
      default: 'Ya existe una tecnologia con ese código BN',
    },
    serial: {
      status: 'Ya existe una tecnologia con ese serial, pero fue deshabilitado',
      default: 'Ya existe una tecnologia con ese serial',
    },
    msg: 'Tecnologia registrado con éxito',
  },
  noFound: 'No se a encontrado ninguna tecnologia',
  update: {
    msg: 'Tecnologia actualizada con éxito',
  },
  delete: {
    msg: 'Tecnologia eliminada con éxito',
  },
};
export const userMSG = {
  register: {
    uid: {
      status: 'Esta usuario  ya esta registrado, pero fue deshabilitado',
      default: 'Esta usuario ya esta registrado',
    },
    email: {
      status: 'Ya existe un usuario con ese correo, pero fue deshabilitado',
      default: 'Ya existe un usuario con ese correo',
    },
    msg: 'Usuario registrado con éxito',
  },
  login: {
    status: 'Este usuario fue eliminado',
    error: 'Credenciales incorrectas',
  },
  noFound: 'No se a encontrado ningún usuario',
  unauthorized: 'Usuario no autorizado',
  update: {
    msg: 'Usuario actualizado con éxito',
    email: 'Correo actualizado con éxito',
    password: 'Contraseña actualizada con éxito',
  },
  delete: {
    msg: 'Usuario eliminado con éxito',
    technology: 'Usuario vinculado con Tecnología',
    consumables: 'Usuario vinculado con consumible',
    furniture: 'Usuario vinculado con mobiliario',
    vehicle: 'Usuario vinculado con vehículos',
  },
};
export const siteMSG = {
  register: {
    uid: {
      status: 'Esta Sede  ya esta registrada, pero fue deshabilitada',
      default: 'Esta Sede ya esta registrada',
    },
    name: {
      status: 'Ya existe una Sede con ese nombre, pero fue deshabilitado',
      default: 'Ya existe una Sede con ese nombre',
    },
    msg: 'Sede registrada con éxito',
  },
  noFound: 'No se a encontrado ninguna Sede',
  update: {
    msg: 'Sede actualizada con éxito',
  },
  delete: {
    msg: 'Sede eliminada con éxito',
    user: 'Sede vinculada con usuario',
    technology: 'Sede vinculada con Tecnología',
    consumables: 'Sede vinculada con consumible',
    furniture: 'Sede vinculada con mobiliario',
    vehicle: 'Sede vinculada con vehículos',
  },
};
export const rolMSG = {
  register: {
    uid: {
      status: 'Esta rol  ya esta registrado, pero fue deshabilitado',
      default: 'Esta rol ya esta registrado',
    },
    name: {
      status: 'Ya existe una rol con ese nombre, pero fue deshabilitado',
      default: 'Ya existe una rol con ese nombre',
    },
    msg: 'Rol registrado con éxito',
  },
  noFound: 'No se a encontrado ninguna rol',
  update: {
    msg: 'Rol actualizado con éxito',
  },
  delete: {
    msg: 'Rol eliminada con éxito',
    user: 'Rol vinculado a un usuario',
  },
};
export const furnitureMSG = {
  register: {
    uid: {
      status: 'Esta mobiliario  ya esta registrado, pero fue deshabilitado',
      default: 'Esta mobiliario ya esta registrado',
    },
    codeBN: {
      status:
        'Ya existe una mobiliario con ese código de BN, pero fue deshabilitado',
      default: 'Ya existe una mobiliario con ese código de BN',
    },
    serial: {
      status: 'Ya existe una mobiliario con ese serial, pero fue deshabilitado',
      default: 'Ya existe una mobiliario con ese serial',
    },
    msg: 'Mobiliario registrado con éxito',
  },
  noFound: 'No se a encontrado ninguna mobiliario',
  update: {
    msg: 'Mobiliario actualizado con éxito',
  },
  delete: {
    msg: 'Mobiliario eliminada con éxito',
  },
};
export const consumablesMSG = {
  register: {
    uid: {
      status: 'Esta consumible  ya esta registrado, pero fue deshabilitado',
      default: 'Esta consumible ya esta registrado',
    },
    serial: {
      status: 'Ya existe una consumible con ese serial, pero fue deshabilitado',
      default: 'Ya existe una consumible con ese serial',
    },
    msg: 'Consumible registrado con éxito',
  },
  noFound: 'No se a encontrado ninguna consumible',
  update: {
    msg: 'Consumible actualizado con éxito',
  },
  delete: {
    msg: 'Consumible eliminada con éxito',
  },
};
export const purchaseMSG = {
  register: {
    uid: {
      status: 'Esta Compra  ya esta registrada, pero fue deshabilitada',
      default: 'Esta Compra ya esta registrada',
    },
    orderNumber: {
      status:
        'Ya existe una Compra con ese Numero de orden, pero fue deshabilitado',
      default: 'Ya existe una Compra con ese Numero de orden',
    },
    msg: 'Compra registrada con éxito',
  },
  noFound: 'No se a encontrado ninguna Compra',
  update: {
    msg: 'Compra actualizada con éxito',
  },
  delete: {
    msg: 'Compra eliminada con éxito',
  },
};
export const breakdownReportMSG = {
  register: {
    uid: {
      status:
        'Este Reporte de avería ya esta registrado, pero fue deshabilitado',
      default: 'Este Reporte de avería ya esta registrado',
    },
    serialOrCodeBN: {
      status:
        'Ya existe una Reporte de avería con ese Serial o Código de BN, pero fue deshabilitado',
      default: 'Ya existe una Reporte de avería con ese Serial o Código de BN',
    },
    msg: 'Reporte de avería registrado con éxito',
  },
  noFound: 'No se a encontrado ninguna reporte de avería',
  update: {
    msg: 'Reporte de avería actualizado con éxito',
  },
  delete: {
    msg: 'Reporte de avería eliminado con éxito',
  },
};
