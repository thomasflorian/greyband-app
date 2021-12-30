const { default: Profile } = require("./Profile");
const { db } = require("../database/firebase-index");

class ProfileFactory{
    constructor() {
        this.newProfile = null
    }

    startProfileCreation(){
        this.newProfile = Profile()
    }


    addUsernamePass(username, password) {
        if(this.newProfile != null) {
            if(this.#isViableUsername(username)){
                this.newProfile.setUsername(username);
                this.newProfile.setPassword(password);
                return true;
            } else {
                return false;
            }
        } else {
            throw new Error('Must create profile before adding contents to it');
        }
        
    }

    #isViableUsername(username){
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

    addName(firstname, lastname) {
        if(this.newProfile != null) {
            this.newProfile.setFirstname(firstname);
            this.newProfile.setLastname(lastname);
            return true;
        } else {
            throw new Error('Must create profile before adding contents to it');
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