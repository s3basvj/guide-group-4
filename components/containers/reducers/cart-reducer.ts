import { CartItem, Pokemon, PixabayImage } from "../index";
import pokemonDB from "../apis/pokeApi";
import storedImages from "../apis/pixabay";
// Define los tipos de acciones del carrito
export type CartActions = | { type: "add-to-cart"; payload: { item: PixabayImage | Pokemon } }
                          | {type: "remove-from-cart";payload: { id: Pokemon["id"] | PixabayImage["id"] };}
                          | {type: "decrease-quantity";payload: { id: Pokemon["id"] | PixabayImage["id"] };} 
                          | {type: "increase-quantity";payload: { id: Pokemon["id"] | PixabayImage["id"] };}
                          | { type: "clear-cart" }
                          | { type: 'buy' };

// Define el estado del carrito
export type CartState = {
  pokemonData: Pokemon[];
  pixabayData: PixabayImage[];
  cart: CartItem[];
};

// Función para inicializar el carrito desde el almacenamiento local
const initialCart = (): CartItem[] => {
  let localStorageCart: string | null = null;
    if (typeof window !== 'undefined') {
        localStorageCart = localStorage.getItem('cart');
    }
  return localStorageCart ? JSON.parse(localStorageCart) : [];
};

// Estado inicial del carrito
export const initialState: CartState = {
  pokemonData: pokemonDB, 
  pixabayData: storedImages,
  cart: initialCart(),
};
const MIN_ITEMS = 1;
const MAX_ITEMS = 5;
// Reductor del carrito
export const cartReducer = (
  state: CartState = initialState,
  action: CartActions
) => {
  switch (action.type) {
    case 'add-to-cart': {
        const { item } = action.payload;
        if (!item) {
            console.error('Se intentó agregar un item indefinido al carrito.');
            return state; // Salir temprano si el item es undefined
        }
        // Suponiendo que tienes una forma de determinar si el item es Pokemon o PixabayImage
        const itemType = 'nombre' in item ? 'pokemon' : 'pixabayImage';
    
        // Busca si el ítem ya existe en el carrito
        // Asegúrate de que estás accediendo correctamente al 'id' dependiendo de la estructura de CartItem
        const itemExists = state.cart.find(cartItem => cartItem.item && cartItem.item.id === item.id);
    
        let updatedCart: CartItem[] = [];
    
        if (itemExists) {
            updatedCart = state.cart.map(cartItem => {
                if (cartItem.item && cartItem.item.id === item.id && cartItem.quantity < MAX_ITEMS) {
                    return { ...cartItem, quantity: cartItem.quantity + 1 };
                }
                return cartItem;
            });
        } else {
            // Corrige cómo agregas el nuevo item al carrito para asegurar que 'item' se define correctamente
            updatedCart = [
                ...state.cart,
                {
                    id: item.id, // Esto asume que tanto Pokemon como PixabayImage tienen un 'id'
                    item, // Aquí aseguras que el objeto 'item' se pasa correctamente
                    type: itemType,
                    quantity: 1,
                },
            ];
        }
    
        return {
            ...state,
            cart: updatedCart,
        };
    }
    
    case "remove-from-cart": {
      const { id } = action.payload;
      const cart = state.cart.filter((item) => item.id !== id);
      return {
        ...state,
        cart,
      };
    }

    case "decrease-quantity": {
      const { id } = action.payload;
      const cart = state.cart.map((item) => {
        if (item.id === id && item.quantity > MIN_ITEMS) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });

      return {
        ...state,
        cart,
      };
    }

    case "increase-quantity": {
      const { id } = action.payload;
      const cart = state.cart.map((item) => {
        if (item.id === id && item.quantity < MAX_ITEMS) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      return {
        ...state,
        cart,
      };
    }

    case "clear-cart": {
      return {
        ...state,
        cart: [],
      };
    }
    case "buy":{
      return{
        ...state,
        cart:[],
      }
    }

    default:
      return state;
  }
};
