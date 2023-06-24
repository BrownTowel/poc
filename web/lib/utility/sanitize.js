module.exports = {

  html_escape: function (s) {

    if (typeof s !== "string") {

      return s;
    }

    const regexp = /[&'`"<>]/g;

    return this._nl2br(
      s.replace(
        regexp,
        match => {
          return {
            '&':  "&amp;",
            '\'': "&#x27;",
            '`':  "&#x60;",
            '"':  "&quot;",
            '<':  "&lt;",
            '>':  "&gt;",
          }[match];
        }
      )
    );
  },

  _nl2br: function (s) {

    // if (typeof s !== "string") {

    //   return s;
    // }

    return s
      .replace(/\r\n/g, "<br>")
      .replace(/(\n|\r)/g, "<br>");
  }
}
