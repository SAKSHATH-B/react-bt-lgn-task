import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { motion } from "framer-motion";
import CustomNavBar from "./CustomNavBar";
import NavBar from "./NavBar";

const Dashboard = () => {
  const text = "Welcome to User Dashboard".split(" ");
  return (
    <>
      <CustomNavBar />

      <div
        className="container-fluid bg-black p-0 d-flex justify-content-center align-items-center"
        style={{ minHeight: 600 }}
      >
        <div className="logo text-center">
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
        </div>
      </div>
    </>
  );
};

export default Dashboard;
