// PIZZA FILTERS

export function getAllPizzaFilters() {
  return [
    getPizzaMeatFilterItems(),
    getPizzaCheeseFilterItems(),
    getPizzaVegetablesFilterItems(),
    getPizzaSauceFilterItems(),
    getPizzaOthersFilterItems(),
    getPizzaAllergenFilterItems()
  ];
}

function getPizzaMeatFilterItems() {
  return {
    header: "component.products.filters.meat",
    items:
      [
        'component.products.filters.meat.bacon',
        'component.products.filters.meat.double.bacon',
        'component.products.filters.meat.pepperoni',
        'component.products.filters.meat.double.pepperoni',
        'component.products.filters.meat.beef',
        'component.products.filters.meat.york.ham',
        'component.products.filters.meat.chicken'
      ]
  };
}

function getPizzaCheeseFilterItems() {
  return {
    header: "component.products.filters.cheese",
    items:
      [
        'component.products.filters.cheese.parmesan',
        'component.products.filters.cheese.emmental',
        'component.products.filters.cheese.blue',
        'component.products.filters.cheese.goat',
        'component.products.filters.cheese.mozzarella',
        'component.products.filters.cheese.double.mozzarella',
      ]
  };
}

function getPizzaVegetablesFilterItems() {
  return {
    header: "component.products.filters.vegetable",
    items:
      [
        'component.products.filters.vegetables.zucchini',
        'component.products.filters.vegetables.tomato',
        'component.products.filters.vegetables.onion',
        'component.products.filters.vegetables.mushroom',
        'component.products.filters.vegetables.eggplant',
        'component.products.filters.vegetables.olives.black',
      ]
  };
}

function getPizzaSauceFilterItems() {
  return {
    header: "component.products.filters.sauce",
    items:
      [
        'component.products.filters.sauce.tomato',
        'component.products.filters.sauce.cream',
      ]
  };
}

function getPizzaOthersFilterItems() {
  return {
    header: "component.products.filters.oil",
    items:
      [
        'component.products.filters.oil.truffle',
      ]
  };
}

function getPizzaAllergenFilterItems() {
  return {
    header: "component.products.filters.allergen",
    items:
      [
        'component.products.filters.allergen.gluten',
        'component.products.filters.allergen.lactose',
      ]
  };
}

// BEVERAGE FILTERS

export function getAllBeverageFilters() {
  return [
    getBeverageDescriptionFilterItems(),
    getBeverageAllergenFilterItems()
  ];
}

function getBeverageDescriptionFilterItems() {
  return {
    header: "component.products.filters.additive",
    items:
      [
        'component.products.filters.additive.sugar',
      ]
  };
}

function getBeverageAllergenFilterItems() {
  return {
    header: "component.products.filters.allergen",
    items:
      [
        'component.products.filters.allergen.gluten',
        'component.products.filters.allergen.alcohol'
      ]
  };
}
