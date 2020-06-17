const latest_tag_posts = {
  headers: [
    {
      type: "image",
      field: "image.url",
      label: ""
    },
    {
      type: "timeago",
      field: "created_at",
      label: "Data di Pubblicazione"
    },
    {
      type: "username",
      field: "user.username",
      label: "Username"
    },
    {
      type: "partnership",
      field: "sponsor_tags",
      label: "Partnership"
    },
    {
      type: "number",
      field: "insights.like_count",
      label: "# Likes"
    },
    {
      type: "number",
      field: "insights.comment_count",
      label: "# Comments"
    },
    /**
    {
      type: 'text',
      field: 'hashtags',
      label: '# hashtags'
    }, **/
    {
      type: "tag",
      field: "insights.tags",
      label: "# Tags"
    },
    {
      type: "link",
      fields: {
        url_name: "ig_link.name",
        url_link: "ig_link.url"
      },
      label: ""
    }
  ],
  actions: []
};

const latest_tag_stories = {
  headers: [
    {
      type: "avatar",
      fields: {
        title: "user.full_name",
        description: "user.username",
        image: "user.profile_pic_url"
      },
      label: "Utente",
      class: {
        header: "text-left w-2/12",
        row: "justify-start"
      }
    },
    {
      type: "timeago",
      field: "publication_date",
      label: "Data di Pubblicazione"
    },
    {
      type: "image",
      field: "image",
      label: ""
    },
    {
      type: "partnership",
      field: "partnership",
      label: "Partnership"
    },
    {
      type: "link",
      fields: {
        url_name: "ig_link.name",
        url_link: "ig_link.url"
      },
      label: ""
    }
  ],
  actions: []
};

export default {
  latest_tag_posts,
  latest_tag_stories,
  latest_hashtag_posts: latest_tag_posts,
  latest_hashtag_stories: latest_tag_stories
};
