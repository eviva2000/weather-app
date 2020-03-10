import React from "react";
const Form = props => {
  return (
    <div className="form-wrapper">
      <div>{props.error ? sendError() : null}</div>
      <form autoComplete="off" onSubmit={props.loadWeather}>
        <input type="text" name="city" placeholder="City" />
        <button>Get weather</button>
      </form>
    </div>
  );
};
function sendError() {
  return (
    <div className="error-wrapper">
      <h3>Please enter the city name</h3>
    </div>
  );
}
export default Form;
