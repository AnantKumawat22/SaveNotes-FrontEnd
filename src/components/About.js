import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const About = () => {
  const collapse = document.querySelector(".navbar-collapse");
  if(collapse) collapse.classList.remove("show");
  return (
    <div>About</div>
  )
}

export default About;