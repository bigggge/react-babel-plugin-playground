import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <p>{count}</p>
      <div className={"if-block"} if={count > 0}>
        <p if={count < 2}>good</p>
        <p else>very good</p>
      </div>
      <p className={"else-block"} else>bad</p>
      <button onClick={() => {
        setCount(count - 1)
      }}>
        -
      </button>
      <button onClick={() => {
        setCount(count + 1)
      }}>
        +
      </button>
    </div>
  );
}

export default App;
