import React from "react";

import f1 from "../../../assets/design_consultancy/digital_illustration/Frame 10.png";
import f2 from "../../../assets/design_consultancy/digital_illustration/ILLUSTRATION-03.jpg";
import f3 from "../../../assets/design_consultancy/digital_illustration/ILLUSTRATION-04.jpg";
import f4 from "../../../assets/design_consultancy/digital_illustration/ILLUSTRATION-06.jpg";
import f5 from "../../../assets/design_consultancy/digital_illustration/ILLUSTRATION-08.jpg";
import f6 from "../../../assets/design_consultancy/digital_illustration/ILLUSTRATION-09.jpg";
import f7 from "../../../assets/design_consultancy/digital_illustration/ILLUSTRATION-12.jpg";

const frames = [f1, f2, f3, f4, f5, f6, f7];

const DigitalIllustrationDesign = () => {
  return (
    <div style={{ width: "100%" }}>
      {frames.map((img, i) => (
        <div key={i}>
          <img src={img} alt={`digital-illustration-${i}`} style={{ width: "100%" }} />
        </div>
      ))}
    </div>
  );
};

export default DigitalIllustrationDesign;
