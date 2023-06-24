const fs = require('fs');
const AsyncLock = require('async-lock');
require('date-utils');

module.exports = {

  PATH: {
    DATA: "data",
    FILE_EXTENSION: "json",
  },

  LOCK: {
    TIMEOUT: 10000,
    KEY: `fileio`
  },

  ENCODING: "utf-8",

  _path: function (schema, resource) {

    const schema_path = this.PATH.DATA + '/' + schema + "/";

    if (!fs.existsSync(schema_path)) {

      fs.promises.mkdir(schema_path, { recursive: true });
    }

    return schema_path + resource + '.' + this.PATH.FILE_EXTENSION;

  },

  write: function (schema, resource, data) {

    let returning = [ false, {} ];

    const lock = new AsyncLock({ timeout: this.LOCK.TIMEOUT });

    lock.acquire(this.LOCK.KEY, () => {

      const records = this.read(schema, resource);

      const number = Object.keys(records).length;

      data.created_at = ( new Date() ).toFormat("YYYYMMDDHH24MISS");

      records[number] = data;

      const path = this._path(schema, resource);

      fs.writeFileSync(path, JSON.stringify(records));

      returning = [ true, data ]

    }, (e, _) => {

      if (e) {

        console.log(`${e.name} ${( new Date() ).toFormat('YYYY/MM/DD HH24:MI:SS')} ${e.message}`);
      }
    })

    return returning;
  },

  read: function (schema, resource) {

    const path = this._path(schema, resource);

    return JSON.parse(
      fs.existsSync(path) ?
        fs.readFileSync(path, { encoding: this.ENCODING }) :
        `{}`
    );
  }
}
