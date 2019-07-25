import {Dimensions} from 'react-native';

global.WHITE = '#FFFFFF'
global.BLACK = '#000000'
global.BLUE = '#1296DB'
global.GRAY = '#515151'
global.LINE = '#EEEEEE'
global.PALEGREY = '#E6E6E6'

const {width, height} = Dimensions.get('window');

// 用户登录信息
global.userInfo = null

global.PROPORTIONW = (num) => {
    return (num / 375 * width)
}
