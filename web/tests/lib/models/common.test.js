/**
 * @SEE https://jestjs.io/ja/docs/api
 *
 * テストファイルでは、Jest はそれぞれのメソッドとオブジェクトをグローバル環境に配置します。
 * それらを使用するために require または import する必要はありません。
 * ただし、明示的にインポートしたい場合は、'@jest/globals' から {describe, expect, test} をインポートすることができます。
 */
// import { describe, expect, test } from '@jest/globals';

/**
 * jestでimport文を使うには
 * https://qiita.com/irico/items/0fa0cde39b1305c4b508
 */
// import { PATH, _path } from "../../../lib/models/common";
// import { rmSync, existsSync } from 'fs';

/**
 * SyntaxError: Cannot use import statement outside a module
 *
 * jest SyntaxError: Cannot use import statement outside a module エラーメモ
 * https://zenn.dev/misaki_gogo/articles/d046c67a8ad635
 *
 * ts-jestでSyntaxError: Cannot use import statement outside a moduleが出た時の対処法
 * https://qiita.com/masato_makino/items/269617904a7660c85edd
 */
// const { describe, expect, test } = require('../../../node_modules/@jest/globals');

const common = require("../../../lib/models/common");
const AsyncLock = require('async-lock');
const fs = require('fs');

const schema = "tests";
const resource = "test_conversations";
const schema_path = common.PATH.DATA + '/' + schema + "/";

/**
 * @SEE https://jestjs.io/ja/docs/api#afterallfn-timeout
 *
 * このファイル内のすべてのテストが完了した後に、関数を実行します。
 * 関数がpromiseを返す、またはジェネレータ関数である場合、Jestはそのpromiseが解決されるのを待ちます。
 * オプションとして、timeout (ミリ秒) を指定して、中断前にどのくらい待機するかを指定することができます。
 */
afterAll(() => fs.rmSync(schema_path, { recursive: true, force: true }));

/*
fs.rmdir(schema_path, {
  recursive: false,
}, (error) => {
  if (error) {
    console.log(error);
  }
  else {
    console.log("Non Recursive: Directories Deleted!");
  }
});
*/

// descreibe("common", () => {

// });

/**
 * @SEE https://jestjs.io/ja/docs/api#testname-fn-timeout
 *
 * テストの実行に絶対に必要となるのは testメソッドだけです。
 * 第1引数にテスト名を、第2引数にテストの確認項目を含む関数を設定します。3番目の引数 (任意) は タイムアウト値 (ミリ秒単位) で、中止するまでの待ち時間を指定します。
 */
test("_path normal-case", () => {

  const exp_path = schema_path + resource + '.' + common.PATH.FILE_EXTENSION;

  /** ************************************************
   * Expect
   *   テストを作成する時に、値が特定の条件に合致することを確認する必要がよくあるでしょう。
   *   expect によって様々な事柄を検証するための数多くの "Matcher" を利用することができます。
   *
   *   @SEE https://jestjs.io/ja/docs/expect#expect
   *
   *   expect は値をテストしたい時に毎回使用する関数です。expect のみを呼び出すということはほとんどありません。
   *   代わりに、値について何らかの事をアサートする "Matcher" 関数とともに expect を使用することでしょう。
   *
   *   expect への引数はコードが生成する値であるべきであり、いかなる "Matcher" への引数は正解の値であるべきです。
   *   それらを混同して使用すれば、テストは動作するものの、失敗したテストから出力されるエラーメッセージはおかしなものになります。
   *
   *   Matcherを使用する
   *     https://jestjs.io/ja/docs/using-matchers
   *   Matchers
   *     https://jestjs.io/ja/docs/expect#matchers
   *
   * ************************************************/

  /**
   * @SEE https://jestjs.io/ja/docs/expect#tobevalue
   *
   * プリミティブ値を比較したり、オブジェクトインスタンスの参照IDを確認したりするには、toBe を使用します。
   */
  expect(common._path(schema, resource)).toBe(exp_path);
  /**
   * @SEE https://jestjs.io/ja/docs/expect#tobetruthy
   *
   * 値がどのようなものかを気にせず、真偽値のコンテクストの中で値が真であることを確認したい場合は.toBeTruthy を使用して下さい。
   * JavaScriptでは、偽と類推される６つの値があります: false、 0、 ''、 null、 undefined、 そして NaNです。 他の全ては真と類推されます。
   */
  expect(fs.existsSync(schema_path)).toBeTruthy()
});

/**
 * @SEE https://jestjs.io/ja/docs/api#describename-fn
 *
 * describe(name, fn) は、いくつかの関連するテストをまとめたブロックを作成します。
 * これは必須ではありません - テスト ブロックをトップレベルに直接書き込むことができます。しかしテストをグループにまとめたい場合には便利です。
 * テストに階層構造を持たせたい場合でも describeをネストすることができます。
 */
describe("Error case", () => {

  test("fetch 1", () => {
    /**
     * @SEE https://jestjs.io/ja/docs/mock-functions
     *
     * @SEE https://jestjs.io/ja/docs/mock-function-api#jestfnimplementation
     * Correct mock typings will be inferred if implementation is passed to jest.fn().
     * There are many use cases where the implementation is omitted.
     * To ensure type safety you may pass a generic type argument
     *
     * リファレンスが日本語化されていなかったので近い内容のQiita記事.
     *   https://qiita.com/YSasago/items/6109c5d3fbdbffa31c9f
     */
    common.read = jest.fn(() => null);

    const [ret, data] = common.write(schema, resource, { user: "test-user", content: "test-content" });

    expect(ret).toBeFalsy();
    expect(data).toMatchObject({});

    /*
     * mockFn.mockRestore() only works when the mock was created with jest.spyOn().
     * （ mockRestore() は spyOn() でモック化した関数にしか働かない. ）
     * このため手動で jest.fn()を割り当てた場合は自分で復元作業を行わなければならないことに気をつけて下さい。
     */
    common.read = (schema, resource) => {

      const path = common._path(schema, resource);

      return JSON.parse(
        fs.existsSync(path) ?
          fs.readFileSync(path, { encoding: common.ENCODING }) :
          `{}`
      );
    };
  });

  test("fetch 2", () => {
    /**
     * @SEE https://jestjs.io/ja/docs/jest-object#jestspyonobject-methodname
     *
     * jest.fnと同様の関数を作成しますが、引数に与えられたobject[methodName]へのコールも実装します。
     * Jestの モック関数を返します。
     *
     * @SEE https://jestjs.io/ja/docs/jest-object#jestspyonobject-methodname-accesstype
     *
     * Jest 22.1.0+ からは jest.spyOn メソッドはオプションの第3引数 accessType を取るようになりました。
     * この引数には 'get' または 'set' を指定することができ、それぞれゲッタやセッタをスパイしたい場合に便利です。
     */
    const spy = jest.spyOn(common, "read").mockImplementation(() => null);

    // let log = "";
    // const spy2 = jest.spyOn(console, "log").mockImplementation(message => { log = message });

    const [ret, data] = common.write(schema, resource, { user: "test-user", content: "test-content" });

    expect(ret).toBeFalsy();
    expect(data).toMatchObject({});
    // expect(log).toBe("AA");
    // expect(spy2).toBeCalled();
    // expect(spy2.mock.calls[0][0]).toBe();


    /**
     * @SEE https://jestjs.io/ja/docs/mock-function-api#mockfnmockrestore
     *
     * Does everything that mockFn.mockReset() does, and also restores the original (non-mocked) implementation.
     * あるテストケースでモック関数を利用して他のテストケースでは本物のモジュールに戻したいときに便利です。
     */
    spy.mockRestore();
    // spy2.mockRestore();
  });
});
