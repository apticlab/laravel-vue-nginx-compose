const stories = {
  headers: [
    /*
    {
      type: "image",
      shape: "square",
      field: "image.url"
    },
    */
    {
      type: "timeago",
      field: "inserted_at",
      label: "Data di Pubblicazione",
      format: "ll H:m"
    },
    {
      type: "number",
      field: "impressions",
      label: "impressions"
    },
    {
      type: "number",
      field: "reach",
      label: "reach"
    },
    {
      type: "number",
      field: "play",
      label: "play"
    },
    {
      type: "number",
      field: "interactions",
      label: "interactions"
    },
    {
      type: "number",
      field: "taps_back",
      label: "taps_back"
    },
    {
      type: "number",
      field: "taps_forward",
      label: "taps_forward"
    },
    {
      type: "number",
      field: "story_swipe",
      label: "story_swipe"
    },
    {
      type: "number",
      field: "story_exits",
      label: "story_exits"
    }
  ],
  actions: []
};

const user_tag_engagement = {
  headers: [
    {
      type: "text",
      field: "story_count",
      label: "#"
    },
    {
      type: "avatar",
      fields: {
        image: "user.profile_pic_url",
        title: "user.username",
        description: "user.full_name"
      },
      label: "",
      class: {
        header: "text-left w-2/12",
        row: "justify-start"
      }
    },
    {
      type: "number",
      field: "impressions",
      label: "impressions"
    },
    {
      type: "number",
      field: "reach",
      label: "reach"
    },
    {
      type: "number",
      field: "play",
      label: "play"
    },
    {
      type: "number",
      field: "interactions",
      label: "interactions"
    },
    {
      type: "number",
      field: "taps_back",
      label: "taps_back"
    },
    {
      type: "number",
      field: "taps_forward",
      label: "taps_forward"
    },
    {
      type: "number",
      field: "story_swipe",
      label: "story_swipe"
    },
    {
      type: "number",
      field: "story_exits",
      label: "story_exits"
    }
  ],
  actions: []
};

const hashtag_engagement = {
  headers: [
    {
      type: "text",
      field: "story_count",
      label: "#"
    },
    {
      type: "hashtag",
      field: "hashtag",
      label: "Hashtag"
    },
    {
      type: "number",
      field: "impressions",
      label: "impressions"
    },
    {
      type: "number",
      field: "reach",
      label: "reach"
    },
    {
      type: "number",
      field: "play",
      label: "play"
    },
    {
      type: "number",
      field: "interactions",
      label: "interactions"
    },
    {
      type: "number",
      field: "taps_back",
      label: "taps_back"
    },
    {
      type: "number",
      field: "taps_forward",
      label: "taps_forward"
    },
    {
      type: "number",
      field: "story_swipe",
      label: "story_swipe"
    },
    {
      type: "number",
      field: "story_exits",
      label: "story_exits"
    }
  ],
  actions: []
};

const location_engagement = {
  headers: [
    {
      type: "text",
      field: "story_count",
      label: "#"
    },
    {
      type: "text",
      field: "location",
      class: {
        header: "justify-center",
        row: "justify-center text-center"
      },
      label: "Location"
    },
    {
      type: "number",
      field: "impressions",
      label: "impressions"
    },
    {
      type: "number",
      field: "reach",
      label: "reach"
    },
    {
      type: "number",
      field: "play",
      label: "play"
    },
    {
      type: "number",
      field: "interactions",
      label: "interactions"
    },
    {
      type: "number",
      field: "taps_back",
      label: "taps_back"
    },
    {
      type: "number",
      field: "taps_forward",
      label: "taps_forward"
    },
    {
      type: "number",
      field: "story_swipe",
      label: "story_swipe"
    },
    {
      type: "number",
      field: "story_exits",
      label: "story_exits"
    }
  ],
  actions: []
};

const reports = {
  headers: [
    {
      label: "last_story_viewed",
      type: "text",
      field: "story_viewed"
    },
    {
      label: "user_total",
      type: "text",
      row: "justify-center",
      class: {
        header: "justify-center",
        row: "justify-center font-bold"
      },
      field: "likers_count"
    },
    {
      label: "user_percentage",
      type: "percentage",
      field: "likers_quota"
    },
    {
      label: "followers",
      type: "text",
      row: "justify-center",
      class: {
        header: "justify-center",
        row: "justify-center text-green-600 font-bold"
      },
      field: "followers_likers_count"
    },
    {
      label: "follower_not_followers_comparison",
      type: "horizontalpiechart",
      values: {
        first: {
          field: "followers_likers_count",
          color: "text-green-600"
        },
        second: {
          field: "not_followers_likers_count",
          color: "text-blue-600"
        }
      }
    },
    {
      label: "not_followers",
      type: "text",
      row: "justify-center",
      class: {
        header: "justify-center",
        row: "justify-center text-blue-600 font-bold"
      },
      field: "not_followers_likers_count"
    }
    /*
    {
      label: "% Follower",
      type: "percentage",
      class: {
        header: "justify-center",
        row: "justify-center text-green-600"
      },
      field: "followers_likers_quota"
    },
    {
      label: "% Non Follower",
      type: "percentage",
      class: {
        header: "justify-center",
        row: "justify-center text-blue-600"
      },
      field: "not_followers_likers_quota"
    },
    */
  ]
};

export default {
  stories,
  user_tag_engagement,
  hashtag_engagement,
  reports,
  location_engagement
};
