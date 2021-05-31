import React from "react";
import "./Errors.css"
const Errors = () => {
  return (
    <div style={{backgroundColor:"#95C2DE",paddingBottom:"100px"}}>
      {/* purple x moss 2020 */}
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600;900&display=swap"
        rel="stylesheet"
      />
      <div className="mainbox">
        <div className="err">4</div>
        <i className="far fa-question-circle fa-spin" />
        <div className="err2">4</div>
        <div className="msg">
          Maybe this page moved? Got deleted? Is hiding out in quarantine? Never
          existed in the first place?
          <p>
            Let's go <a href="/">home</a> and try from there.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Errors;
