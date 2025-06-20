export const offers = {
  "offers": [{
    "id": 1,
    "image": "/assets/offers/offer.jpeg",
    "name": {"es": "3x2 en Pizzas", "en": "3x2 for Pizzas"},
    "description": {"es": "Válida todos los días en Pizzas Medianas y Familiares", "en": "Valid every day for Medium and Familiar sized Pizzas"},
    "caveat": {"es": "Cualquiera especialidad o hasta 4 ingredientes", "en": "Any specialty or up to 4 ingredients"}
  }, {
    "id": 2,
    "image": "/assets/offers/offer.jpeg",
    "name": {"es": "2ª Pizza al 50%", "en": "Second Pizza at half the price"},
    "description": {"es": "Válida todos los días en Pizzas Medianas y Familiares", "en": "Valid every day for Medium and Familiar sized Pizzas"},
    "caveat": {"es": "Cualquiera especialidad o hasta 4 ingredientes", "en": "Any specialty or up to 4 ingredients"}
  }]
};

export const stores = {
  "stores": [{
    "id": 1,
    "image": "/assets/stores/alustre.png",
    "name": "Alustre",
    "phoneNumber": 666555666,
    "schedule": {"es": "Lunes a Domingo - 12PM a 12AM", "en": "Monday to Sunday - 12PM to 12AM"},
    "address": "Avenida Alustre 15"
  }, {
    "id": 2,
    "image": "/assets/stores/viciosa.png",
    "name": "Viciosa",
    "phoneNumber": 555666555,
    "schedule": {"es": "Lunes a Domingo - 12PM a 12AM", "en": "Monday to Sunday - 12PM to 12AM"},
    "address": "Calle Viciosa 221"
  }]
};

export const pizzas = {
  "content": [{
    "id": 9,
    "type": "pizza",
    "image": "/assets/products/pizza/pizzaProduct.webp",
    "name": {"es": "Sin Gluten", "en": "Gluten Free"},
    "description": {"es": ["Salsa de Tomate", "Mozzarella 100%", "Jamón York", "Bacon", "Peperoni"], "en": ["Tomato Sauce", "100% Mozzarella", "York Ham", "Smoked Bacon", "Pepperoni"]},
    "formats": {"m": {"es": "Mediana", "en": "Medium"}, "l": {"es": "Familiar", "en": "Large"}},
    "prices": {"m": 14.75, "l": 20.25},
    "allergens": {"es": ["Lactosa"], "en": ["Lactose"]}
  }, {
    "id": 8,
    "type": "pizza",
    "image": "/assets/products/pizza/pizzaProduct.webp",
    "name": {"es": "Caníbal", "en": "Caníbal"},
    "description": {
      "es": ["Salsa de Tomate", "Mozzarella 100%", "Jamón York", "Bacon", "Peperoni", "Ternera"],
      "en": ["Tomato Sauce", "100% Mozzarella", "York Ham", "Smoked Bacon", "Pepperoni", "Beef"]
    },
    "formats": {"m": {"es": "Mediana", "en": "Medium"}, "l": {"es": "Familiar", "en": "Large"}},
    "prices": {"m": 14.75, "l": 20.25},
    "allergens": {"es": ["Gluten", "Lactosa"], "en": ["Gluten", "Lactose"]}
  }, {
    "id": 7,
    "type": "pizza",
    "image": "/assets/products/pizza/pizzaProduct.webp",
    "name": {"es": "Mediterránea", "en": "Mediterránea"},
    "description": {
      "es": ["Salsa de Tomate", "Mozzarella 100%", "Berenjena", "Calabacín", "Tomate Natural", "Aceitunas Negras"],
      "en": ["Tomato Sauce", "100% Mozzarella", "Eggplant", "Zucchini", "Sliced Tomato", "Black Olives"]
    },
    "formats": {"m": {"es": "Mediana", "en": "Medium"}, "l": {"es": "Familiar", "en": "Large"}},
    "prices": {"m": 14.75, "l": 20.25},
    "allergens": {"es": ["Gluten", "Lactosa"], "en": ["Gluten", "Lactose"]}
  }, {
    "id": 6,
    "type": "pizza",
    "image": "/assets/products/pizza/pizzaProduct.webp",
    "name": {"es": "Trufa Gourmet", "en": "Trufa Gourmet"},
    "description": {
      "es": ["Salsa de Tomate", "Mozzarella 100%", "Calabacín", "Champiñon Fresco", "Pollo", "Aceite de Trufa"],
      "en": ["Tomato Sauce", "100% Mozzarella", "Zucchini", "Mushroom", "Chicken", "White Truffle Oil"]
    },
    "formats": {"m": {"es": "Mediana", "en": "Medium"}, "l": {"es": "Familiar", "en": "Large"}},
    "prices": {"m": 14.75, "l": 20.25},
    "allergens": {"es": ["Gluten", "Lactosa"], "en": ["Gluten", "Lactose"]}
  }, {
    "id": 5,
    "type": "pizza",
    "image": "/assets/products/pizza/pizzaProduct.webp",
    "name": {"es": "Carbonara", "en": "Carbonara"},
    "description": {"es": ["Salsa de Nata", "Mozzarella 100%", "Cebolla", "Champiñon Fresco", "Doble de Bacon"], "en": ["Cream Sauce", "100% Mozzarella", "Onion", "Mushroom", "Double Smoked Bacon"]},
    "formats": {"m": {"es": "Mediana", "en": "Medium"}, "l": {"es": "Familiar", "en": "Large"}},
    "prices": {"m": 14.75, "l": 20.25},
    "allergens": {"es": ["Gluten", "Lactosa"], "en": ["Gluten", "Lactose"]}
  }, {
    "id": 4,
    "type": "pizza",
    "image": "/assets/products/pizza/pizzaProduct.webp",
    "name": {"es": "Roni Pepperoni", "en": "Roni Pepperoni"},
    "description": {"es": ["Salsa de Tomate", "Doble Mozzarella 100%", "Doble de Peperoni"], "en": ["Tomato Sauce", "Double 100% Mozzarella", "Double Pepperoni"]},
    "formats": {"m": {"es": "Mediana", "en": "Medium"}, "l": {"es": "Familiar", "en": "Large"}},
    "prices": {"m": 13.3, "l": 18.3},
    "allergens": {"es": ["Gluten", "Lactosa"], "en": ["Gluten", "Lactose"]}
  }, {
    "id": 3,
    "type": "pizza",
    "image": "/assets/products/pizza/pizzaProduct.webp",
    "name": {"es": "Cabra Loca", "en": "Cabra Loca"},
    "description": {"es": ["Salsa de Tomate", "Mozzarella 100%", "Cebolla", "Bacon", "Queso de Cabra"], "en": ["Tomato Sauce", "100% Mozzarella", "Onions", "Smoked Bacon", "Goat Cheese"]},
    "formats": {"m": {"es": "Mediana", "en": "Medium"}, "l": {"es": "Familiar", "en": "Large"}},
    "prices": {"m": 13.3, "l": 18.3},
    "allergens": {"es": ["Gluten", "Lactosa"], "en": ["Gluten", "Lactose"]}
  }], "number": 2, "size": 7, "totalElements": 9, "last": false
};

export const pizzasPageTwo = {
  "content": [{
    "id": 2,
    "type": "pizza",
    "image": "/assets/products/pizza/pizzaProduct.webp",
    "name": {"es": "Natura", "en": "Natura"},
    "description": {
      "es": ["Salsa de Tomate", "Mozzarella 100%", "Calabacín", "Tomate Natural", "Parmesano"],
      "en": ["Tomato Sauce", "100% Mozzarella", "Zucchini", "Sliced Tomato", "Parmesan Cheese"]
    },
    "formats": {"m": {"es": "Mediana", "en": "Medium"}, "l": {"es": "Familiar", "en": "Large"}},
    "prices": {"m": 13.3, "l": 18.3},
    "allergens": {"es": ["Gluten", "Lactosa"], "en": ["Gluten", "Lactose"]}
  }, {
    "id": 1,
    "type": "pizza",
    "image": "/assets/products/pizza/pizzaProduct.webp",
    "name": {"es": "Cuatro Quesos", "en": "Cuatro Quesos"},
    "description": {
      "es": ["Salsa de Tomate", "Mozzarella 100%", "Parmesano", "Emmental", "Queso Azul"],
      "en": ["Tomato Sauce", "100% Mozzarella", "Parmesan Cheese", "Emmental Cheese", "Blue Cheese"]
    },
    "formats": {"m": {"es": "Mediana", "en": "Medium"}, "l": {"es": "Familiar", "en": "Large"}},
    "prices": {"m": 13.3, "l": 18.3},
    "allergens": {"es": ["Gluten", "Lactosa"], "en": ["Gluten", "Lactose"]}
  }], "number": 2, "size": 7, "totalElements": 9, "last": true
};

export const beverages = {
  "content": [{
    "id": 18,
    "type": "beverage",
    "image": "/assets/products/beverages/mahou_sin_gluten.jpeg",
    "name": {"es": "Mahou Sin Gluten", "en": "Mahou Gluten Free"},
    "description": {"es": [], "en": []},
    "formats": {"s": {"es": "330ML", "en": "330ML"}},
    "prices": {"s": 1.95},
    "allergens": {"es": ["Alcohol"], "en": ["Alcohol"]}
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
    "id": 16,
    "type": "beverage",
    "image": "/assets/products/beverages/mahou-clasica.jpg",
    "name": {"es": "Mahou Clásica", "en": "Mahou Classic"},
    "description": {"es": [], "en": []},
    "formats": {"s": {"es": "330ML", "en": "330ML"}},
    "prices": {"s": 1.95},
    "allergens": {"es": ["Gluten", "Alcohol"], "en": ["Gluten", "Alcohol"]}
  }, {
    "id": 15,
    "type": "beverage",
    "image": "/assets/products/beverages/aquarius.jpg",
    "name": {"es": "Aquarius Limón", "en": "Aquarius Lime"},
    "description": {"es": ["Azúcar"], "en": ["Sugar"]},
    "formats": {"s": {"es": "330ML", "en": "330ML"}},
    "prices": {"s": 1.95},
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
    "id": 13,
    "type": "beverage",
    "image": "/assets/products/beverages/nestea.jpg",
    "name": {"es": "Nestea Limón", "en": "Nestea Lime"},
    "description": {"es": ["Azúcar"], "en": ["Sugar"]},
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
    "id": 11,
    "type": "beverage",
    "image": "/assets/products/beverages/cocacola_zero.png",
    "name": {"es": "Coca-Cola Zero", "en": "Coca-Cola Zero"},
    "description": {"es": [], "en": []},
    "formats": {"s": {"es": "330ML", "en": "330ML"}, "m": {"es": "1L", "en": "1L"}},
    "prices": {"s": 1.95, "m": 2.95},
    "allergens": {"es": [], "en": []}
  }], "number": 1, "size": 8, "totalElements": 8, "last": true
};

export const nowFromBE = "2025-05-19T22:12:58.88240703";

export const userOrder = {
  "id": 1,
  "formattedCreatedOn": "11:49 - 16/03/2025",
  "customer": {"name": "Miguel de Cervantes", "contactNumber": 123456789, "email": "donQuijote@example.com"},
  "address": "En un lugar de la Mancha 1605",
  "orderDetails": {"deliveryTime": "form.select.time.asap", "paymentMethod": "form.select.payment.method.card", "billToChange": null, "comment": null, "storePickUp": false, "changeToGive": null},
  "cart": {
    "id": 1,
    "totalQuantity": 1,
    "totalCost": 13.3,
    "totalCostOffers": 0.0,
    "cartItems": [{
      "id": 41,
      "type": "pizza",
      "name": {"es": "Cuatro Quesos", "en": "Cuatro Quesos"},
      "description": {
        "es": ["Salsa de Tomate", "Mozzarella 100%", "Parmesano", "Emmental", "Queso Azul"],
        "en": ["Tomato Sauce", "100% Mozzarella", "Parmesan Cheese", "Emmental Cheese", "Blue Cheese"]
      },
      "formats": {"s": null, "m": {"en": "Medium", "es": "Mediana"}, "l": null},
      "price": 13.3,
      "quantity": 1
    }]
  }
};

export const userOrderPickUp = {
  "id": 1,
  "formattedCreatedOn": "11:56 - 16/03/2025",
  "customer": {"name": "Miguel de Cervantes", "contactNumber": 123456789, "email": "donQuijote@gmail.com"},
  "address": "Avenida Alustre 15",
  "orderDetails": {
    "id": 1,
    "deliveryTime": "form.select.time.asap",
    "paymentMethod": "form.select.payment.method.card",
    "billToChange": null,
    "comment": null,
    "storePickUp": true,
    "changeToGive": null
  },
  "cart": {
    "id": 1,
    "totalQuantity": 3,
    "totalCost": 29.55,
    "totalCostOffers": 22.9,
    "cartItems": [{
      "id": 42,
      "type": "pizza",
      "name": {"es": "Cuatro Quesos", "en": "Cuatro Quesos"},
      "description": {
        "es": ["Salsa de Tomate", "Mozzarella 100%", "Parmesano", "Emmental", "Queso Azul"],
        "en": ["Tomato Sauce", "100% Mozzarella", "Parmesan Cheese", "Emmental Cheese", "Blue Cheese"]
      },
      "formats": {"s": null, "m": {"en": "Medium", "es": "Mediana"}, "l": null},
      "price": 13.3,
      "quantity": 2
    }, {
      "id": 43,
      "type": "beverage",
      "name": {"es": "Coca-Cola Zero", "en": "Coca-Cola Zero"},
      "description": {"es": [], "en": []},
      "formats": {"s": null, "m": {"en": "1L", "es": "1L"}, "l": null},
      "price": 2.95,
      "quantity": 1
    }]
  }
};

export const userOrderStoreProgrammedCash = {
  "id": 1,
  "formattedCreatedOn": "11:59 - 16/03/2025",
  "customer": {"name": "Miguel de Cervantes", "contactNumber": 123456789, "email": "donQuijote@gmail.com"},
  "address": "Calle Viciosa 221",
  "orderDetails": {
    "id": 1,
    "deliveryTime": "12:05",
    "paymentMethod": "form.select.payment.method.cash",
    "billToChange": null,
    "changeToGive": null,
    "comment": null,
    "storePickUp": true,
  },
  "cart": {
    "id": 1,
    "totalQuantity": 2,
    "totalCost": 20.25,
    "totalCostOffers": 0.0,
    "cartItems": [{
      "id": 44,
      "type": "pizza",
      "name": {"es": "Roni Pepperoni", "en": "Roni Pepperoni"},
      "description": {
        "es": ["Salsa de Tomate", "Doble de Mozzarella 100%", "Doble de Peperoni"],
        "en": ["Tomato Sauce", "Double 100% Mozzarella", "Double Pepperoni"]
      },
      "formats": {"s": null, "m": null, "l": {"en": "Large", "es": "Familiar"}},
      "price": 18.3,
      "quantity": 1
    }, {
      "id": 45,
      "type": "beverage",
      "name": {"es": "Mahou Sin Gluten", "en": "Mahou Gluten Free"},
      "description": {"es": [], "en": []},
      "formats": {"s": {"en": "330ML", "es": "330ML"}, "m": null, "l": null},
      "price": 1.95,
      "quantity": 1
    }]
  }
};

export const userOrderHomeProgrammedCashChangeComment = {
  "id": 1,
  "formattedCreatedOn": "12:02 - 16/03/2025",
  "customer": {"name": "Miguel de Cervantes", "contactNumber": 123456789, "email": "donQuijote@gmail.com"},
  "address": "En un lugar de la Mancha 1605",
  "orderDetails": {
    "id": 1,
    "deliveryTime": "12:30",
    "paymentMethod": "form.select.payment.method.cash",
    "billToChange": 20.0,
    "changeToGive": 2.0,
    "comment": "pizza well cut and hot",
    "storePickUp": false,
  },
  "cart": {
    "id": 1,
    "totalQuantity": 1,
    "totalCost": 18.0,
    "totalCostOffers": 0.0,
    "cartItems": [{
      "id": 46,
      "type": "pizza",
      "name": {"en": "My Pizza", "es": "Mi Pizza"},
      "description": {
        "en": ["Gluten free", "Lactose free", "Medium", "100% Mozzarella", "Cream Sauce", "Double Smoked Bacon", "Chicken"],
        "es": ["Sin Gluten", "Sin Lactosa", "Mediana", "Mozzarella 100%", "Salsa de Nata", "Doble de Bacon", "Pollo"]
      },
      "formats": {"s": null, "m": {"en": "Medium", "es": "Mediana"}, "l": null},
      "price": 18.0,
      "quantity": 1
    }]
  }
};

export const userOrderDeleteOk = "1";

export const badCredentials = {
  "apiError": {
    "id": -4868607479562812759,
    "cause": "BadCredentialsException",
    "message": "BadCredentialsException",
    "origin": "G.E.H BadCredentialsException",
    "path": "/login",
    "logged": false,
    "fatal": false,
    "createdOn": "2025-05-19T22:29:09.391408912"
  }
};

export const userAddressList = [{"id": 1, "street": "En un lugar de la Mancha...", "number": 1605, "details": null}];

export const newUserAddressList = [{"id": 1, "street": "En un lugar de la Mancha...", "number": 1605, "details": null}, {
  "id": 2,
  "street": "Alustre",
  "number": 15,
  "details": "Floor 5, Door 2E"
}];

export const userOrderSummaryList = {
  "content": [{
    "id": 1,
    "formattedCreatedOn": "13:44 - 16/03/2025",
    "paymentMethod": "form.select.payment.method.card",
    "quantity": 1,
    "cost": 13.3,
    "costAfterOffers": null
  }], "number": 1, "size": 5, "totalElements": 1, "last": true
};

export const userOrderSummaryListManySizeFivePageOne = {
  "content": [
    {
      "id": 1,
      "formattedCreatedOn": "13:40 - 16/03/2025",
      "paymentMethod": "form.select.payment.method.card",
      "quantity": 1,
      "cost": 13.3,
      "costAfterOffers": null
    },
    {
      "id": 2,
      "formattedCreatedOn": "13:41 - 16/03/2025",
      "paymentMethod": "form.select.payment.method.card",
      "quantity": 1,
      "cost": 13.3,
      "costAfterOffers": null
    },
    {
      "id": 3,
      "formattedCreatedOn": "13:42 - 16/03/2025",
      "paymentMethod": "form.select.payment.method.card",
      "quantity": 1,
      "cost": 13.3,
      "costAfterOffers": null
    },
    {
      "id": 4,
      "formattedCreatedOn": "13:43 - 16/03/2025",
      "paymentMethod": "form.select.payment.method.card",
      "quantity": 1,
      "cost": 13.3,
      "costAfterOffers": null
    },
    {
      "id": 5,
      "formattedCreatedOn": "13:44 - 16/03/2025",
      "paymentMethod": "form.select.payment.method.card",
      "quantity": 1,
      "cost": 13.3,
      "costAfterOffers": null
    },
  ], "number": 3, "size": 5, "totalElements": 11, "last": false
};

export const userOrderSummaryListManySizeFivePageTwo = {
  "content": [
    {
      "id": 6,
      "formattedCreatedOn": "13:45 - 16/03/2025",
      "paymentMethod": "form.select.payment.method.card",
      "quantity": 1,
      "cost": 13.3,
      "costAfterOffers": null
    },
    {
      "id": 7,
      "formattedCreatedOn": "13:46 - 16/03/2025",
      "paymentMethod": "form.select.payment.method.card",
      "quantity": 1,
      "cost": 13.3,
      "costAfterOffers": null
    },
    {
      "id": 8,
      "formattedCreatedOn": "13:47 - 16/03/2025",
      "paymentMethod": "form.select.payment.method.card",
      "quantity": 1,
      "cost": 13.3,
      "costAfterOffers": null
    },
    {
      "id": 9,
      "formattedCreatedOn": "13:48 - 16/03/2025",
      "paymentMethod": "form.select.payment.method.card",
      "quantity": 1,
      "cost": 13.3,
      "costAfterOffers": null
    },
    {
      "id": 10,
      "formattedCreatedOn": "13:49 - 16/03/2025",
      "paymentMethod": "form.select.payment.method.card",
      "quantity": 1,
      "cost": 13.3,
      "costAfterOffers": null
    },
  ], "number": 3, "size": 5, "totalElements": 11, "last": false
};

export const userOrderSummaryListManySizeFivePageThree = {
  "content": [{
    "id": 11,
    "formattedCreatedOn": "13:50 - 16/03/2025",
    "paymentMethod": "form.select.payment.method.card",
    "quantity": 1,
    "cost": 13.3,
    "costAfterOffers": null
  }], "number": 3, "size": 5, "totalElements": 11, "last": true
};

export const dummyAccountDelete = {
  "apiError": {
    "id": 3455166844270299951,
    "cause": "DummyAccountError",
    "message": "DummyAccountError",
    "origin": "UserController",
    "path": null,
    "logged": false,
    "fatal": false,
    "createdOn": "2025-05-19T22:56:28.880964179"
  }
};

export const userOrderSuccess = {
  "id": 1,
  "formattedCreatedOn": "18:22 - 19/03/2025",
  "address": "Avenida Alustre 15",
  "orderDetails": {"deliveryTime": "form.select.time.asap", "paymentMethod": "form.select.payment.method.card", "billToChange": null, "comment": null, "storePickUp": false, "changeToGive": null},
  "cart": {
    "id": 1,
    "totalQuantity": 1,
    "totalCost": 13.3,
    "totalCostOffers": 0.0,
    "cartItems": [{
      "id": 53,
      "type": "pizza",
      "name": {"es": "Cuatro Quesos", "en": "Cuatro Quesos"},
      "description": {
        "es": ["Salsa de Tomate", "Mozzarella 100%", "Parmesano", "Emmental", "Queso Azul"],
        "en": ["Tomato Sauce", "100% Mozzarella", "Parmesan Cheese", "Emmental Cheese", "Blue Cheese"]
      },
      "formats": {"s": null, "m": {"en": "Medium", "es": "Mediana"}, "l": null},
      "price": 13.3,
      "quantity": 1
    }]
  }
};

export const anonUserOrderSuccess = {
  "id": 2,
  "formattedCreatedOn": "19:16 - 19/03/2025",
  "customer": {"anonCustomerName": "Clau", "anonCustomerContactNumber": 123456789, "anonCustomerEmail": "clau@example.com"},
  "address": "Avenida Alustre 15",
  "orderDetails": {
    "id": 2,
    "deliveryTime": "23:55",
    "paymentMethod": "form.select.payment.method.cash",
    "billToChange": 20.0,
    "changeToGive": 6.7,
    "comment": "Well cut",
    "storePickUp": true
  },
  "cart": {
    "id": 2,
    "totalQuantity": 1,
    "totalCost": 13.3,
    "totalCostOffers": 0.0,
    "cartItems": [{
      "id": 54,
      "type": "pizza",
      "name": {"es": "Cuatro Quesos", "en": "Cuatro Quesos"},
      "description": {
        "es": ["Salsa de Tomate", "Mozzarella 100%", "Parmesano", "Emmental", "Queso Azul"],
        "en": ["Tomato Sauce", "100% Mozzarella", "Parmesan Cheese", "Emmental Cheese", "Blue Cheese"]
      },
      "formats": {"s": null, "m": {"en": "Medium", "es": "Mediana"}, "l": null},
      "price": 13.3,
      "quantity": 1
    }]
  }
};

export const fatalError = {
  "apiError": {
    "id": -4868607479562812759,
    "cause": "Test",
    "message": "Error",
    "origin": "G.E.H BadCredentialsException",
    "path": "/login",
    "logged": true,
    "fatal": true,
    "createdOn": "2025-05-19T22:29:09.391408912"
  }
};

export const userinfo = {
  "sub": "donQuijote@example.com",
  "name": "Miguel de Cervantes",
  "email": "donQuijote@example.com",
  "phone_number": "123456789",
  "id": 1,
};
