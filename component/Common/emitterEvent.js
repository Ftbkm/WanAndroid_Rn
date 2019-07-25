/**
 * 用于存储事件类型
 */
export default class EmitterEvents {

    /**
     * 返回页面属性
     */
    static LOGIN = 'LOGIN'
    static LOGOUT = 'LOGOUT'
    static QUOTATION_SOCKET = 'QUOTATION_SOCKET'


    /**
     * 数据缓存key属性
     */
    static loginStatus = 'loginStatus'
    static userLanguage = 'userLanguage'
    static userInfo = 'userInfo'
    static userGetPass = 'userGetPass'
    static priceType = 'priceType'
    static showNewFeature = 'showNewFeature'
}