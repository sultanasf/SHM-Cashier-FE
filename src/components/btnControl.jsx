import { useState } from "react";

function BtnControl() {
  const [count, setCount] = useState(2);

  const handleClick = (selectedcount) => {
    setCount("^2" === selectedcount ? count ** 2 : count ** (1 / 2));
  };

  const resetCountHandler = () => {
    setCount(2);
  };

  return (
    <>
      <h2>Count is {count}</h2>
      <button onClick={() => handleClick("^2")}>{count}^2</button>
      <button onClick={() => handleClick("√")}>√{count}</button>
      <br />
      <button onClick={resetCountHandler}>Reset</button>
    </>
  );
}

export default BtnControl;
