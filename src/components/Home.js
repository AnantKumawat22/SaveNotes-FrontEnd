import React from 'react'
import Notes from './Notes';

const Home = (props) => {
  const collapse = document.querySelector(".navbar-collapse");
  if(collapse) collapse.classList.remove("show");
  return (
      <Notes showAlert={props.showAlert} />
  )
}

export default Home;