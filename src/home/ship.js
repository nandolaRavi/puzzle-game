
//Create mountain
export function creaetMountain(person, giant) {
    return {
        person: person,
        giant: giant,
    };
};
export default create
//Create shipObj
export function createShip() {
    return {
        direction: '',
        postion: '',
        person: [],
        giant: [],
        numOfPeople: person.length + giant.length,

        setDirection: function (direction) {
            this.direction = direction;
        },

        getDirection: function () {
            return this.direction
        },

        setPostion: function (postion) {
            this.postion = postion
        },

        getPostion: function () {
            return this.postion;
        },

        getDirection: function () {
            this.postion
        },

        addPerson: function (person) {
            this.person.push(person)
        },

        addGiant: function (giant) {
            this.giant.push(giant)
        }
    }
}