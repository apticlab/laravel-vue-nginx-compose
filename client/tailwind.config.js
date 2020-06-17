var flexGrowObject = {
  default: 1
};

var maxWidthObject = {};

for (let i = 0; i < 11; i++) {
  flexGrowObject["" + i] = i;
}

for (let i = 0; i < 11; i++) {
  maxWidthObject["" + i * 10] = i * 10 + "%";
}

module.exports = {
  theme: {
    flexGrow: flexGrowObject,
    extend: {
      maxWidth: {
        ...maxWidthObject
      },
      maxHeight: {
        ...maxWidthObject,
        "2": "4rem",
        "4": "8rem",
        "6": "16rem",
        "8": "32rem",
      },
      spacing: {
        "128": "32rem",
        "172": "40rem"
      },
      minWidth: {
        "10": "2.5rem"
      },
      minHeight: {
        "10": "2.5rem",
        "12": "4.5rem",
        "14": "6.5rem",
        "64": "16rem"
      },
      height: {
        "70": "18rem",
        "72": "22rem",
        "74": "26rem",
        "76": "30rem",
        "78": "34rem"
      }
    }
  },
  variants: {
    backgroundColor: ["responsive", "odd", "hover", "disabled", "focus"],
    opacity: ["responsive", "hover", "group-hover"],
    borderRadius: ["responsive", "hover", "first", "last"],
    borderWidth: ["responsive", "hover", "first", "last"]
  },
  plugins: []
};
