import React from 'react';


function percent(num) {
  return Math.round(num * 100);
}

const Feels = props => (
  <section className="feels-review">
    <ul className="feels-list">
      {
        props.sentimentList.map((feel, id) => (
          <li
            key={id}
            className="feel"
          >
            {`${feel.tone_name}: ${percent(feel.score)}`}
          </li>
        ))
      }
    </ul>
  </section>
);

// todo:
// check my proptypes


export default Feels;
