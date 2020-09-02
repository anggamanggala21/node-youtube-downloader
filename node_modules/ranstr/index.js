const ranstr = (length = 10) => {

    let result = Math.random().toString(36).substring(2, 12);

    if (length < 1 || typeof length != "number") return result;

    if (length > 10) {
        
        let multiple = length / 10;
        result = '';
        for (let i = 0; i < multiple; i++) {
            result += Math.random().toString(36).substring(2, 12);
        }
        result = result.substr(0, length);

    } else {
        result = result.substr(0, length);
    }

    return result;
    
}
module.exports = ranstr;