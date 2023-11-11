import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from '@reduxjs/toolkit';
import reducer from './store/reducer';
import reduxThunk from 'redux-thunk';
import routes from './Routes.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

const store = createStore(reducer, applyMiddleware(reduxThunk));
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {routes.map((data, index) => {
              return (
                <Route
                  path={data.path}
                  key={index}
                  element={
                    data.secure ? (
                      <PrivateRoute Component={data.component} />
                    ) : (
                      <PublicRoute Component={data.component} />
                    )
                  }
                />
              );
            })}
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
