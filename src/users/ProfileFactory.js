const { default: Profile } = require("./Profile");
const { db } = require("../database/firebase-index");

class ProfileFactory{
    constructor() {
        this.newProfile = null
    }

    startProfileCreation(){
        this.newProfile = Profile()
    }


    addUsername(username) {
        if(this.newProfile != null) {
            if(_isViableUsername(username)){
                this.newProfile.setUsername(username);
                return true;
            } else {
                return false;
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

    addEmail(email) {
        if(this.newProfile != null) {
            if(_isViableEmail(email)){
                this.newProfile.setEmail(email);
                return true;
            } else {
                return false;
            }
        } else {
            throw new Error('Must create profile before adding email to it');
        }
        
    }

    _isViableEmail(email){
        var usersRef = db.collection("users");
        const usernameQuery = usersRef.where("email", "==", email);
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

    addPassword(password) {
        if(this.newProfile != null) {
            this.newProfile.setPassword(password);
            return true;
        } else {
            throw new Error('Must create profile before adding password to it');
        }
    }

    addName(firstname, lastname) {
        if(this.newProfile != null) {
            this.newProfile.setFirstname(firstname);
            this.newProfile.setLastname(lastname);
            return true;
        } else {
            throw new Error('Must create profile before adding name to it');
        }
        
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

export default { ProfileFactory }