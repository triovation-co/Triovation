import React from "react";

import f1 from "../../../assets/design_consultancy/Book_magazine_zinedesign/Frame 16 (1).png";
import f2 from "../../../assets/design_consultancy/Book_magazine_zinedesign/Frame 32.png";
import f3 from "../../../assets/design_consultancy/Book_magazine_zinedesign/Frame 33.png";

const frames = [f1, f2, f3];

const BookMagazineZineDesign = () => {
  return (
    <div style={{ width: "100%" }}>
      {frames.map((img, i) => (
        <div key={i}>
          <img src={img} alt={`book-magazine-${i}`} style={{ width: "100%" }} />
        </div>
      ))}
    </div>
  );
};

export default BookMagazineZineDesign;

