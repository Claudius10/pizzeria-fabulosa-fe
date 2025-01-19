export const myInput = (inverse: boolean) => {
  return {
    background: inverse ? "{surface.card.inverse}" : "{surface.card.bg}",
    border: {
      color: "transparent",
    },
    hover: {
      border: {
        color: "{primary.400}",
      }
    }
  };
};
