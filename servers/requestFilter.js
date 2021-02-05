/**
 * 对接口返回的后端错误进行格式转化
 * @param {接口成功返回的数据} res 
 */
const formatError = (err) =>{
  uni.showToast({
    title: err.message,
    mask: false,
    icon: 'none',
    duration: 3000
  })
};

export default formatError;
