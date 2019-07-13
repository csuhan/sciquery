// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require('got')
const querystring = require('querystring')
const cheerio = require('cheerio')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  //获取期刊名称
  let sciname = event.sciname
  let querys = querystring.stringify({ q: sciname, sci: 1 });

  let resp = await got('http://sci.justscience.cn/?' + String(querys))

  const $ = cheerio.load(resp.body)
  const lists = $(".tb1 tr")
  if (lists.children().length == 0) {
    return -1
  }else{
    let jounalLists = lists.map((i, item) => {
      return {
        no: $(item).children().eq(0).text(),
        sciname: $(item).children().eq(1).text(),
        scisname: $(item).children().eq(2).text(),
        issn: $(item).children().eq(3).text(),
        pnum: $(item).children().eq(4).text(),
        if5: $(item).children().eq(5).text(),
        ifnot: $(item).children().eq(6).text(),
        if: $(item).children().eq(7).text(),
      }
    }).get()
    jounalLists.shift()
    return jounalLists
  }
}