const initialStateArr = {
  loading: false,
  data: [],
  error: false,
};

const initialStateObj = {
  loading: false,
  error: false,
  data: {},
};

export default {
  auth: {
    ...initialStateObj,
    isSignout: false,
    userToken: '',
  },
  profile: {
    ...initialStateObj,
  },
  singleTask: {
    ...initialStateObj,
  },
  reward: {
    ...initialStateObj,
  }
};
