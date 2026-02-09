// Navigation functions for slider controls

export const createSliderNavigation = (chunks, setCurrentIndex) => {
  const prev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? chunks.length - 1 : prevIndex - 1
    );
  };

  const next = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === chunks.length - 1 ? 0 : prevIndex + 1
    );
  };

  return { prev, next };
};
