// Define the shape of the inventory
export interface Inventory {
  commonKeys: number;
  uncommonKeys: number;
  rareKeys: number;
  legendaryKeys: number;
  mythicKeys: number;
}

// Define the shape of the user state
export interface UserState {
  coins: number;
  inventory: Inventory;
}

// Define the overall RootState
export interface RootState {
  user: UserState;
}