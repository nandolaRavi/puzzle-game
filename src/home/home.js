
export const createEntity = (type) => {
    return {
        type: type,
        id: Math.floor(Math.random() * 100),
    }
};

export const createContainer = (direction, type) => {
    return {
        direction: direction,
        entity: [],
        type: type
    };
};

export function createGame() {
    return {
        isGameOver: false,
        subscribe: function () {
            console.log("this is old subscribe");
        },
        setSubscribe: function (cn) {
            this.subscribe = cn;
        },
        removeEntity: function (containerObj, id) {
            containerObj.entity= containerObj.entity.filter((item) => { return item.id !== id });
            this.subscribe();
        },

        addEntity: function (containerObj, entityObj) {
            containerObj.entity.push(entityObj);
            this.subscribe();
        },

        moveBoatContainer: function (containerObj) {
            if (containerObj.direction == 'right') {
                setTimeout(() => {
                    containerObj.direction = 'left';
                }, 1500);
            } else {
                setTimeout(() => {
                    containerObj.direction = 'right';
                }, 1500);
            };
        },

        checkContainerStatus: function (mountainObject) {
            let priestLength = mountainObject.entity.filter((e) => { return e.type === 'priest' }).length
            let devilLength = mountainObject.entity.filter((e) => { return e.type === 'devil' }).length;
            if (priestLength === 0) {
                return;
            };
            if (devilLength === 0) {
                return;
            }
            if (priestLength < devilLength) {
                this.isGameOver = true;
            } else {
                this.isGameOver = false;
            }
            this.subscribe();
        },
    };
};