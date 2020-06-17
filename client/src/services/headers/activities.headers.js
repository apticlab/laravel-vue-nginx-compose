const top_engagers = {
  headers: [
    {
      type: "avatar",
      label: "Utente",
      fields: {
        image: "usr.profile_pic_url",
        title: "usr.username",
        description: "usr.full_name",
        verified: "usr.is_verified"
      },
      class: {
        header: "text-center"
      }
    },
    {
      type: "number",
      field: "usr.counts.media",
      label: "Media"
    },
    {
      type: "number",
      field: "usr.counts.followers",
      label: "Followers"
    },
    {
      type: "number",
      field: "usr.counts.follows",
      label: "Following"
    },
    {
      type: "number",
      field: "view_count",
      label: "# Visualizzazioni"
    },
    {
      type: "number",
      field: "play_count",
      label: "# Giocate"
    },
    {
      type: "number",
      field: "like_count",
      label: "# di Like"
    },
    {
      type: "number",
      field: "comment_count",
      label: "# Commenti"
    },
    {
      type: "friendship",
      field: "usr.friendship_status.following",
      label: "Stato",
      class: ""
    }
  ],
  actions: []
};

const verified_followers = {
  headers: [
    {
      type: "avatar",
      label: "Utente",
      fields: {
        image: "usr.profile_pic_url",
        title: "usr.username",
        description: "usr.full_name",
        verified: "usr.is_verified"
      },
      class: {
        header: "text-center"
      }
    },
    {
      type: "number",
      field: "usr.counts.media",
      label: "Media"
    },
    {
      type: "number",
      field: "usr.counts.followers",
      label: "Followers"
    },
    {
      type: "number",
      field: "usr.counts.follows",
      label: "Following"
    },
    {
      type: "number",
      field: "view_count",
      label: "# Visualizzazioni"
    },
    {
      type: "number",
      field: "play_count",
      label: "# Giocate"
    },
    {
      type: "number",
      field: "like_count",
      label: "# di Like"
    },
    {
      type: "number",
      field: "comment_count",
      label: "# Commenti"
    },
    {
      type: "friendship",
      field: "usr.friendship_status.following",
      label: "Stato",
      class: ""
    }
  ],
  actions: []
};

const big_account_followers = {
  headers: [
    {
      type: "avatar",
      label: "Utente",
      fields: {
        image: "usr.profile_pic_url",
        title: "usr.username",
        description: "usr.full_name",
        verified: "usr.is_verified"
      },
      class: {
        header: "text-center"
      }
    },
    {
      type: "number",
      field: "usr.counts.media",
      label: "Media"
    },
    {
      type: "number",
      field: "usr.counts.followers",
      label: "Followers"
    },
    {
      type: "number",
      field: "usr.counts.follows",
      label: "Following"
    },
    {
      type: "number",
      field: "view_count",
      label: "# Visualizzazioni"
    },
    {
      type: "number",
      field: "play_count",
      label: "# Giocate"
    },
    {
      type: "number",
      field: "like_count",
      label: "# di Like"
    },
    {
      type: "number",
      field: "comment_count",
      label: "# Commenti"
    },
    {
      type: "friendship",
      field: "usr.friendship_status.following",
      label: "Stato",
      class: ""
    }
  ],
  actions: []
};

const influencer_followers = {
  headers: [
    {
      type: "avatar",
      label: "Utente",
      fields: {
        image: "usr.profile_pic_url",
        title: "usr.username",
        description: "usr.full_name",
        verified: "usr.is_verified"
      },
      class: {
        header: "text-center"
      }
    },
    {
      type: "number",
      field: "usr.counts.media",
      label: "Media"
    },
    {
      type: "number",
      field: "usr.counts.followers",
      label: "Followers"
    },
    {
      type: "number",
      field: "usr.counts.follows",
      label: "Following"
    },
    {
      type: "number",
      field: "view_count",
      label: "# Visualizzazioni"
    },
    {
      type: "number",
      field: "play_count",
      label: "# Giocate"
    },
    {
      type: "number",
      field: "like_count",
      label: "# di Like"
    },
    {
      type: "number",
      field: "comment_count",
      label: "# Commenti"
    },
    {
      type: "friendship",
      field: "usr.friendship_status.following",
      label: "Stato",
      class: ""
    }
  ],
  actions: []
};

export default {
  top_engagers,
  verified_followers,
  big_account_followers,
  influencer_followers
};
