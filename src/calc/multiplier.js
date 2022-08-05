const multiplier = (popularity) => {
  switch (true) {
    case (popularity > 12): return [5, 4, 3]; 
    case (popularity > 6): return [4, 3, 2]; 
    default: return [3, 2, 1];
  };
};

export default multiplier;
