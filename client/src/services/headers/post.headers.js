const last_post = {
  headers: [
    {
      type: "ig-media",
      shape: "circle",
      label: "post",
      field: "image.url",
      class: "text-center"
    },
    {
      type: "number",
      field: "counts.likes",
      label: "like"
    },
    {
      type: "number",
      field: "insights.impressions.comments",
      label: "comments"
    },
    {
      type: "number",
      field: "insights.share_count",
      label: "share"
    },
    {
      type: "number",
      field: "insights.save_count",
      label: "save"
    },
    {
      type: "number",
      field: "insights.interactions",
      label: "interactions"
    },
    {
      type: "number",
      field: "insights.reach.count",
      label: "reach"
    },
    {
      type: "number",
      field: "insights.impressions.count",
      label: "impressions"
    }
  ],
  actions: []
};

const user_tag_engagement = {
  headers: [
    {
      type: "number",
      field: "post_number",
      label: "#"
    },
    {
      type: "avatar",
      fields: {
        title: "user.full_name",
        description: "user.username",
        image: "user.profile_pic_url"
      },
      label: "user",
      class: {
        header: "text-left w-3/12",
        row: "justify-start"
      }
    },
    {
      type: "number",
      field: "like_count",
      label: "like"
    },
    {
      type: "number",
      field: "comment_count",
      label: "comments"
    },
    {
      type: "number",
      field: "share_count",
      label: "share"
    },
    {
      type: "number",
      field: "save_count",
      label: "save"
    },
    {
      type: "number",
      field: "interactions",
      label: "interactions"
    },
    {
      type: "number",
      field: "reach_count",
      label: "reach"
    },
    {
      type: "number",
      field: "impressions_count",
      label: "impressions"
    }
  ],
  actions: []
};

const hashtag_engagement = {
  headers: [
    {
      type: "number",
      field: "post_number",
      label: "#"
    },
    {
      type: "hashtag",
      field: "hashtag",
      label: "hashtag"
    },
    {
      type: "number",
      field: "like_count",
      label: "like"
    },
    {
      type: "number",
      field: "comment_count",
      label: "comments"
    },
    {
      type: "number",
      field: "share_count",
      label: "share"
    },
    {
      type: "number",
      field: "save_count",
      label: "save"
    },
    {
      type: "number",
      field: "interactions",
      label: "interactions"
    },
    {
      type: "number",
      field: "reach_count",
      label: "reach"
    },
    {
      type: "number",
      field: "impressions_count",
      label: "impressions"
    }
  ],
  actions: []
};

const imagetag_engagement = {
  headers: [
    {
      type: "number",
      field: "post_number",
      label: "#"
    },
    {
      type: "number",
      field: "imagetag",
      label: "imagetag"
    },
    {
      type: "number",
      field: "like",
      label: "like"
    },
    {
      type: "number",
      field: "comments",
      label: "comments"
    },
    {
      type: "number",
      field: "shares",
      label: "share"
    },
    {
      type: "number",
      field: "saved",
      label: "save"
    },
    {
      type: "number",
      field: "interactions",
      label: "interactions"
    },
    {
      type: "number",
      field: "coverage",
      label: "reach"
    },
    {
      type: "number",
      field: "impression",
      label: "impressions"
    }
  ],
  actions: []
};

const reports = {
  headers: [
    {
      label: "last_post_liked",
      type: "text",
      field: "post_liked"
    },
    {
      label: "user_total",
      type: "number",
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
      type: "number",
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
      type: "number",
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
  last_post,
  user_tag_engagement,
  hashtag_engagement,
  imagetag_engagement,
  reports
};
