import React from "react";

import f1 from "../../../assets/design_consultancy/Business_collateral_design/Frame 11.png";
import f2 from "../../../assets/design_consultancy/Business_collateral_design/Frame 17.png";
import f3 from "../../../assets/design_consultancy/Business_collateral_design/Frame 18.png";
import f4 from "../../../assets/design_consultancy/Business_collateral_design/Frame 25.png";
import f5 from "../../../assets/design_consultancy/Business_collateral_design/xFrame 24 (1).png";

const frames = [f1, f2, f3, f4, f5];

const BusinessCollateralDesign = () => {
  return (
    <div style={{ width: "100%" }}>
      {frames.map((img, i) => (
        <div key={i}>
          <img src={img} alt={`business-collateral-${i}`} style={{ width: "100%" }} />
        </div>
      ))}
    </div>
  );
};

export default BusinessCollateralDesign;
