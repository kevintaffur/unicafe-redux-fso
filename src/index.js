import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD',
    });
  };
  const ok = () => {
    store.dispatch({
      type: 'OK',
    });
  };
  const bad = () => {
    store.dispatch({
      type: 'BAD',
    });
  };
  const zero = () => {
    store.dispatch({
      type: 'ZERO',
    });
  };

  const noFeedback = () => {
    if (store.getState().good === 0
      && store.getState().ok === 0
      && store.getState().bad === 0) {
      return true;
    }
    return false;
  }

  const feedback = () => {
    const all = store.getState().good + store.getState().ok + store.getState().bad;
    const average = (store.getState().good - store.getState().bad) / all;
    const positive = store.getState().good / all * 100;

    if (noFeedback()) {
      return (
        <div>
          No feedback given
        </div>
      );
    }
    return (
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{store.getState().good}</td>
          </tr>
          <tr>
            <td>ok</td>
            <td>{store.getState().ok}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{store.getState().bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{all}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{average}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{positive} %</td>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <>
      <h1>Give feedback</h1>
      <div>
        <button onClick={good}>good</button>
        <button onClick={ok}>ok</button>
        <button onClick={bad}>bad</button>
        <button onClick={zero}>reset stats</button>
      </div>
      <h2>Statistics</h2>
      {feedback()}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp();
store.subscribe(renderApp);
