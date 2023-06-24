/**
 * 正規表現チェッカー
 * https://www-creators.com/tool/regex-checker
 * 正規表現サンプル集
 * https://www.megasoft.co.jp/mifes/seiki/
 */
const TOKEN = {
  id: 0,
  parent: null,
  type: "",
  content: ""
};

const PRE = {
  name: "pre",
  // rgx: /^`{3}( |\r|\n)/
  rgx: /^`{3}/
}

module.exports = {

  // Token: {
  //   id: 0,
  //   parent: null,
  //   type: "",
  //   content: ""
  // },

  get_token: function (
    id = 0,
    parent = null,
    type = "root",
    content = ""
  ) {

    const token = structuredClone( TOKEN );

    token.id = id;
    token.parent = parent;
    token.type = type;
    token.content = content;

    // if (!id) {

    //   return token;
    // }

    // if (type === "root") {

    //   throw new Error();
    // }

    return token;
  },

  init: function () {

    return this.get_token();
  },

  parse: function (raw) {

    const root = this.init();

    const raws = raw.split(/\r\n|\r|\n/);

    let id = root.id;
    let parent = root;

    const elments = [];


    const md = raws.map(raw => {
      console.log(raw, root)

      const m = raw.match(PRE.rgx);

      // console.log("#: ", m);
      // #:  [ '```', index: 0, input: '```', groups: undefined ]
      // #:  null
      // #:  [ '```', index: 0, input: '```', groups: undefined ]

      if (!m) {

        ++id
        /** 正規表現にマッチしない通常のテキストのケース */
        const t = this.get_token( id, parent, "text", raw);
        console.log("#1: ", t)
        elments.push(t);
      } else {

        const idx = Number(m.index);
        if (idx) {

          ++id
          const text = raw.substring(0, idx);
          const t = this.get_token( id, parent, "text", text);
          console.log("#2: ", t)
          elments.push(t);

          raw = raw.replace(text, '');
        }

        ++id
        const t = this.get_token( id, parent, PRE.name, '');
        console.log("#3: ", t)
        elments.push(t);

        parent = t;

        raw = raw.replace(m[0], '');
      }
    });

    console.log("##################");
    console.log(elments);
  }
}
