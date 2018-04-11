import { Injectable } from '@angular/core';
import * as http from "http";

@Injectable()
export class FoodService {


  constructor() { }

  getFoodByPrice(price: number) {


    return [

      {
        "id": 1,
        "name": "BigMack",
        "place": "mcdonalds",
        "price": 50,
        "category": "burger"
      },

      {
        "id": 2,
        "name": "CheeseBurger",
        "place": "Authentik",
        "price": 22,
        "category": "burger"
      },

      {
        "id": 3,
        "name": "pizza",
        "place": "Pizza Hut",
        "price": 39,
        "category": "pizza"
      },

      {
        "id": 4,
        "name": "sandwitch thon",
        "place": "khalid",
        "price": 8,
        "category": "sandwich"
      },
      {
        "id": 1,
        "name": "tacos",
        "place": "Tacos de Lyon",
        "price": 32,
        "category": "tacos"
      },

      {
        "id": 2,
        "name": "pasta",
        "place": "Authentik",
        "price": 28,
        "category": "pasta"
      },
      {
        "id": 1,
        "name": "32",
        "place": "mcdonalds",
        "price": 32,
        "category": "pizza"
      },

      {
        "id": 2,
        "name": "11",
        "place": "Authentik",
        "price": 11,
        "category": "pizza"
      },
      {
        "id": 1,
        "name": "49",
        "place": "mcdonalds",
        "price": 49,
        "category": "pizza"
      },

      {
        "id": 2,
        "name": "36",
        "place": "Authentik",
        "price": 36,
        "category": "pizza"
      },
      {
        "id": 1,
        "name": "77",
        "place": "mcdonalds",
        "price": 77,
        "category": "pizza"
      },

      {
        "id": 2,
        "name": "66",
        "place": "Authentik",
        "price": 66,
        "category": "pizza"
      },
      {
        "id": 1,
        "name": "33",
        "place": "mcdonalds",
        "price": 33,
        "category": "pizza"
      },

      {
        "id": 2,
        "name": "43",
        "place": "Authentik",
        "price": 43,
        "category": "pizza"
      },
      {
        "id": 1,
        "name": "17",
        "place": "mcdonalds",
        "price": 17,
        "category": "pizza"
      },

      {
        "id": 2,
        "name": "56",
        "place": "Authentik",
        "price": 56,
        "category": "pizza"
      },
      {
        "id": 1,
        "name": "62",
        "place": "mcdonalds",
        "price": 62,
        "category": "pizza"
      },

      {
        "id": 2,
        "name": "25",
        "place": "Authentik",
        "price": 25,
        "category": "pizza"
      },

    ];

  }

}

export interface Food {
  id: number;
  name: string;
  place: string;
  price: number;
  category: string;
}

