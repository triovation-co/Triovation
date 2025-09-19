import React from 'react';

const ViewToggleButton = ({
  showAll,
  setShowAll,
  scrollToRef,
  refElement,
  productsLength,
  threshold = 8,
  className = "group flex items-center gap-2 rounded-xl px-12 py-1.5 font-medium text-lg bg-blue-400 text-white",
  containerClassName = "flex justify-center mb-20 -mt-10",
  viewAllText = "View All",
  viewLessText = "View Less",
  scrollDelay = 100
}) => {
  // Don't render if products don't exceed threshold
  if (productsLength <= threshold) {
    return null;
  }

  const handleClick = () => {
    if (showAll) {
      setShowAll(false);
      if (scrollToRef && refElement) {
        setTimeout(() => scrollToRef(refElement), scrollDelay);
      }
    } else {
      setShowAll(true);
    }
  };

  return (
    <div className={containerClassName}>
      <button onClick={handleClick} className={className}>
        <span className="font-medium tracking-wide transition-transform duration-300 group-hover:scale-105">
          {showAll ? viewLessText : viewAllText}
        </span>
      </button>
    </div>
  );
};

export default ViewToggleButton;
