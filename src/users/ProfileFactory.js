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


    addUsername(username) {
        if(this.newProfile != null) {
            if(isViableUsername(username)){
                this.newProfile.setUsername(username);
            } else {
                throw "An account already exists with this username"
            }
        } else {
            throw new Error('Must create profile before adding username to it');
        }
        
    }

    _isViableUsername(username){
        var usersRef = db.collection("users");
        const usernameQuery = usersRef.where("username", "==", username);
        usernameQuery.get().then((querySnapshot) => {
            if(querySnapshot.exists) {
                return false
            } else {
                return true
            }
        }).catch((error) => {
            console.log("Error getting username in usernameExists check: ", error);
            return false
        })
    }

    addEmail = async (email) => {
        console.log("1")
        if(this.newProfile != null) {
            try {
                this._checkEmailViability(email)
            } catch (error) {
                throw error
            }
        } else {
            throw new Error('Must create profile before adding email to it');
        }
        
    }

    _checkEmailViability(email) {
        try {
            this._checkEmailFormat(email);
            this._checkEmailAvailability(email);
        } catch(error) {
            throw error
        }

        console.log("t");
        

    }

    _checkEmailFormat(email){
        let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailString.match(mailFormat)) {
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
              return new Error("An accound already exists with that email")
            }
            if (error.code === 'auth/user-not-found') {
              return true;
            }
            if (error.code === 'auth/too-many-requests')  {
              return new Error("Please wait a few seconds before your next attempt")
            }
            return error
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

    _validateEmail(emailString) {
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailString.match(mailFormat)) {
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