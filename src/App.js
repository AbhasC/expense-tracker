import { useState, useCallback } from "react";
import "./App.css";

function App() {

  const [history, sethistory] = useState([]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    // console.log(">>>",history);
    console.log(event);
    let value = parseFloat(event.target[1].value);
    console.log(value);
    let type =
      event.target[2].checked
        ? "inc"
        : "exp";
    console.log(type);
    if (type === "inc") {
      // this.incamt.innerHTML
      sethistory((prevCount) => [
        ...prevCount,
        { type: type, desc: event.target[0].value, amt: value },
      ]);
    } 
    else {
      sethistory((prevCount) => [
        ...prevCount,
        { type: type, desc: event.target[0].value, amt: value*-1 },
      ]);
    }
    console.log(value);
    // console.log("<<<",history);

  }, []);

  const delelem = useCallback(
    (index) => {
      let arr = [];
      for (let i = 0; i < history.length; i++) {
        if (i !== index) {arr.push(history[i]);}
      }
      sethistory(arr);
    },
    [history]
  );

  const handledeleteelelement = useCallback(
    (index) => {
      return () => delelem(index);
    },
    [delelem]
  );

  const mapper =
    useCallback((histElem, index) => {
      let url = "";
      if (histElem.type === "inc")
        url =
          "https://upload.wikimedia.org/wikipedia/commons/9/9a/Green_circle.png";
      else
        url =
          "https://upload.wikimedia.org/wikipedia/commons/a/ae/Red_circle.png";
      return (
        <li key={index}>
          <img src={url} alt="expressimg"/>
          <span>{histElem.desc}</span>
          <span>{String(histElem.amt).replace("-","")}</span>
          <button onClick={handledeleteelelement(index)}>Delete</button>
        </li>
      );
    },[handledeleteelelement]);

  const adder = useCallback((total, elem) => total+elem.amt,[]);
  const incadder = useCallback((total, elem) => ((elem.amt>=0)?(total+elem.amt):(total+0)),[]);
  const expadder = useCallback((total, elem) => ((elem.amt<0)?(total+elem.amt):(total+0)),[]);

  return (
    <div className="display">
      <h1>Expense Tracker</h1>
      <div class="bal-amt">
        <span>Balance amount</span>
        <span id="bal_amt" className="balamt">₹{history.reduce(adder,0)}</span>
      </div>
      <div class="income-expense">
        <div class="income">
          <span>Income</span>
          <span id="inc-amt" className="incamt">₹{history.reduce(incadder,0)}</span>
        </div>
        <div class="expense">
          <span>Expense</span>
          <span id="exp-amt" className="expamt">₹{String(history.reduce(expadder,0)).replace("-","")}</span>
        </div>
      </div>
      <div class="history">
        <h3>History</h3>
        <ul>{history.map(mapper)}</ul>
      </div>
      <div class="transaction">
        <h3>Add New Transaction</h3>
        <form onSubmit={handleSubmit}>
          <label id="l1" htmlFor="i1">
            Description
          </label>
          <input id="i1" type="text" placeholder="What is the amount" />
          <label id="l2">Amount</label>
          <input id="i2" type="number" placeholder="Enter amount" />
          <div class="inc-exp">
            <input
              type="radio"
              value="income"
              id="rad-inc"
              name="radiob"
              className="radiobt"
              defaultChecked
            />
            <label for="rad-inc">Income</label>
            <div class="bor"></div>
            <input
              type="radio"
              value="expense"
              id="rad-exp"
              name="radiob"
              className="radiobt"
            />
            <label for="rad-exp">Expense</label>
          </div>
          <button class="sub-but" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
