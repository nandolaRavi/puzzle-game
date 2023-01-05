import { createSlice } from '@reduxjs/toolkit'

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

const remove_Entity = (containerObj, id) => {
  containerObj.entity = containerObj.entity.filter((item) => { return item.id !== id });
}

const checkContainerStatus = (mountainObject) => {
  let priestLength = mountainObject.entity.filter((e) => { return e.type === 'priest' }).length
  let devilLength = mountainObject.entity.filter((e) => { return e.type === 'devil' }).length;
  if (priestLength === 0) {
    return null;
  };
  if (devilLength === 0) {
    return null;
  }
  if (priestLength < devilLength) {
    return true;
  } else {
    return false;
  }
};


const moveBoatContainer = (containerObj) => {
  if (containerObj.direction == 'right') {
    setTimeout(() => {
      containerObj.direction = 'left';
    }, 1500);
  } else {
    setTimeout(() => {
      containerObj.direction = 'right';
    }, 1500);
  };
};

const initialState = {
  boat: createContainer('right', 'boat'),
  mountain1: createContainer('left', 'mountain'),
  mountain2: createContainer('right', 'mountain'),
  isGameOver: false,
  movePx: ''
}

export const shipSlice = createSlice({
  name: 'puzzle',
  initialState,
  reducers: {
    addRemoveEntity: (state, action) => {
      let mountainObj = state.boat.direction === 'right' ? state.mountain2 : state.mountain1
      if (action.payload.obj.type === 'mountain') {
        if (state.boat.entity.length < 2 && action.payload.obj.direction === state.boat.direction) {
          remove_Entity(mountainObj, action.payload.obj.id);
          state.boat.entity.push(action.payload.obj)
        }
      } else {
        switch (action.payload.obj.direction) {
          case 'right': {
            remove_Entity(mountainObj, action.payload.obj.id);
            state.mountain2.entity.push(action.payload.obj)
            break;
          };
          case 'left': {
            remove_Entity(mountainObj, action.payload.obj.id);
            state.mountain1.entity.push(action.payload.obj)
          };
        };
      };
    },

    moveBoat: (state, action) => {
      if (state.boat.entity.length === 0) {
        return;
      };
      switch (action.payload.boatObject.direction) {
        case 'right': {
          moveBoatContainer(action.payload.boatObject)
          let target = checkContainerStatus(state.mountain2)
          if (target) {
            state.isGameOver = true;
            return;
          };
          state.isGameOver = false
          state.movePx = '45rem'
          break;
        };
        case 'left': {
          moveBoatContainer(action.payload.boatObject)
          let target = checkContainerStatus(state.mountain1)
          if (target) {
            state.isGameOver = true;
            return;
          };
          state.isGameOver = false;
          state.movePx = '-=45rem';
        }
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { moveBoat, addRemoveEntity } = shipSlice.actions

export default shipSlice.reducer