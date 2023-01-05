// add addEntity function;
let boatObject = {};
let mountain1 = {};
let mountain2 = {};


function test_addEntityMotain2(object) {
    if (boatObject.direction !== object.direction) {
        throw 'test case failed';
    }
    if (object.entity.length > 6) {
        throw 'test case failed';
    }
};

function test_addEntityMotain1(object) {
    if (boatObject.direction !== object.direction) {
        throw 'test case failed';
    }
    if (object.entity.length > 6) {
        throw 'test case failed';
    }
};

function test_addBoatContainer_entity(boatObject) {
    if (boatObject.entity.length > 2) {
        throw 'test case failed';
    }
    if (boatObject.entity.length === 0) {
        throw 'test case failed';
    }
};

function test_cheack_game_status(mountainObj) {
    if (mountainObj.priestLength < mountainObj.devilLength) {
        throw 'test case failed';
    }
};

function test_move_boat(boatObj) {
    if (boatObj.entity.length > 2) {
        throw 'test case failed';
    }
};

function test_moveBoat_right_to_left(boatObj) {
    if (boatObj.direction !== 'right') {
        throw 'test case failed';
    }
};

function test_moveBoat_left_to_right(boatObj) {
    if (boatObj.direction !== 'left') {
        throw 'test case failed';
    }
};
