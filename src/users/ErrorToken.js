export default class ErrorToken {
    

    constructor(message="NO ERRORS"){
        this.passed = message === "NO ERRORS"
        this.message = message
    }

}