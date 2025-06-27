import React, { useState } from "react";
import { TimeSelectModal } from "./TimeSelectModal";
import { Loading } from "./Loading";

export const Turfdata = () => {
  const [loading, setLoading] = useState(false);
  const [element, setElement] = useState({});
  const [time, setTime] = useState("");
  const [turfName, setTurfName] = useState("");

  // Predefined data for turfs
  const data = [
    {
      image : "https://playo.gumlet.io/GSPORTS/gsports1603909897080.jpeg",
      name: "G Sportz",
      address: "Mahadevapura",
    },
    {
      image: "https://playo.gumlet.io/DAZZLINGSMASH/DazzlingSmash5.jpeg",
      name: "Dazzling Smash",
      address: "Pai Layout",
    },
    {
      image: "https://playo.gumlet.io/EAGLEEYESBADMINTONARENA20240430065208321110/EagleEyesBadmintonArena1714460031439.jpeg?auto=compress,format&h=300",
      name: "E Sqaure",
      address: "Kaggadasapura",
    },
    {
      image: "https://playo.gumlet.io/CITINEST/citinestsportscentre1592494175595.jpg",
      name: "City Next Sports Center",
      address: "Indiranagar",
    },  
  ];

  // Simulate loading state if needed
  if (loading) {
    return (
      <div id="turfContainer">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <p id="headingTurf" className="">Courts Available for Badminton</p>
      <div id="turfContainer">
        {data.map((ele, index) => (
          <div id="turfBox" key={index}>
            <div id="listingImg">
              <img src={ele.image} alt={ele.name} />
            </div>
            <p id="turfName">{ele.name}</p>
            <p id="turfAddress">{ele.address}</p>
            <TimeSelectModal
              turfName={turfName}
              setTurfName={setTurfName}
              element={ele}
              setElement={setElement}
              setTime={setTime}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
