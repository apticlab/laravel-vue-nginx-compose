const headers = [
  {
    type: "text",
    field: "function",
    label: "Nome",
    class: {
      header: "text-left",
      row: "text-left"
    }
  },
  {
    type: "text",
    field: "target",
    label: "Target"
  },
  {
    type: "avatar",
    field: "user",
    label: "Account",
    class: {
      header: "",
      row: "justify-start"
    },
    fields: {
      image: "user.profile_pic_url",
      title: "user.username",
      description: "user.full_name",
      verified: "user.is_verified"
    }
  },
  {
    type: "date",
    field: "start_time",
    dateFormat: "DD/MM/Y",
    label: "Data"
  },
  {
    type: "date",
    field: "start_time",
    dateFormat: "H:mm",
    label: "Inizio"
  },
  {
    type: "date",
    field: "finish_time",
    dateFormat: "H:mm",
    label: "Fine"
  },
  {
    type: "number",
    field: "duration",
    udm: "s",
    label: "Durata"
  },
  {
    type: "text",
    field: "status",
    label: "Stato"
  },
  {
    type: "boolean",
    field: "success",
    label: "Successo"
  }
];

const actions = [
  /*
  {
    name: "view",
    label: "Dettaglio",
    icon: "hi-view",
    active: "tx-hover-primary-600",
    action: "goToUserDetail"
  },
  {
    name: "edit",
    label: "Modifica",
    icon: "hi-edit",
    active: "tx-hover-primary-600",
    action: "goToUserEdit"
  },
  {
    name: "delete",
    label: "Elimina",
    icon: "hi-trash",
    active: "tx-hover-danger-600",
    action: "deleteUser"
  }
  */
];

export default {
  headers,
  actions
};
