import React from "react";

import f1 from "../../../assets/design_consultancy/Brand_Campaigns/Frame 12.png";
import f2 from "../../../assets/design_consultancy/Brand_Campaigns/Frame 19.jpg";
import f3 from "../../../assets/design_consultancy/Brand_Campaigns/Frame 20.jpg";
import f5 from "../../../assets/design_consultancy/Brand_Campaigns/Frame 22.jpg";
import f6 from "../../../assets/design_consultancy/Brand_Campaigns/Frame 23.jpg";
import f7 from "../../../assets/design_consultancy/Brand_Campaigns/Frame24.png";

const frames = [f1, f2, f3, f5, f6, f7];

const BrandCampaignsDesign = () => {
  return (
    <div style={{ width: "100%" }}>
      {frames.map((img, i) => (
        <div key={i}>
          <img src={img} alt={`brand-campaign-${i}`} style={{ width: "100%" }} />
        </div>
      ))}
    </div>
  );
};

export default BrandCampaignsDesign;
