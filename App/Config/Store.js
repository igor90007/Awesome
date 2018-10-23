import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import Reducers from '../Reducers';
import { rootSaga } from '../Sagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(Reducers, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;
