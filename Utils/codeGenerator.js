const codeGenerator = () => {
    const minNum = 10000;
    const maxNum = 99999;
    const randomCode = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    return randomCode
}
module.exports = codeGenerator