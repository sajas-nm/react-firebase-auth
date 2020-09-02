import React, { useEffect, useState } from "react";
import app from "./base";
import url from "./apiConfig";

import AsyncSelect from "react-select/async";
import axios from "axios";
const colourOptions = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const filterColors = (inputValue) => {
  return colourOptions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const promiseOptions = (inputValue) =>
  new Promise((resolve) => {
    // setTimeout(() => {
    resolve(filterColors(inputValue));
    // }, 1000);
  });

const Home = () => {
  const [domains, setDoamins] = useState([]);
  useEffect(() => {
    const getDomains = async () => {
      try {
        let res = await axios.get(url.getDomains);
        console.log("[getDomains]", res);
        setDoamins(domains);
      } catch (error) {
        console.error("[getDomains]", error);
      }
    };
    getDomains();
  }, []);

  return (
    <section class="hero is-light is-fullheight">
      <div class="hero-head">
        <nav
          class="navbar is-primary is-fixed-top"
          style={{ background: "#00d1b2" }}
        >
          <div class="container">
            <div class="navbar-brand">
              <a class="navbar-item">
                <img
                  src="https://bulma.io/images/bulma-type-white.png"
                  alt="Logo"
                />
              </a>
              <span class="navbar-burger burger" data-target="navbarMenuHeroA">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div id="navbarMenuHeroA" class="navbar-menu ">
              <div class="navbar-end">
                <span class="navbar-item">
                  <button
                    class="button is-primary is-inverted"
                    onClick={() => app.auth().signOut()}
                  >
                    <span class="icon">
                      {/* <i class="fab fa-github"></i> */}
                      <i class="fas fa-sign-out-alt"></i>
                    </span>
                    <span>Sign out</span>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div class="hero-body mt-6" style={{ alignItems: "flex-start" }}>
        <div class="container mt-6">
          <div class="columns" style={{ background: "#fff" }}>
            <div class="column is-12 pt-5 pb-5 pr-6 pl-6">
              <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={promiseOptions}
                placeholder="Select a domain"
              />

              {/* <div class="field">
                <p class="control has-icons-left">
                  <span class="select is-fullwidth is-large">
                    <select>
                      <option selected>Country</option>
                      <option>Select dropdown</option>
                      <option>With options</option>
                    </select>
                  </span>
                  <span class="icon is-small is-left">
                    <i class="fas fa-globe"></i>
                  </span>
                </p>
              </div>
             */}
            </div>
          </div>
          <h1 class="title">Title</h1>
          <h2 class="subtitle">Subtitle</h2>
        </div>
      </div>
    </section>
  );
};

export default Home;
