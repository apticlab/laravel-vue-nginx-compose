import moment from "moment";
import i18n from "@/i18n";
import { helpers } from "@/utils/helpers";

export default {
  truncate: function(value, limit, no_dots) {
    if (value != undefined && value != null) {
      if (limit != undefined) {
        return value.length >= limit
          ? value.substring(0, limit) + (no_dots ? "" : "...")
          : value;
      } else {
        return value;
      }
    }
  },
  date: function(value, format, messages) {
    if (value != undefined && value != null) {
      if (format != undefined) {
        return moment
          .utc(value)
          .local()
          .format(format);
      } else {
        return value;
      }
    }
    return messages || "";
  },
  size_number: function(value) {
    if (value != undefined && value != null) {
      let numericValue = parseInt(value);

      if (numericValue > 1e6) {
        return (numericValue / 1e6).toFixed(1) + "M";
      }

      if (numericValue > 10e3) {
        return (numericValue / 1e3).toFixed(1) + "K";
      }

      return Math.round(value);
    }
  },
  digits: function(value, digits) {
    if (value != undefined && value != null) {
      if (digits != undefined) {
        return parseFloat(value).toFixed(digits);
      } else {
        return value;
      }
    }
  },
  count: function(value) {
    if (value != undefined && value != null) {
      return value.length;
    }
    return 0;
  },
  uppercase: function(value) {
    if (value != undefined && value != null) {
      return value.toUpperCase();
    }
  },
  capitalize: function(value) {
    if (value != undefined && value != null && value != "") {
      return value[0].toUpperCase() + value.substring(1, value.length);
    }
  },
  date_unix: function(value, format) {
    if (!value) return "";

    var date = moment.unix(value);
    if (!date.isValid()) return "";
    return format ? date.format(format) : date;
  },
  number: function(value) {
    let number;
    if (value < "999") {
      return value;
    }
    if (value < "999999") {
      number = value / 1000;
      return number.toFixed(1).replace(".", ",") + " K";
    }
    if (value < 999999999) {
      number = value / 1000000;
      return number.toFixed(1).replace(".", ",") + " M";
    }
  },
  round: function(value, digits = 2) {
    // Round only if it is float
    if (value % 1 === 0) {
      return value;
    }

    // TODO: round locale wise
    return parseFloat(value)
      .toFixed(digits)
      .replace(".", ",");
  },
  percentage: function(value, digits = 1) {
    let percValue = value * 100;

    // TODO: round locale wise
    let parsePercValue = parseFloat(percValue)
      .toFixed(digits)
      .replace(".", ",");

    return parsePercValue + "%";
  },
  time_ago: function(value) {
    if (!value) return "";
    return moment(value)
      .locale("it")
      .fromNow();
  },
  on_empty(value, message) {
    if (!value) return message;
    return value;
  },
  translate(key) {
    const locale = i18n.locale;
    const messages = i18n.messages[locale];
    return helpers.deepPick(messages, key) || key;
  },
  week_date(week, year = moment().year()) {
    if (!week) return "";
    const week_as_string = moment()
      .day("Sunday")
      .year(year)
      .week(week);
    return {
      start: week_as_string.startOf("week").format("L"),
      end: week_as_string.endOf("week").format("L")
    };
  }
};
