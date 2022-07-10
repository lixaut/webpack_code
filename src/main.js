import count from './js/count'
import sum from './js/sum'
// 想要webpack打包资源，必须引入该资源
import './css/index.css'
import './less/index.less'

console.log(count(1, 2))
console.log(sum([1, 2, 3, 4]))