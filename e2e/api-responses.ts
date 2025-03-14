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
  "timeStamp": "2025-03-14T20:09:27.821385996",
  "status": {"code": 200, "description": "OK", "error": false},
  "payload": {
    "id": 1,
    "createdOn": "2025-02-28T22:41:59.795526",
    "updatedOn": null,
    "formattedCreatedOn": "23:41 - 28/02/2025",
    "formattedUpdatedOn": null,
    "address": {"id": 1, "street": "En un lugar de la Mancha...", "number": 1605, "details": null},
    "orderDetails": {
      "id": 1,
      "deliveryTime": "form.select.time.asap",
      "paymentMethod": "form.select.payment.method.cash",
      "billToChange": null,
      "changeToGive": null,
      "comment": null
    },
    "cart": {
      "id": 1,
      "totalQuantity": 1,
      "totalCost": 13.3,
      "totalCostOffers": null,
      "cartItems": [{
        "id": 10,
        "type": "pizza",
        "name": {"en": "Cuatro Quesos", "es": "Cuatro Quesos"},
        "description": {
          "en": ["Tomato Sauce", "100% Mozzarella", "Parmesan Cheese", "Emmental Cheese", "Blue Cheese"],
          "es": ["Salsa de Tomate", "Mozzarella 100%", "Parmesano", "Emmental", "Queso Azul"]
        },
        "formats": {"m": {"en": "Medium", "es": "Mediana"}, "s": {}, "l": {}},
        "price": 13.3,
        "quantity": 1
      }]
    }
  },
  "error": null
};

export const store = {
  "timeStamp": "2025-03-14T21:48:33.266443656",
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

export const AUTH_TOKEN_COOKIE = {
  name: "Pizzeria.Fabulosa.ID_TOKEN",
  value: "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkb25RdWlqb3RlQGdtYWlsLmNvbSIsImlzcyI6Imh0dHA6Ly8xOTIuMTY4LjEuMTI4IiwibmFtZSI6Ik1pZ3VlbCBkZSBDZXJ2YW50ZXMiLCJjb250YWN0TnVtYmVyIjoiMTIzNDU2Nzg5IiwiaWQiOiI1OCIsImV4cCI6MjYwNTk4NTczNiwiaWF0IjoxNzQxOTg1NzM2fQ.Jcxg4cGXtw6VFwODlSJ9VKlCXlIKU3PG81lxp6kDpeT6VhaJ9T4Z_WgSBvgYzuWyGhLLbu0OYTi4AXuM8SEnaWUNTgL06GnbkGBY4kSK5i_ObvL63eZPOrxO1cBX53A9JbDUSnF_hED_zGmnKWYsX2Mk6tZxqopKC85V5lHh4WEaF4O1cX2YhuSKz8nlRMmi0ucwLKDIPYt0rYSz1fkFmBlpiVYtpoIDrIGFsOMT7Cn4b1oVbxVN2ZqGOohsQSeMhIVUl5lImxn3X7Tt3JUOBMU6L4cNtJXiGOgJgMdJlXOJUY3l8TKcOJU14Azvr195OSytLXQRSHFccyvWhyedvM3glajNKgOmHc3kruDH_KUc1FOZlfta29pk40rhyee9NkTXqsBNKmisvmEBYN0HKhhCRnt1av9jAfK-nFxXSStK-AIoHnfjliD90E5KoF0J8rQXIhMuz1-PCVqD8vtPnjnUrlooQc967BBbhDH7lS9m-B6o9-Bszlv7UED-P394",
  path: "/",
  domain: "localhost",
  httpOnly: false,
  secure: false,
};
