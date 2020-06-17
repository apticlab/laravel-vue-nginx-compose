import stories from "./stories.headers";
import post from "./post.headers";
import activities from "./activities.headers";
import received_tag from "./received_tag.headers";
import cronjobs from "./cronjobs.headers";
import jobs from "./jobs.headers";
import accounts from "./accounts.headers";

const users = {
  headers: [
    {
      type: "avatar",
      fields: {
        title: "name",
        description: "email",
        image: "avatar"
      },
      label: "Utente",
      class: {
        row: "justify-start"
      }
    },
    {
      type: "text",
      field: "username",
      label: "Username"
    },
    {
      type: "pill",
      field: {
        text: "role.name",
        color: "role.code"
      },
      label: "Ruolo"
    },
    {
      type: "status",
      field: "active",
      label: "Attivo"
    }
  ],
  actions: [
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
  ]
};

export {
  users,
  activities,
  post,
  stories,
  received_tag,
  cronjobs,
  jobs,
  accounts
};
