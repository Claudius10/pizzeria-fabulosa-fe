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
    "image": "/assets/products/pizza/pizzaProduct.png",
    "name": {"es": "Cuatro Quesos", "en": "Cuatro Quesos"},
    "description": {
      "es": ["Salsa de Tomate", "Mozzarella 100%", "Parmesano", "Emmental", "Queso Azul"],
      "en": ["Tomato Sauce", "100% Mozzarella", "Parmesan Cheese", "Emmental Cheese", "Blue Cheese"]
    },
    "formats": {"m": {"es": "Mediana", "en": "Medium"}, "l": {"es": "Familiar", "en": "Large"}},
    "prices": {"m": 13.3, "l": 18.3},
    "allergens": {"es": ["Gluten", "Lactosa"], "en": ["Gluten", "Lactose"]}
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

export const AUTH_TOKEN_COOKIE = {
  name: "Pizzeria.Fabulosa.ID_TOKEN",
  value: "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkb25RdWlqb3RlQGdtYWlsLmNvbSIsImlzcyI6Imh0dHA6Ly8xOTIuMTY4LjEuMTI4IiwibmFtZSI6Ik1pZ3VlbCBkZSBDZXJ2YW50ZXMiLCJjb250YWN0TnVtYmVyIjoiMTIzNDU2Nzg5IiwiaWQiOiI1OCIsImV4cCI6MjYwNTk4NTczNiwiaWF0IjoxNzQxOTg1NzM2fQ.Jcxg4cGXtw6VFwODlSJ9VKlCXlIKU3PG81lxp6kDpeT6VhaJ9T4Z_WgSBvgYzuWyGhLLbu0OYTi4AXuM8SEnaWUNTgL06GnbkGBY4kSK5i_ObvL63eZPOrxO1cBX53A9JbDUSnF_hED_zGmnKWYsX2Mk6tZxqopKC85V5lHh4WEaF4O1cX2YhuSKz8nlRMmi0ucwLKDIPYt0rYSz1fkFmBlpiVYtpoIDrIGFsOMT7Cn4b1oVbxVN2ZqGOohsQSeMhIVUl5lImxn3X7Tt3JUOBMU6L4cNtJXiGOgJgMdJlXOJUY3l8TKcOJU14Azvr195OSytLXQRSHFccyvWhyedvM3glajNKgOmHc3kruDH_KUc1FOZlfta29pk40rhyee9NkTXqsBNKmisvmEBYN0HKhhCRnt1av9jAfK-nFxXSStK-AIoHnfjliD90E5KoF0J8rQXIhMuz1-PCVqD8vtPnjnUrlooQc967BBbhDH7lS9m-B6o9-Bszlv7UED-P394",
  path: "/",
  domain: "192.168.1.128",
  httpOnly: false,
  secure: false,
};
