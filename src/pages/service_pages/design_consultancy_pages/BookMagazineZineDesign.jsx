import React from "react";
import useDocumentMeta from "../../../hooks/useDocumentMeta.js";

import f1 from "../../../assets/design_consultancy/Book_magazine_zinedesign/Frame16.png";
import f2 from "../../../assets/design_consultancy/Book_magazine_zinedesign/Frame32.png";
import f3 from "../../../assets/design_consultancy/Book_magazine_zinedesign/Frame33.png";

const frames = [f1, f2, f3];

const BookMagazineZineDesign = () => {
  useDocumentMeta({
    title: 'Book, Magazine & Zine Design | Triovation Design Consultancy',
    description: 'Professional layout and design services for books, magazines, zines, and print publications.',
    keywords: 'book design, magazine layout, zine design, publication design, Triovation',
    canonicalUrl: 'https://www.triovation.com/design-consultancy/book-magazine-zine-design',
    ogImage: 'https://www.triovation.com/og-image.jpg',
  });

  return (
    <div style={{ width: "100%" }}>
      <h1 className="sr-only">Book, Magazine & Zine Design | Triovation Design Consultancy</h1>
      {frames.map((img, i) => (
        <div key={i}>
          <img src={img} alt={`Book, magazine & zine design portfolio piece ${i + 1}`} style={{ width: "100%" }} />
        </div>
      ))}
    </div>
  );
};

export default BookMagazineZineDesign;

