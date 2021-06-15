import initialState from './initial-state';

const sampleReducer = (state = initialState.auth, action: any) => {
  switch (action.type) {
    case 'SIGN_UP_REQUEST':
      return {
        ...state,
        loading: true,
        success: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export default sampleReducer;
