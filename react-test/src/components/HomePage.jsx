import React from "react";
import NavBar from "./NavBar";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowCircleRight } from "react-icons/fa";

const HomePage = () => {
  const text = "Centre for Good Governance".split(" ");
  const text2 =
    "Transforming Governance: From eGovernance to mGovernance to embracing Emerging Technologies".split(
      " "
    );
  return (
    <>
      <NavBar />

      <div
        className="container-fluid bg-black p-0 d-flex justify-content-center align-items-center"
        style={{ minHeight: 600 }}
      >
        <div className="text-center fade">
          <h1
            className="text-white"
            style={{
              background: "linear-gradient(45deg, #ffcc00, #522c13)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Centre for Good Governance
          </h1>
          <h5 className="text-white">
            Transforming Governance: From eGovernance to mGovernance to
            embracing Emerging Technologies
          </h5>
          <Link
            to="/login"
            className="d-flex mt-5 justify-content-center align-items-center getstarted"
          >
            <FaArrowCircleRight size={50} color="yellow" />
          </Link>
        </div>
        {/* <div className="text-center fade">
          <h1
            className="text-white"
            style={{
              background: "linear-gradient(45deg, #ffcc00, #522c13)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {text.map((el, i) => (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.7,
                  delay: i / 5,
                }}
                key={i}
              >
                {el}{" "}
              </motion.span>
            ))}
          </h1>
          <h5 className="text-white">
            {text2.map((el, i) => (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.7,
                  delay: i / 5,
                }}
                key={i}
              >
                {el}{" "}
              </motion.span>
            ))}
          </h5>
          <Link
            to="/login"
            className="d-flex mt-5 justify-content-center align-items-center"
          >
            <FaArrowCircleRight size={50} color="yellow" />
          </Link>
        </div> */}
      </div>
    </>
  );
};

export default HomePage;
