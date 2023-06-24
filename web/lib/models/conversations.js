const common = require("./common")

module.exports = {

  SCHEMA: "chat",
  RESOURCE: "conversations",

  create: function (data) {

    return common.write(this.SCHEMA, this.RESOURCE, data);
  },

  fetch: function (cursor, limit) {

    const records = common.read(this.SCHEMA, this.RESOURCE)

    const data = [];

    for (const i of Object.keys(records).sort( (a, b) => parseInt(b) - parseInt(a)) ) {

      if (
        parseInt(i, 10) > parseInt(cursor, 10) &&
        0 < parseInt(cursor, 10)
      ) {

        continue;
      }

      data.push({
        id: i,
        user: records[i].user,
        content: records[i].content,
        created_at: records[i].created_at
      });

      if (data.length >= limit) {

        break;
      }
    }

    return data;
  }

}
