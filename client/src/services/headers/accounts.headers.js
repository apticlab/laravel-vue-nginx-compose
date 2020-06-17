const headers = [
  {
    type: "avatar",
    field: "user",
    label: "Account",
    class: {
      header: "",
      row: "justify-start"
    },
    fields: {
      image: "profile_pic_url",
      title: "username",
      description: "user.full_name",
      verified: "user.is_verified"
    }
  },
  {
    type: "text",
    field: "pk",
    label: "Instagram ID"
  },
  {
    type: "text",
    field: "username",
    label: "Username"
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
