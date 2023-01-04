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
export const createEntity = (type) => {
  return {
    type: type,
    id: Math.floor(Math.random() * 100),
  }
};
export const createContainer = (direction, postion, type) => {
  return {
    direction: direction,
    postion: postion,
    entitys: [],
    type: type
  };
};

// export const move = (containerObj) => {
//   switch (containerObj.direction) {
//     case entityType.left: {
//       if (containerObj.position < 0) {
//         containerObj.position = 0;
//       }
//       containerObj.postion - 1;
//       break;
//     };
//     case entityType.right: {
//       if (containerObj.position >= 100) {
//         containerObj.position = 100;
//       };
//       containerObj.position + 1;
//       break;
//     };
//   };
// };
//remove People container 
export const removePeopleContainer = (obj, peopleId) => {
 return obj.entitys = obj.entitys.filter(e => { return e.id !== peopleId });
  // if (containerObj.type == 'boat') {
  //   checkBoatStatus(containerObj);
  //   return;
  // }
  // checkContainerStatus(containerObj);
}; 

// //add people container
// export const addPeopleContainer = (containerObj, pepoleObj) => {
//   containerObj.entitys.push(pepoleObj);
//   if (containerObj.type == 'boat') {
//     checkBoatStatus(containerObj);
//     return;
//   }
//   checkContainerStatus(containerObj);
// };

// //check checkContainerStatus  
// const checkContainerStatus = (containerObj) => {
//   let personLength = containerObj.entitys.filter((e) => { return e.type === 0 })?.length
//   let giantLength = containerObj.entitys.filter((e) => { return e.type === 1 })?.length
//   if (personLength !== giantLength) {
//     return false;
//   };
// }
// //chack boat status
// const checkBoatStatus = (containerObj) => {
//   let personLength = containerObj.entitys.filter((e) => { return e.type === 0 })?.length
//   let giantLength = containerObj.entitys.filter((e) => { return e.type === 1 })?.length
//   if (containerObj.entitys.length > 2) {
//     if (personLength !== giantLength) {
//       return false;
//     }
//   };
// };

const initialState = {
  entitys: [
  ]
}

export const shipSlice = createSlice({
  name: 'puzzle',
  initialState,
  reducers: {
    moveboatContainer: (state, action) => {
      // move(action.payload);
    },
    removeEntity: (state, action) => {
     action.payload.entitys = action.payload.obj.entitys.filter((item) => { return item.id !== action.payload.id })
    },
    addEntity: (state, action) => {
      action.payload.boatObj.entitys.push(action.payload.obj)
    }
  },


})

// Action creators are generated for each case reducer function
export const { createPerson, createGiant, removeEntity, addEntity } = shipSlice.actions

export default shipSlice.reducer