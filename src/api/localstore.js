const STORAGE_KEY='login_store_info'
const STORAGE_TIME_KEY='login_store_info_time'
export default{
    fetch(){
        var timestamp = (new Date()).valueOf();
        return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY)||'{}')
    },
    save(items){
        var timestamp = (new Date()).valueOf();
        window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(items))
    },
    clear(){
        window.sessionStorage.removeItem(STORAGE_KEY)
    }
}