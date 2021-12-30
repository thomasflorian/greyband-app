import Profile from "./Profile";

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

    isViableUsername(username){
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
            console.log("2")
            this.isViableEmail(email).then(value => {
                if (value) {
                    console.log("3")
                    this.newProfile.setEmail(email);
                    console.log("4")
                } else {
                    throw "An account already exists with this email"
                }
            })


            // if(this.isViableEmail(email)){
            //     console.log("3")
            //     this.newProfile.setEmail(email);
            //     console.log("4")
            // } else {
            //     throw "An account already exists with this email"
            // }
        } else {
            throw new Error('Must create profile before adding email to it');
        }
        
    }

    isViableEmail(email) {
        console.log(email);
        console.log("q")
        var usersRef = db.collection("users");
        console.log("w")
        const usernameQuery = usersRef.where("email", "==", email);
        console.log("e")
        usernameQuery.get().then((querySnapshot) => {
            console.log("r")
            return new Promise((resolve) => {
                querySnapshot.exists ? resolve(true) : resolve(false)
            })
            // if(querySnapshot.exists) {
            //     console.log("Document data:", doc.data());
            //     return false
            // } else {
                
            //     return true
                
            // }
        }).catch((error) => {
            console.log("Error getting username in usernameExists check: ", error);
            return false
        })
        console.log("t")
        

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