# デスクトップアプリケーション

このアプリケーションはelectronでデスクトップアプリケーションとして構築する想定

## 展望

Chromium上でデスクトップアプリとして動かすよりもPWAでブラウザアプリとして動かしたほうが多分PCのリソース的にエコ

もしくはOSのwebviewを利用するtauriで構築したほうがエコ


# Localブラウザ上での動作について

Localの静的ファイルからLocalのnode.jsサーバーにアクセスする場合CORS制約に反するので、セキュリティ上の問題があるためデフォルトではブラウザは通信を許可しない
node.jsサーバー側でレスポンスヘッダーに許可されたorigin情報をブラウザ側で読み込むことで通信が可能になるがLocalで動かす場合にoriginとなる「File://」はブラウザで拒否された

## Local用Chrome起動コマンド
> chrome.exe --disable-web-security --user-data-dir="C://Chrome dev session" --ignore-certificate-errors --allow-file-access-from-files

* CORS制約
--disable-web-security
* SSL証明書の警告回避
--ignore-certificate-errors


### 参考

* http://chrome.half-moon.org/43.html
* https://abhp.net/it/IT_Google_Chrome_950000.html


## Markdown parser

### marked.js

わりと見かけるmarkdownパーサーライブラリ
* https://marked.js.org/


### GitHub Flavored Markdown

展望としては markdown のデファクトが GitHub Flavored Markdown ぽいので GitHub Flavored Markdown の仕様で作成


仕様 GitHub Flavored Markdown
* https://github.github.com/gfm/
