const { MAILS, MAILS_SUCCESS, MAILS_FAILED } = require('./types');

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
  test: '',
};

function mailReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case MAILS:
      return {
        ...INITIAL_STATE,
        loading: true,
      };
    case MAILS_SUCCESS:
      return {
        ...INITIAL_STATE,
        data: action.payload,
        test: 'testing',
      };
    case MAILS_FAILED:
      return {
        ...INITIAL_STATE,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default mailReducer;
