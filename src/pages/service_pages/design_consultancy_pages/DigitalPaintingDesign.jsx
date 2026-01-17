import React from "react";

import f1 from "../../../assets/design_consultancy/Digital_painting/1 (1).png";
import f2 from "../../../assets/design_consultancy/Digital_painting/2.jpg";
import f3 from "../../../assets/design_consultancy/Digital_painting/3 (1).jpg";
import f4 from "../../../assets/design_consultancy/Digital_painting/4 (1).jpg";
import f5 from "../../../assets/design_consultancy/Digital_painting/5 (1).jpg";
import f6 from "../../../assets/design_consultancy/Digital_painting/6 (1).jpg";
import f7 from "../../../assets/design_consultancy/Digital_painting/7 (1).jpg";
import f8 from "../../../assets/design_consultancy/Digital_painting/Frame 24 (4).png";

const frames = [f1, f2, f3, f4, f5, f6, f7, f8];

const DigitalPaintingDesign = () => {
  return (
    <div style={{ width: "100%" }}>
      {frames.map((img, i) => (
        <div key={i}>
          <img src={img} alt={`digital-painting-${i}`} style={{ width: "100%" }} />
        </div>
      ))}
    </div>
  );
};

export default DigitalPaintingDesign;
