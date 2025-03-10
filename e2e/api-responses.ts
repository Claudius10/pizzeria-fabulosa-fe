export const offers = {
  "timeStamp": "2025-03-09T19:37:30.463882738",
  "status": {"code": 200, "description": "OK", "error": false},
  "payload": [{
    "id": 1,
    "image": "/assets/offers/offer.jpeg",
    "name": {"es": "3x2 en Pizzas", "en": "3x2 for Pizzas"},
    "description": {
      "es": "Válida todos los días en Pizzas Medianas y Familiares",
      "en": "Valid every day for Medium and Familiar sized Pizzas"
    },
    "caveat": {"es": "Cualquiera especialidad o hasta 4 ingredientes", "en": "Any specialty or up to 4 ingredients"}
  }, {
    "id": 2,
    "image": "/assets/offers/offer.jpeg",
    "name": {"es": "2ª Pizza al 50%", "en": "Second Pizza at half the price"},
    "description": {
      "es": "Válida todos los días en Pizzas Medianas y Familiares",
      "en": "Valid every day for Medium and Familiar sized Pizzas"
    },
    "caveat": {"es": "Cualquiera especialidad o hasta 4 ingredientes", "en": "Any specialty or up to 4 ingredients"}
  }],
  "error": null
};

export const stores = {
  "timeStamp": "2025-03-10T08:44:57.436579591",
  "status": {"code": 200, "description": "OK", "error": false},
  "payload": [{
    "id": 1,
    "image": "/assets/stores/alustre.png",
    "name": "Alustre",
    "phoneNumber": 666555666,
    "schedule": {"es": "Lunes a Domingo - 12PM a 12AM", "en": "Monday to Sunday - 12PM to 12AM"},
    "address": {"id": 2, "street": "Avenida Alustre", "number": 15, "details": null}
  }, {
    "id": 2,
    "image": "/assets/stores/viciosa.png",
    "name": "Viciosa",
    "phoneNumber": 555666555,
    "schedule": {"es": "Lunes a Domingo - 12PM a 12AM", "en": "Monday to Sunday - 12PM to 12AM"},
    "address": {"id": 3, "street": "Calle Viciosa", "number": 221, "details": null}
  }],
  "error": null
};

export const pizzas = {
  "timeStamp": "2025-03-10T08:45:33.624953393",
  "status": {"code": 200, "description": "OK", "error": false},
  "payload": [{
    "id": 1,
    "type": "pizza",
    "image": "/assets/products/pizza/pizzaProduct.png",
    "name": {"es": "Cuatro Quesos", "en": "Cuatro Quesos"},
    "description": {
      "es": ["Salsa de Tomate", "Mozzarella 100%", "Parmesano", "Emmental", "Queso Azul"],
      "en": ["Tomato Sauce", "100% Mozzarella", "Parmesan Cheese", "Emmental Cheese", "Blue Cheese"]
    },
    "formats": {"m": {"es": "Mediana", "en": "Medium"}, "l": {"es": "Familiar", "en": "Large"}},
    "prices": {"m": 13.3, "l": 18.3},
    "allergens": {"es": ["Gluten", "Lactosa"], "en": ["Gluten", "Lactose"]}
  }, {
    "id": 2,
    "type": "pizza",
    "image": "/assets/products/pizza/pizzaProduct.png",
    "name": {"es": "Natura", "en": "Natura"},
    "description": {
      "es": ["Salsa de Tomate", "Mozzarella 100%", "Calabacín", "Tomate Natural", "Parmesano"],
      "en": ["Tomato Sauce", "100% Mozzarella", "Zucchini", "Sliced Tomato", "Parmesan Cheese"]
    },
    "formats": {"m": {"es": "Mediana", "en": "Medium"}, "l": {"es": "Familiar", "en": "Large"}},
    "prices": {"m": 13.3, "l": 18.3},
    "allergens": {"es": ["Gluten", "Lactosa"], "en": ["Gluten", "Lactose"]}
  }, {
    "id": 3,
    "type": "pizza",
    "image": "/assets/products/pizza/pizzaProduct.png",
    "name": {"es": "Cabra Loca", "en": "Cabra Loca"},
    "description": {
      "es": ["Salsa de Tomate", "Mozzarella 100%", "Cebolla", "Bacon", "Queso de Cabra"],
      "en": ["Tomato Sauce", "100% Mozzarella", "Onions", "Smoked Bacon", "Goat Cheese"]
    },
    "formats": {"m": {"es": "Mediana", "en": "Medium"}, "l": {"es": "Familiar", "en": "Large"}},
    "prices": {"m": 13.3, "l": 18.3},
    "allergens": {"es": ["Gluten", "Lactosa"], "en": ["Gluten", "Lactose"]}
  }, {
    "id": 4,
    "type": "pizza",
    "image": "/assets/products/pizza/pizzaProduct.png",
    "name": {"es": "Roni Pepperoni", "en": "Roni Pepperoni"},
    "description": {
      "es": ["Salsa de Tomate", "Doble de Mozzarella 100%", "Doble de Peperoni"],
      "en": ["Tomato Sauce", "Double 100% Mozzarella", "Double Pepperoni"]
    },
    "formats": {"m": {"es": "Mediana", "en": "Medium"}, "l": {"es": "Familiar", "en": "Large"}},
    "prices": {"m": 13.3, "l": 18.3},
    "allergens": {"es": ["Gluten", "Lactosa"], "en": ["Gluten", "Lactose"]}
  }, {
    "id": 5,
    "type": "pizza",
    "image": "/assets/products/pizza/pizzaProduct.png",
    "name": {"es": "Carbonara", "en": "Carbonara"},
    "description": {
      "es": ["Salsa de Nata", "Mozzarella 100%", "Cebolla", "Champiñon Fresco", "Doble de Bacon"],
      "en": ["Cream Sauce", "100% Mozzarella", "Onion", "Mushroom", "Double Smoked Bacon"]
    },
    "formats": {"m": {"es": "Mediana", "en": "Medium"}, "l": {"es": "Familiar", "en": "Large"}},
    "prices": {"m": 14.75, "l": 20.25},
    "allergens": {"es": ["Gluten", "Lactosa"], "en": ["Gluten", "Lactose"]}
  }, {
    "id": 6,
    "type": "pizza",
    "image": "/assets/products/pizza/pizzaProduct.png",
    "name": {"es": "Trufa Gourmet", "en": "Trufa Gourmet"},
    "description": {
      "es": ["Salsa de Tomate", "Mozzarella 100%", "Calabacín", "Champiñon Fresco", "Pollo", "Aceite de Trufa"],
      "en": ["Tomato Sauce", "100% Mozzarella", "Zucchini", "Mushroom", "Chicken", "White Truffle Oil"]
    },
    "formats": {"m": {"es": "Mediana", "en": "Medium"}, "l": {"es": "Familiar", "en": "Large"}},
    "prices": {"m": 14.75, "l": 20.25},
    "allergens": {"es": ["Gluten", "Lactosa"], "en": ["Gluten", "Lactose"]}
  }, {
    "id": 7,
    "type": "pizza",
    "image": "/assets/products/pizza/pizzaProduct.png",
    "name": {"es": "Mediterránea", "en": "Mediterránea"},
    "description": {
      "es": ["Salsa de Tomate", "Mozzarella 100%", "Berenjena", "Calabacín", "Tomate Natural", "Aceitunas Negras"],
      "en": ["Tomato Sauce", "100% Mozzarella", "Eggplant", "Zucchini", "Sliced Tomato", "Black Olives"]
    },
    "formats": {"m": {"es": "Mediana", "en": "Medium"}, "l": {"es": "Familiar", "en": "Large"}},
    "prices": {"m": 14.75, "l": 20.25},
    "allergens": {"es": ["Gluten", "Lactosa"], "en": ["Gluten", "Lactose"]}
  }, {
    "id": 8,
    "type": "pizza",
    "image": "/assets/products/pizza/pizzaProduct.png",
    "name": {"es": "Caníbal", "en": "Caníbal"},
    "description": {
      "es": ["Salsa de Tomate", "Mozzarella 100%", "Jamón York", "Bacon", "Peperoni", "Ternera"],
      "en": ["Tomato Sauce", "100% Mozzarella", "York Ham", "Smoked Bacon", "Pepperoni", "Beef"]
    },
    "formats": {"m": {"es": "Mediana", "en": "Medium"}, "l": {"es": "Familiar", "en": "Large"}},
    "prices": {"m": 14.75, "l": 20.25},
    "allergens": {"es": ["Gluten", "Lactosa"], "en": ["Gluten", "Lactose"]}
  }, {
    "id": 9,
    "type": "pizza",
    "image": "/assets/products/pizza/pizzaProduct.png",
    "name": {"es": "Sin Gluten", "en": "Gluten Free"},
    "description": {
      "es": ["Salsa de Tomate", "Mozzarella 100%", "Jamón York", "Bacon", "Peperoni"],
      "en": ["Tomato Sauce", "100% Mozzarella", "York Ham", "Smoked Bacon", "Pepperoni"]
    },
    "formats": {"m": {"es": "Mediana", "en": "Medium"}, "l": {"es": "Familiar", "en": "Large"}},
    "prices": {"m": 14.75, "l": 20.25},
    "allergens": {"es": ["Lactosa"], "en": ["Lactose"]}
  }],
  "error": null
};

export const beverages = {
  "timeStamp": "2025-03-10T08:46:07.507337404",
  "status": {"code": 200, "description": "OK", "error": false},
  "payload": [{
    "id": 11,
    "type": "beverage",
    "image": "/assets/products/beverages/cocacola_zero.png",
    "name": {"es": "Coca-Cola Zero", "en": "Coca-Cola Zero"},
    "description": {"es": [], "en": []},
    "formats": {"s": {"es": "330ML", "en": "330ML"}, "m": {"es": "1L", "en": "1L"}},
    "prices": {"s": 1.95, "m": 2.95},
    "allergens": {"es": [], "en": []}
  }, {
    "id": 12,
    "type": "beverage",
    "image": "/assets/products/beverages/fanta.png",
    "name": {"es": "Fanta Naranja", "en": "Fanta Orange"},
    "description": {"es": ["Azúcar"], "en": ["Sugar"]},
    "formats": {"s": {"es": "330ML", "en": "330ML"}, "m": {"es": "1L", "en": "1L"}},
    "prices": {"s": 1.95, "m": 2.95},
    "allergens": {"es": [], "en": []}
  }, {
    "id": 13,
    "type": "beverage",
    "image": "/assets/products/beverages/nestea.jpg",
    "name": {"es": "Nestea Limón", "en": "Nestea Lime"},
    "description": {"es": ["Azúcar"], "en": ["Sugar"]},
    "formats": {"s": {"es": "330ML", "en": "330ML"}, "m": {"es": "1L", "en": "1L"}},
    "prices": {"s": 1.95, "m": 2.95},
    "allergens": {"es": [], "en": []}
  }, {
    "id": 14,
    "type": "beverage",
    "image": "/assets/products/beverages/sprite.jpg",
    "name": {"es": "Sprite", "en": "Sprite"},
    "description": {"es": ["Azúcar"], "en": ["Sugar"]},
    "formats": {"s": {"es": "330ML", "en": "330ML"}, "m": {"es": "1L", "en": "1L"}},
    "prices": {"s": 1.95, "m": 2.95},
    "allergens": {"es": [], "en": []}
  }, {
    "id": 15,
    "type": "beverage",
    "image": "/assets/products/beverages/aguarius.jpg",
    "name": {"es": "Aquarius Limón", "en": "Aquarius Lime"},
    "description": {"es": ["Azúcar"], "en": ["Sugar"]},
    "formats": {"s": {"es": "330ML", "en": "330ML"}},
    "prices": {"s": 1.95},
    "allergens": {"es": [], "en": []}
  }, {
    "id": 16,
    "type": "beverage",
    "image": "/assets/products/beverages/mahou-clasica.jpg",
    "name": {"es": "Mahou Clásica", "en": "Mahou Classic"},
    "description": {"es": [], "en": []},
    "formats": {"s": {"es": "330ML", "en": "330ML"}},
    "prices": {"s": 1.95},
    "allergens": {"es": ["Gluten", "Alcohol"], "en": ["Gluten", "Alcohol"]}
  }, {
    "id": 17,
    "type": "beverage",
    "image": "/assets/products/beverages/mahou_sin.png",
    "name": {"es": "Mahou Sin", "en": "Mahou Without Alcohol"},
    "description": {"es": [], "en": []},
    "formats": {"s": {"es": "330ML", "en": "330ML"}},
    "prices": {"s": 1.95},
    "allergens": {"es": ["Gluten"], "en": ["Gluten"]}
  }, {
    "id": 18,
    "type": "beverage",
    "image": "/assets/products/beverages/mahou_sin_gluten.jpeg",
    "name": {"es": "Mahou Sin Gluten", "en": "Mahou Gluten Free"},
    "description": {"es": [], "en": []},
    "formats": {"s": {"es": "330ML", "en": "330ML"}},
    "prices": {"s": 1.95},
    "allergens": {"es": ["Alcohol"], "en": ["Alcohol"]}
  }],
  "error": null
};
