import Utils from "./Utils";

class Token {
    static getToken(data) {
        var token;
        if (token !== "") {
            var token = Utils.getCookie("token");
            return token;
        } else {
            return token;
        }

    }

}
export default Token;