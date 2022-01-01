import Profile from "./Profile";
import { auth } from "../database/firebase-index";

const { db } = require("../database/firebase-index");

export default class ProfileFactory{
    constructor() {
        this.newProfile = null
    }

    startProfileCreation(){
        this.newProfile = new Profile()
    }

    addEmail = async (email) => {
        console.log("AE:1")
        if(this.newProfile != null) {
            try {
                this._checkEmailViability(email)
                console.log("AE:pass")
                return true
            } catch (error) {
                console.log("AE:fail")
                throw error
                
            }
        } else {
            throw new Error('Must create profile before adding email to it');
        }
        
    }

    _checkEmailViability(email) {
        try {
            console.log("CEV:1")
            this._checkEmailFormat(email)
            console.log("CEV:2")
            this._checkEmailAvailability(email);
            console.log("CEV:3")
            return true
        } catch(error) {
            throw error
        }
        return false
        


        

    }

    _checkEmailFormat(email){
        let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(mailFormat)) {
            return true;
        }
        throw new Error("Please input a valid email");
    }

    async _checkEmailAvailability(email) {
        await auth.signInWithEmailAndPassword(email, "fail")
          .then((response) => {
            throw new Error("Somehow Logged in with invalid pass");
          })
          .catch((error) => {
            if (error.code === 'auth/wrong-password') {
              throw new Error("An accound already exists with that email")
            }
            if (error.code === 'auth/user-not-found') {
              return true;
            }
            if (error.code === 'auth/too-many-requests')  {
              throw new Error("Please wait a few seconds before your next attempt")
            }
            throw error
          })
      }

    addPassword(password) {
        if(this.newProfile != null) {
            this.newProfile.setPassword(password);
        } else {
            throw new Error('Must create profile before adding password to it');
        }
    }

    addName(firstname, lastname) {
        if(this.newProfile != null) {
            this.newProfile.setFirstname(firstname);
            this.newProfile.setLastname(lastname);
        } else {
            throw new Error('Must create profile before adding name to it');
        }
        
    }

    _validateEmail(email) {
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(mailFormat)) {
            return true;
        }
        return false;
    }

    getNewProfile(){
        if(this.newProfile != null) {
            const newProfile = this.newProfile;
            this.newProfile = null;
            return newProfile;
        } else {
            throw new Error('Must create profile before getting it');
        }
    }



    


}