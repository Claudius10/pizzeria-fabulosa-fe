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
  }],
  "error": null
};
