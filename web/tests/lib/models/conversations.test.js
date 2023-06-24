const conversations = require("../../../lib/models/conversations");
require('date-utils');
const fs = require('fs');

const test_conversations_path = "data/tests/";
const test_conversations_file = "test_conversations.json";

/**
 * @SEE https://jestjs.io/ja/docs/api#beforeeachfn-timeout
 *
 * このファイルのテストを実行する前に、関数を実行します。
 * 関数がpromiseを返すか、ジェネレータ関数である場合、Jestはテストを実行する前にpromiseが解決されるのを待ちます。
 * オプションとして、timeout (ミリ秒) を指定して、中断前にどのくらい待機するかを指定することができます。
 */
beforeEach(() => {
  conversations.SCHEMA = "tests";
  conversations.RESOURCE = "test_conversations";
});
/**
 * @SEE https://jestjs.io/ja/docs/api#beforeallfn-timeout
 *
 * このファイルの各テストが実行される前に、関数を実行します。
 * 関数がpromiseを返す、またはジェネレータ関数の場合、Jestはテストを実行する前にpromiseが解決されるのを待ちます。
 * オプションとして、timeout (ミリ秒) を指定して、中断前にどのくらい待機するかを指定することができます。
 */
beforeAll(() => { fs.rmSync(test_conversations_path + test_conversations_file, { recursive: true, force: true }) });

afterAll(() => fs.rmSync(test_conversations_path, { recursive: true, force: true }));

test("create normal-case", () => {

  const args = {
    user: "test-user",
    content: "Hello test"
  };

  const [ ret, d ] = conversations.create(args);

  expect(ret).toBeTruthy();
  /**
   * @SEE https://jestjs.io/ja/docs/expect#tohavepropertykeypath-value
   *
   * オブジェクトの指定された参照keyPathのプロパティが存在するかを確認するには、.toHaveProperty を使用して下さい。
   * オブジェクト内で深くネストされたプロパティをチェックするには、 深い階層を参照するために、 ドット表記や keyPath を含む配列を使用することができます。
   */
  expect(d).toHaveProperty("user", args.user);
  expect(d).toHaveProperty("content", args.content);
  /**
   * @SEE https://jestjs.io/ja/docs/expect#tohavelengthnumber
   *
   * オブジェクトが.lengthプロパティを持ち、特定の数値であるかを確認するには、.toHaveLength を使用して下さい。
   * 配列や文字列のサイズを確認するのに特に便利です。
   */
  expect(d.created_at).toHaveLength(( new Date() ).toFormat("YYYYMMDDHH24MISS").length);
});

test("fetch normal-case", () => {

  fs.promises.mkdir(test_conversations_path, { recursive: true });

  const data = {
    "0": {
      "user":"test-user A",
      "content":"Hello test A",
      "created_at":"20230623233125"
    },
    "1": {
      "user":"test-user B",
      "content":"Hello test B",
      "created_at":"20230623233141"
    },
    "2":{
      "user":"test-user C",
      "content":"Hello test C",
      "created_at":"20230623005104"
    }
  };

  fs.writeFileSync(test_conversations_path + test_conversations_file, JSON.stringify(data));

  const exp_fetch = [
    {
      id: '2',
      user: 'test-user C',
      content: 'Hello test C',
      created_at: '20230623005104'
    },
    {
      id: '1',
      user: 'test-user B',
      content: 'Hello test B',
      created_at: '20230623233141'
    },
    {
      id: '0',
      user: 'test-user A',
      content: 'Hello test A',
      created_at: '20230623233125'
    }
  ];

  // console.log(conversations.fetch(0, 3));

  expect(conversations.fetch(0, 3)).toMatchObject(exp_fetch);
});
