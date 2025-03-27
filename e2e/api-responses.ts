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
      "en": "Valid on weekends for Medium and Familiar sized Pizzas"
    },
    "caveat": {"es": "Cualquiera especialidad o hasta 4 ingredientes", "en": "Any specialty or up to 4 ingredients"}
  }],
  "error": null
};

export const stores = {
  "timeStamp": "2025-03-10T18:44:57.436579591",
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
  "timeStamp": "2025-03-10T18:45:33.624953393",
  "status": {"code": 200, "description": "OK", "error": false},
  "payload": [{
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
  }, {
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
    "id": 3,
    "type": "pizza",
    "image": "/assets/products/pizza/pizzaProduct.webp",
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
    "image": "/assets/products/pizza/pizzaProduct.webp",
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
    "image": "/assets/products/pizza/pizzaProduct.webp",
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
    "id": 9,
    "type": "pizza",
    "image": "/assets/products/pizza/pizzaProduct.webp",
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
  "timeStamp": "2025-03-10T18:46:07.507337404",
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
    "image": "/assets/products/beverages/aquarius.jpg",
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

export const registerOK = {
  "timeStamp": "2025-03-14T17:23:44.311560411",
  "status": {"code": 201, "description": "CREATED", "error": false},
  "payload": null,
  "error": null
};

export const userOrder = {
  "timeStamp": "2025-03-16T10:49:39.545213687",
  "status": {"code": 200, "description": "OK", "error": false},
  "payload": {
    "id": 1,
    "createdOn": "2025-03-16T10:49:24.050955",
    "updatedOn": null,
    "formattedCreatedOn": "11:49 - 16/03/2025",
    "formattedUpdatedOn": null,
    "address": {"id": 1, "street": "En un lugar de la Mancha...", "number": 1605, "details": null},
    "orderDetails": {
      "id": 1,
      "deliveryTime": "form.select.time.asap",
      "paymentMethod": "form.select.payment.method.card",
      "billToChange": null,
      "changeToGive": null,
      "comment": null,
      "storePickUp": false,
    },
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
  },
  "error": null
};

export const userOrderPickUp = {
  "timeStamp": "2025-03-16T10:56:39.503853376",
  "status": {"code": 200, "description": "OK", "error": false},
  "payload": {
    "id": 2,
    "createdOn": "2025-03-16T10:56:32.713182",
    "updatedOn": null,
    "formattedCreatedOn": "11:56 - 16/03/2025",
    "formattedUpdatedOn": null,
    "address": {"id": 2, "street": "Avenida Alustre", "number": 15, "details": null},
    "orderDetails": {
      "id": 2,
      "deliveryTime": "form.select.time.asap",
      "paymentMethod": "form.select.payment.method.card",
      "billToChange": null,
      "changeToGive": null,
      "comment": null,
      "storePickUp": true,
    },
    "cart": {
      "id": 2,
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
  },
  "error": null
};

export const userOrderStoreProgrammedCash = {
  "timeStamp": "2025-03-16T10:59:53.297336840",
  "status": {"code": 200, "description": "OK", "error": false},
  "payload": {
    "id": 3,
    "createdOn": "2025-03-16T10:59:50.569123",
    "updatedOn": null,
    "formattedCreatedOn": "11:59 - 16/03/2025",
    "formattedUpdatedOn": null,
    "address": {"id": 3, "street": "Calle Viciosa", "number": 221, "details": null},
    "orderDetails": {
      "id": 3,
      "deliveryTime": "12:05",
      "paymentMethod": "form.select.payment.method.cash",
      "billToChange": null,
      "changeToGive": null,
      "comment": null,
      "storePickUp": true,
    },
    "cart": {
      "id": 3,
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
  },
  "error": null
};

export const userOrderHomeProgrammedCashChangeComment = {
  "timeStamp": "2025-03-16T11:03:12.335970749",
  "status": {"code": 200, "description": "OK", "error": false},
  "payload": {
    "id": 4,
    "createdOn": "2025-03-16T11:02:52.444464",
    "updatedOn": null,
    "formattedCreatedOn": "12:02 - 16/03/2025",
    "formattedUpdatedOn": null,
    "address": {"id": 1, "street": "En un lugar de la Mancha...", "number": 1605, "details": null},
    "orderDetails": {
      "id": 4,
      "deliveryTime": "12:30",
      "paymentMethod": "form.select.payment.method.cash",
      "billToChange": 20.0,
      "changeToGive": 2.0,
      "comment": "pizza well cut and hot",
      "storePickUp": false,
    },
    "cart": {
      "id": 4,
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
  },
  "error": null
};

export const userOrderDeleteOk = {
  "timeStamp": "2025-03-16T13:46:57.207969680",
  "status": {"code": 200, "description": "OK", "error": false},
  "payload": 36,
  "error": null
};

export const badCredentials = {
  "timeStamp": "2025-03-15T18:24:28.989902949",
  "status": {"code": 401, "description": "UNAUTHORIZED", "error": true},
  "payload": null,
  "error": {
    "id": 956696605120809666,
    "cause": "BadCredentialsException",
    "message": "BadCredentialsException",
    "origin": "G.E.H.authenticationException",
    "path": "/api/v1/auth/login",
    "logged": false,
    "fatal": false,
    "createdOn": null
  }
};

export const userAddressList = {
  "timeStamp": "2025-03-16T19:57:30.798875",
  "status": {"code": 200, "description": "OK", "error": false},
  "payload": [{"id": 1, "street": "En un lugar de la Mancha...", "number": 1605, "details": null}],
  "error": null
};

export const userAddressCreated = {
  "timeStamp": "2025-03-17T18:16:01.183325621",
  "status": {"code": 201, "description": "CREATED", "error": false},
  "payload": null,
  "error": null
};

export const newUserAddressList = {
  "timeStamp": "2025-03-16T19:57:30.798875",
  "status": {"code": 200, "description": "OK", "error": false},
  "payload": [{"id": 1, "street": "En un lugar de la Mancha...", "number": 1605, "details": null}, {
    "id": 2,
    "street": "Alustre",
    "number": 15,
    "details": "Floor 5, Door 2E"
  }],
  "error": null
};

export const userAddressDelete = {
  "timeStamp": "2025-03-17T18:17:34.541471178",
  "status": {"code": 200, "description": "OK", "error": false},
  "payload": null,
  "error": null
};

export const emptyUserAddressList = {
  "timeStamp": "2025-03-16T19:57:30.798875",
  "status": {"code": 200, "description": "OK", "error": false},
  "payload": [],
  "error": null
};

export const emptyUserOrderSummaryList = {
  "timeStamp": "2025-03-17T19:08:45.117990919",
  "status": {"code": 200, "description": "OK", "error": false},
  "payload": {
    "orderList": [],
    "totalPages": 0,
    "pageSize": 5,
    "totalElements": 0,
    "hasNext": false
  },
  "error": null
};

export const userOrderSummaryList = {
  "timeStamp": "2025-03-17T19:08:45.117990919",
  "status": {"code": 200, "description": "OK", "error": false},
  "payload": {
    "orderList": [{
      "id": 1,
      "formattedCreatedOn": "13:44 - 16/03/2025",
      "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
      "cart": {"id": 1, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
      "formattedUpdatedOn": null
    }],
    "totalPages": 1,
    "pageSize": 5,
    "totalElements": 1,
    "hasNext": false
  },
  "error": null
};

export const userOrderSummaryListManySizeFivePageOne = {
  "timeStamp": "2025-03-17T19:08:45.117990919",
  "status": {"code": 200, "description": "OK", "error": false},
  "payload": {
    "orderList": [
      {
        "id": 1,
        "formattedCreatedOn": "13:40 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 2, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      },
      {
        "id": 2,
        "formattedCreatedOn": "13:41 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 3, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      },
      {
        "id": 3,
        "formattedCreatedOn": "13:42 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 3, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      },
      {
        "id": 4,
        "formattedCreatedOn": "13:43 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 4, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      },
      {
        "id": 5,
        "formattedCreatedOn": "13:44 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 5, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      }
    ],
    "totalPages": 3,
    "pageSize": 5,
    "totalElements": 11,
    "hasNext": true
  },
  "error": null
};

export const userOrderSummaryListManySizeFivePageTwo = {
  "timeStamp": "2025-03-17T19:08:45.117990919",
  "status": {"code": 200, "description": "OK", "error": false},
  "payload": {
    "orderList": [
      {
        "id": 6,
        "formattedCreatedOn": "13:45 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 6, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      },
      {
        "id": 7,
        "formattedCreatedOn": "13:46 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 7, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      },
      {
        "id": 8,
        "formattedCreatedOn": "13:47 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 8, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      },
      {
        "id": 9,
        "formattedCreatedOn": "13:48 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 9, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      },
      {
        "id": 10,
        "formattedCreatedOn": "13:49 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 10, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      }
    ],
    "totalPages": 3,
    "pageSize": 5,
    "totalElements": 11,
    "hasNext": true
  },
  "error": null
};

export const userOrderSummaryListManySizeFivePageThree = {
  "timeStamp": "2025-03-17T19:08:45.117990919",
  "status": {"code": 200, "description": "OK", "error": false},
  "payload": {
    "orderList": [
      {
        "id": 11,
        "formattedCreatedOn": "13:50 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 11, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      }
    ],
    "totalPages": 3,
    "pageSize": 5,
    "totalElements": 11,
    "hasNext": false
  },
  "error": null
};

export const userOrderSummaryListManySizeTenPageOne = {
  "timeStamp": "2025-03-17T19:08:45.117990919",
  "status": {"code": 200, "description": "OK", "error": false},
  "payload": {
    "orderList": [
      {
        "id": 1,
        "formattedCreatedOn": "13:40 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 2, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      },
      {
        "id": 2,
        "formattedCreatedOn": "13:41 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 3, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      },
      {
        "id": 3,
        "formattedCreatedOn": "13:42 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 3, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      },
      {
        "id": 4,
        "formattedCreatedOn": "13:43 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 4, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      },
      {
        "id": 5,
        "formattedCreatedOn": "13:44 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 5, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      },
      {
        "id": 6,
        "formattedCreatedOn": "13:45 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 6, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      },
      {
        "id": 7,
        "formattedCreatedOn": "13:46 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 7, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      },
      {
        "id": 8,
        "formattedCreatedOn": "13:47 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 8, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      },
      {
        "id": 9,
        "formattedCreatedOn": "13:48 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 9, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      },
      {
        "id": 10,
        "formattedCreatedOn": "13:49 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 10, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      }
    ],
    "totalPages": 3,
    "pageSize": 10,
    "totalElements": 11,
    "hasNext": true
  },
  "error": null
};

export const userOrderSummaryListManySizeTenPageTwo = {
  "timeStamp": "2025-03-17T19:08:45.117990919",
  "status": {"code": 200, "description": "OK", "error": false},
  "payload": {
    "orderList": [
      {
        "id": 11,
        "formattedCreatedOn": "13:50 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 11, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      }
    ],
    "totalPages": 3,
    "pageSize": 10,
    "totalElements": 11,
    "hasNext": false
  },
  "error": null
};

export const userOrderSummaryListManySizeTwenty = {
  "timeStamp": "2025-03-17T19:08:45.117990919",
  "status": {"code": 200, "description": "OK", "error": false},
  "payload": {
    "orderList": [
      {
        "id": 1,
        "formattedCreatedOn": "13:40 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 2, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      },
      {
        "id": 2,
        "formattedCreatedOn": "13:41 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 3, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      },
      {
        "id": 3,
        "formattedCreatedOn": "13:42 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 3, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      },
      {
        "id": 4,
        "formattedCreatedOn": "13:43 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 4, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      },
      {
        "id": 5,
        "formattedCreatedOn": "13:44 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 5, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      },
      {
        "id": 6,
        "formattedCreatedOn": "13:45 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 6, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      },
      {
        "id": 7,
        "formattedCreatedOn": "13:46 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 7, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      },
      {
        "id": 8,
        "formattedCreatedOn": "13:47 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 8, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      },
      {
        "id": 9,
        "formattedCreatedOn": "13:48 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 9, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      },
      {
        "id": 10,
        "formattedCreatedOn": "13:49 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 10, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      },
      {
        "id": 11,
        "formattedCreatedOn": "13:50 - 16/03/2025",
        "orderDetails": {"paymentMethod": "form.select.payment.method.card"},
        "cart": {"id": 11, "totalQuantity": 1, "totalCost": 13.3, "totalCostOffers": 0.0},
        "formattedUpdatedOn": null
      },
    ],
    "totalPages": 3,
    "pageSize": 20,
    "totalElements": 11,
    "hasNext": false
  },
  "error": null
};

export const userAccountDelete = {
  "timeStamp": "2025-03-17T20:16:03.778308121",
  "status": {"code": 200, "description": "OK", "error": false},
  "payload": null,
  "error": null
};

export const dummyAccountDelete = {
  "timeStamp": "2025-03-17T20:25:51.968062169",
  "status": {"code": 400, "description": "BAD_REQUEST", "error": true},
  "payload": null,
  "error": {
    "id": 2338964735349441165,
    "cause": "DummyAccountError",
    "message": null,
    "origin": "UserController.deleteUser",
    "path": null,
    "logged": false,
    "fatal": false,
    "createdOn": null
  }
};

export const userOrderSuccess = {
  "timeStamp": "2025-03-19T18:22:27.772051645",
  "status": {"code": 201, "description": "CREATED", "error": false},
  "payload": {
    "id": 1,
    "formattedCreatedOn": "18:22 - 19/03/2025",
    "customer": {"name": "Miguel de Cervantes", "contactNumber": 123456789, "email": "donQuijote@gmail.com"},
    "address": {"id": 1, "street": "En un lugar de la Mancha...", "number": 1605, "details": null},
    "orderDetails": {
      "id": 1,
      "deliveryTime": "form.select.time.asap",
      "paymentMethod": "form.select.payment.method.card",
      "billToChange": null,
      "changeToGive": null,
      "comment": null,
      "storePickUp": false
    },
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
  },
  "error": null
};

export const anonUserOrderSuccess = {
  "timeStamp": "2025-03-19T19:16:37.503035324",
  "status": {"code": 201, "description": "CREATED", "error": false},
  "payload": {
    "id": 2,
    "formattedCreatedOn": "19:16 - 19/03/2025",
    "customer": {"name": "Clau", "contactNumber": 123456789, "email": "clau@example.com"},
    "address": {"id": 2, "street": "Avenida Alustre", "number": 15, "details": null},
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
  },
  "error": null
};

export const fatalError = {
  "timeStamp": "2025-03-20T20:03:07.677259730",
  "status": {"code": 500, "description": "INTERNAL_SERVER_ERROR", "error": true},
  "payload": null,
  "error": {
    "id": 72,
    "cause": "FatalBeanException",
    "message": "Not implemented yet",
    "origin": "G.E.H.unknownException",
    "path": "/api/v1/resource/product",
    "logged": true,
    "fatal": true,
    "createdOn": "2025-03-20T20:03:07.666203"
  }
};

export const AUTH_TOKEN_COOKIE = {
  name: "Pizzeria.Fabulosa.ID_TOKEN",
  value: "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkb25RdWlqb3RlQGdtYWlsLmNvbSIsImlzcyI6Imh0dHA6Ly8xOTIuMTY4LjEuMTI4IiwibmFtZSI6Ik1pZ3VlbCBkZSBDZXJ2YW50ZXMiLCJjb250YWN0TnVtYmVyIjoiMTIzNDU2Nzg5IiwiaWQiOiI1OCIsImV4cCI6MjYwNTk4NTczNiwiaWF0IjoxNzQxOTg1NzM2fQ.Jcxg4cGXtw6VFwODlSJ9VKlCXlIKU3PG81lxp6kDpeT6VhaJ9T4Z_WgSBvgYzuWyGhLLbu0OYTi4AXuM8SEnaWUNTgL06GnbkGBY4kSK5i_ObvL63eZPOrxO1cBX53A9JbDUSnF_hED_zGmnKWYsX2Mk6tZxqopKC85V5lHh4WEaF4O1cX2YhuSKz8nlRMmi0ucwLKDIPYt0rYSz1fkFmBlpiVYtpoIDrIGFsOMT7Cn4b1oVbxVN2ZqGOohsQSeMhIVUl5lImxn3X7Tt3JUOBMU6L4cNtJXiGOgJgMdJlXOJUY3l8TKcOJU14Azvr195OSytLXQRSHFccyvWhyedvM3glajNKgOmHc3kruDH_KUc1FOZlfta29pk40rhyee9NkTXqsBNKmisvmEBYN0HKhhCRnt1av9jAfK-nFxXSStK-AIoHnfjliD90E5KoF0J8rQXIhMuz1-PCVqD8vtPnjnUrlooQc967BBbhDH7lS9m-B6o9-Bszlv7UED-P394",
  path: "/",
  domain: "192.168.1.128",
  httpOnly: false,
  secure: false,
};
