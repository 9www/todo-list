import "../styles/components/CountHour.scss";

function CountHour({ hour, handleIncrement, handleDecrement }) {
  return (
    <div className="hour-container">
      <div className="decrement-button" onClick={handleDecrement}></div>
      <div className="hour-text">{hour}</div>
      <div className="increment-button" onClick={handleIncrement}></div>
    </div>
  );
}

export default CountHour;
