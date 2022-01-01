class ErrorToken {
    constructor(message){
        this.passed = false
        this.message = message
    }

    constructor(){
        this.passed = true
        this.message = "no errors"
    }
}