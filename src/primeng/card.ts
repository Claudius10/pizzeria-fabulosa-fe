export const card = (padding: string, borderRadius: string, inverse: boolean) => {

  const backgroundColor = inverse ? "{surface.card.inverse}" : "{surface.card.bg}";

  return {
    body: {
      padding: padding,
    },
    border: {
      radius: borderRadius
    },
    background: backgroundColor
  };
};

