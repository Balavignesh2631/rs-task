import React from 'react';

import { NavLink } from "react-router-dom";
import './Homepage.css';
import logo from './software.png'


function Homepage() {
  return (
    <>
      <div >
        <header>
          <nav id="nn" className="fixed-top header-scrolled">
            <div id="n1">
              <p id="n2">SSBK Training</p>
              <div id="n3">
                <ul>
                  <li> <NavLink to='/' id='li1'>Home</NavLink></li>
                  <li><NavLink to="/student" id="li2">Student</NavLink></li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </div>
    {/* --------------------------------------------------- */}
    {/* main section */}
    <main>
        <section className='sectionset'>
            <div id="sec-title">
                <h1 id="h1">BETTER SOLUTION FOR YOU BUSINESS</h1>
                <h3 id="h2">We are team of talent deginers making webiste with bootstrap</h3>
             </div>

            <div id="Sec-title2">
                <img src={logo} alt="" id="h5"/>
            </div>

        </section>
    </main>
    </>
  );
}

export default Homepage;