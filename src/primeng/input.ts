export const myInput = (inverse: boolean, color: string) => {
  return {
    background: inverse ? "{surface.card.inverse}" : "{surface.card.bg}",
    border: {
      color: "transparent",
    },
    hover: {
      border: {
        color: color,
      }
    }
  };
};
