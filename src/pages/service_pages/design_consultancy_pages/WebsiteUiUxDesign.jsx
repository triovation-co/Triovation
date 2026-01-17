import React from "react";

import f1 from "../../../assets/design_consultancy/Website_UiUx_design/Frame15.png";
import f2 from "../../../assets/design_consultancy/Website_UiUx_design/research 3.png";

const frames = [f1, f2];

const WebsiteUiUxDesign = () => {
  return (
    <div style={{ width: "100%" }}>
      {frames.map((img, i) => (
        <div key={i}>
          <img src={img} alt={`website-uiux-${i}`} style={{ width: "100%" }} />
        </div>
      ))}
    </div>
  );
};

export default WebsiteUiUxDesign;
