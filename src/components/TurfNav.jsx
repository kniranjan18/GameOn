import React, { useState } from "react";
import turfbg from "../images/bg2.jpg";
import logo from "../images/navlogo1.jpg";
import "../style/turf.css";
import {BiSolidCricketBall,BiCricketBall,BiFootball,BiSolidEditLocation} from "react-icons/bi"
import {IoFitness} from "react-icons/io5"
import {IoIosBasketball} from "react-icons/io"
import {GiTennisRacket} from "react-icons/gi"
import {MdLocationOn} from "react-icons/md"
import { Button, Popover } from "@chakra-ui/react";
import { useUserAuth } from "../context/Authcontext";
import { PopoverProfile } from "./Popover";

export const TurfNav = (prop) => {
    const {setTurf} = prop
    const { user, logout } = useUserAuth();

    const handleLogout = async () => {
      try {
        await logout();
      } catch (err) {
        console.log(err.message);
      }
    };
   
  return (
    <>
      <div id="turfnavbg">
        <img src={turfbg} alt="" />
        
      </div>
      <div id="turfNavContainer">
        <div id="topNavturf">
          <div id="turfNav">
            <img src={logo} id="logoimg" alt="" />
          </div>
          <div id="navBtns">
            <PopoverProfile handleLogout={handleLogout} email={user.email}/>
          </div>
        </div>
        <div id="midNavTurf">
          <p>IT'S ALL STARTED HERE!</p>
          <p id="turfCity">
            Bangalore <MdLocationOn fontWeight={"bold"} />
          </p>
        </div>
        <div className="flex gap-5">
          <Button
            variant={"ghost"}
            color="red"
            colorScheme={"white"}
            fontSize={"2em"}
            fontWeight="bold"
            rightIcon={<GiTennisRacket color="white" />}
            onClick={()=>setTurf("badminton")}
          >
            BADMINTON
          </Button>
        </div>
      </div>
    </>
  );
};
