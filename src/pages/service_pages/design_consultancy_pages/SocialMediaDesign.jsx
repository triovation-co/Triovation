import React from "react";

import f1 from "../../../assets/design_consultancy/Social_Media/Frame 13.png";
import f2 from "../../../assets/design_consultancy/Social_Media/Frame 14.png";
import f3 from "../../../assets/design_consultancy/Social_Media/Frame 15.png";
import f4 from "../../../assets/design_consultancy/Social_Media/Frame 16.png";
import f5 from "../../../assets/design_consultancy/Social_Media/Frame 17 (1).png";
import f6 from "../../../assets/design_consultancy/Social_Media/Frame 24 (3).png";

const frames = [f1, f2, f3, f4, f5, f6];

const SocialMediaDesign = () => {
  return (
    <div style={{ width: "100%" }}>
      {frames.map((img, i) => (
        <div key={i}>
          <img src={img} alt={`social-media-${i}`} style={{ width: "100%" }} />
        </div>
      ))}
    </div>
  );
};

export default SocialMediaDesign;
