import Profile from "./Profile";
import { auth } from "../database/firebase-index";
import ErrorToken from "./ErrorToken";

const { db } = require("../database/firebase-index");

export default class ProfileFactory{
    constructor() {
        this.newProfile = null
    }

    startProfileCreation(){
        this.newProfile = new Profile()
    }

    addEmail = (unformattedEmail) => {
        let email = unformattedEmail.toLowerCase()
        console.log("AE:1")
        if(this.newProfile != null) {
            console.log("AE:isPorfile")
            return this._checkEmailViability(email);
        } else {
            console.log("AE:noProfile")
            return new ErrorToken('Must create profile before adding email to it');
        }
        
    }

    _checkEmailViability(email) {
        console.log("CEV:1")
        let emailFormatToken = this._checkEmailFormat(email)
        console.log("CEV:2")
        if(emailFormatToken.passed){
            console.log("CEV:passed")
            return this._checkEmailAvailability(email)
        }
        console.log("CEV:failed")
        return emailFormatToken
    }

    _checkEmailFormat(email){
        let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(mailFormat)) {
            return new ErrorToken();
        }
        return new ErrorToken("Please input a valid email");
    }

    async _checkEmailAvailability(email) {
        console.log("CEA:1")
        const emailToken = await this._getEmailAvailabilityFromServer(email);
        console.log("CEA:2")
        return emailToken;
    }


    _getEmailAvailabilityFromServer(email) {
        return auth.signInWithEmailAndPassword(email, "fail")
          .then((response) => {
            throw new Error("CRITICAL ERROR: LOGGED IN WHEN GETTING EMAIL AVAILABILITY FROM SERVER")
          })
          .catch((error) => {
            if (error.code === 'auth/wrong-password') {
              return new ErrorToken("An accound already exists with that email")
            }
            if (error.code === 'auth/user-not-found') {
              return new ErrorToken();
            }
            if (error.code === 'auth/too-many-requests')  {
              return new ErrorToken("Please wait a few seconds before your next attempt")
            }
            return new ErrorToken("Critical Error: " + error.code)
          })
    }

    _addPassword(password) {
        if(this.newProfile != null) {
            return this.newProfile.setPassword(password);
        } else {
            return new ErrorToken('Must create profile before adding password to it');
        }
    }

    _addName(firstname, lastname) {
        if(this.newProfile != null) {
            this.newProfile.setFirstname(firstname);
            this.newProfile.setLastname(lastname);
            return new ErrorToken()
        } else {
            return new ErrorToken('Must create profile before adding name to it');
        }
        
    }



    


}