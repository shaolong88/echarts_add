import { combineReducers } from 'redux'

  //echarts状态
  function reducer_echarts(state = {}, action) {
    switch (action.type) {
        case 'EchartsIndexName':
            console.log("EchartsIndexName");
            console.log(action.payload);
            return { EchartsIndexName: action.payload };
        default:
            return state;
    }
}

  export default combineReducers({
   reducer_echarts
})