let lastId = 0;
export const createEntity = (type) => {
    lastId++;
    return {
        type: type,
        id: lastId,
    }
};

export const createContainer = (direction, type) => {
    return {
        direction: direction,
        entity: [],
        type: type,
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
            containerObj.entity = containerObj.entity.filter((item) => { return item.id !== id });
            this.subscribe();
        },

        addEntity: function (containerObj, entityObj) {
            containerObj.entity.push(entityObj);
            this.subscribe();
        },

        moveBoatContainer: function (containerObj) {
            setTimeout(() => {
                containerObj.direction = containerObj.direction === 'right' ? 'left' : 'right'
            }, 1500);
        },

        checkContainerStatus: function (mountainObject) {
            let total = mountainObject.entity.length;
            let priestLength = mountainObject.entity.filter((e) => { return e.type === 'priest' }).length
            let devilLength = total - priestLength;
            if (priestLength === 0 || devilLength === 0) {
                return;
            };
            if(total === 6){
                this.isGameOver =  true;
                return;
            }
            this.isGameOver = priestLength < devilLength;
           
            this.subscribe();
        },
    };
};