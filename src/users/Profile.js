class Profile {

    constructor(){
        this.username = ""
        this.password = ""
        this.firstname = ""
        this.lastname = ""
        this.age = 0
        this.hometown = ""
        this.workAndEducation = ""
        this.relationshipStatus = ""
        this.pronouns = ""
        this.sign = ""
        this.currentInterests = []
        this.bacHistory = []
        this.starredProfiles = []
        this.instagram = ""
        this.snapchat = ""
        this.linkedIn = ""
    }

    getUsername() {
        return this.username
    }
    getPassword() {
        return this.password
    }
    getFirstname() {
        return this.firstname
    }
    getLastname() {
        return this.lastname
    }
    getAge() {
        return this.age
    }
    getHometown() {
        return this.hometown
    }
    getWorkAndEducation() {
        return this.workAndEducation
    }
    getRelationshipStatus() {
        return this.relationshipStatus
    }
    getPronouns() {
        return this.pronouns
    }
    getSign() {
        return this.sign
    }
    getCurrentInterests() {
        return this.currentInterests
    }
    getBacHistory() {
        return this.bacHistory
    }
    getStarredProfiles() {
        return this.starredProfiles
    }
    getInstagram() {
        return this.instagram
    }
    getSnapchat() {
        return this.snapchat
    }
    getLinkedIn() {
        return this.linkedIn
    }


}

export default { Profile }