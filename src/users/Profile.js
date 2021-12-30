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
    //Getter Methods
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


    //Setter Methods
    setUsername(username) {
        this.username = username
    }
    setPassword(password) {
        this.password = password
    }
    setFirstname(firstname) {
        this.firstname = firstname
    }
    setLastname(lastname) {
        this.lastname = lastname
    }
    setAge(age) {
        this.age = age
    }
    setHometown(hometown) {
        this.hometown = hometown
    }
    setWorkAndEducation(workAndEducation) {
        this.workAndEducation = workAndEducation
    }
    setRelationshipStatus(relationshipStatus) {
        this.relationshipStatus = relationshipStatus
    }
    setPronouns(pronouns) {
        this.pronouns = pronouns
    }
    setSign(sign) {
        this.sign = sign
    }
    setCurrentInterests(currentInterests) {
        this.currentInterests = currentInterests
    }
    setBacHistory(bacHistory) {
        this.bacHistory = bacHistory
    }
    setStarredProfiles(starredProfiles) {
        this.starredProfiles = starredProfiles
    }
    setInstagram(instagram) {
        this.instagram = instagram
    }
    setSnapchat(snapchat) {
        this.snapchat = snapchat
    }
    setLinkedIn(linkedIn) {
        this.linkedIn = linkedIn
    }




}

export default { Profile }