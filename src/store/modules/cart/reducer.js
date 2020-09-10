import produce from 'immer';

export default function cart(state = [] ,action) {

  switch(action.type){

    //Add to cart reducer
    case 'ADD_TO_CART_SUCCESS':
      return produce(state, draft => {
        const { product } = action ;
        draft.push(product);
      })

    //remove from cart reducer
    case 'REMOVE_FROM_CART':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.payload)
        if(productIndex>=0){
          draft.splice(productIndex,1);
        }
      })

    //update amount reducer
    case 'UPDATE_AMOUNT_SUCCESS': {
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id)
        if(productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
        }
      });
    }
    
    //default state
    default:
      return state;
  }
}