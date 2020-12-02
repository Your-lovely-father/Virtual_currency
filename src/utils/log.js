/*
    author: ZhiYuanWang
    describe：输出框
    function:王晓冷_console.log( ${JSON.stringify(val)} )
    time: 2020-39-29 14:39:18
*/
const Log ={
  setLog(val){
    console.log(`%c ${
      val==undefined?'console.log( 王晓冷 )': 'console.log'+'( ' + JSON.stringify(val) + ' )'
    }`,` -webkit-text-fill-color:transparent;
            -webkit-text-stroke:1px #000;
            font-weight: bold;
            font-size: 1.6em;
            text-shadow: 0px 6px 3px #83ACDB;`)
  }
}
export default Log
