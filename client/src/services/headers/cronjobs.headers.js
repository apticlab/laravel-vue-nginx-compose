const headers = [
  {
    type: "text",
    field: "funcname",
    label: "Nome Funzione",
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
    type: "number",
    field: "frequency",
    udm: "h",
    label: "Frequenza Aggiornamento"
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
  */
  {
    name: "delete",
    label: "Elimina",
    icon: "hi-trash",
    active: "tx-hover-danger-600",
    action: "delete"
  }
];

export default {
  headers,
  actions
};
