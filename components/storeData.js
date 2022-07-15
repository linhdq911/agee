import { createStore } from 'redux';
// const data = [
//   {
//     id: '1',
//     title: 'Linh ',
//     age: '20',
//   },
//   {
//     id: '2',
//     title: 'Son ',
//     age: 21,
//   },
//   {
//     id: '3',
//     title: 'Canh ',
//     age: 22,
//   },
//   {
//     id: '4',
//     title: 'Bich ',
//     age: 20,
//   },
//   {
//     id: '5',
//     title: 'Vu ',
//     age: 21,
//   },
//   {
//     id: '6',
//     title: 'Dang ',
//     age: 22,
//   }, {
//     id: '7',
//     title: 'Kien ',
//     age: 20,
//   },
//   {
//     id: '8',
//     title: 'Sao ',
//     age: 21,
//   },
//   {
//     id: '9',
//     title: 'Vu Gia ',
//     age: 22,
//   },
//   {
//     id: '10',
//     title: 'Nam ',
//     age: 27,
//   },
// ];


const defaultState = {
  data: [],
  chosedData: [],
};


const reducer = (state = defaultState, action) => {
  if (action.type === 'ADD_DATA') {
    return { ...state, data: action.data };
  }

  if (action.type === 'CHOSE_DATA') {

    let tmp = [...state.chosedData]
    tmp.push(action.data)

    return { ...state, chosedData: tmp };
  }
  if (action.type === 'DELETE') {
    let tmp = [...state.chosedData]
    let indexDelete = tmp.findIndex(i => i.id == action.payload)
    console.log(indexDelete, action.payload)
    if (indexDelete >= 0) {
      tmp.splice(indexDelete, 1)
    }
    console.log(tmp)
    return { ...state, chosedData: tmp };
  }
  if (action.type === 'EDIT') {
    let tmp = [...state.chosedData]
    let objIndex = tmp.findIndex((tmp => tmp.id === action.payload.id));
    //  console.log(objIndex)
    // console.log('before update: ', tmp[objIndex]);
    tmp[objIndex].partnerName = action.payload.val;
    // console.log("after update: ", tmp[objIndex]);

  }
  if (action.type === 'SEARCH') {
    // if(action.payload.val == '' || undefined) return {...state, data: data}
    let tmp = [...state.data]
    let searchString = action.payload.val || '';
    let searchData = tmp.filter(tmp => tmp.partnerName.toLowerCase().includes(searchString.toLowerCase()))
    console.log(searchData)
    return{...state, data: searchData}
  }

  return state;
};

const store = createStore(reducer);
export const CHOSE_DATA = "CHOSE_DATA";

export default store