import { Check } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit'
import { type } from '@testing-library/user-event/dist/type';

//this will use check entity type
// tested
const entityType = {
  person: 0,
  giant: 1,
};

// this is directionObj
// tested
const directionsObj = {
  left: 'left',
  right: 'right',
  top: 'top',
  bottom: "bottom"
}

//this will use for a create new entity 
// tested 
const createEntity = (type) => {
  return {
    type: type,
    id: Math.floor(Math.random() * 100),
  }
};
const createContainer = (direction, postion, type) => {
  return {
    direction: direction,
    postion: postion,
    type: type,
    entitys: createEntity(directionsObj.left)
  };
};

export const move = (containerObj) => {
  switch (containerObj.direction) {
    case entityType.left: {
      if (containerObj.position < 0) {
        containerObj.position = 0;
      }
      containerObj.postion - 1;
      break;
    };
    case entityType.right: {
      if (containerObj.position >= 100) {
        containerObj.position = 100;
      };
      containerObj.position + 1;
      break;
    };
  };
};

//remove People container 
export const removePeopleContainer = (containerObj, peopleId) => {
  containerObj.entitys = containerObj.entitys.filter(e => { return e.id !== peopleId });
  // if (containerObj.type == 'boat') {
  //   checkBoatStatus(containerObj);
  //   return;
  // }
  checkContainerStatus(containerObj);
};

//add people container
export const addPeopleContainer = (containerObj, pepoleObj) => {
  containerObj.entitys.push(pepoleObj);
  if (containerObj.type == 'boat') {
    checkBoatStatus(containerObj);
    return;
  }
  checkContainerStatus(containerObj);
};

//check checkContainerStatus  
const checkContainerStatus = (containerObj) => {
  let personLength = containerObj.entitys.filter((e) => { return e.type === 0 })?.length
  let giantLength = containerObj.entitys.filter((e) => { return e.type === 1 })?.length
  if (personLength !== giantLength) {
    return false;
  };
}
//chack boat status
const checkBoatStatus = (containerObj) => {
  let personLength = containerObj.entitys.filter((e) => { return e.type === 0 })?.length
  let giantLength = containerObj.entitys.filter((e) => { return e.type === 1 })?.length
  if (containerObj.entitys.length > 2) {
    if (personLength !== giantLength) {
      return false;
    }
  };
};


export const shipSlice = createSlice({
  name: 'puzzle',
  initialState,
  reducers: {
    createEntity1: (state, action) => {

    },
    //create  new giant
    createGiant: (state, action) => {

    },
    // set ship direction
    setDirections: (state, action) => {

    },

    // set ship postions
    setPostion: (state, action) => {

    },

    //remove pepole in ship
    removePeople: (state, action) => {

    },

    // add pepople in ship
    addPeople: (sate, action) => {

    },
  },

})

// Action creators are generated for each case reducer function
export const { createPerson, createGiant, createEntity1 } = shipSlice.actions

export default shipSlice.reducer