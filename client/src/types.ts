// Define the shape of the inventory
export interface Inventory {
  commonKeys: number;
  uncommonKeys: number;
  rareKeys: number;
  legendaryKeys: number;
  mythicKeys: number;
  commonKeyFragments: number;
  uncommonKeyFragments: number;
  rareKeyFragments: number;
  legendaryKeyFragments: number;
  mythicKeyFragments: number;
  communityCoins: number;
  playBucksTokens: number;
  usdpTokens: number;
}

// Define the shape of the roles within the user
export interface UserRoles {
  temporaryLuckBoosts: number;
  vipPass: boolean;
  luckBoosts?: {
    boost1?: Date; // Optional fields can be indicated with '?'
    boost2?: Date;
    boost3?: Date;
    boost4?: Date;
    boost5?: Date;
  };
}

// Define the shape of the key usage history
export interface KeyUsageHistory {
  action: string;
  date: Date;
}

// Define the shape of currency transactions
export interface CurrencyTransaction {
  type: 'earn' | 'spend' | 'transfer'; // Enum to restrict to specific string values
  amount: number;
  date: Date;
  description?: string; // Optional field for description
}

// Define the shape of the user state
export interface UserState {
  id: string; // Include user ID as per your schema
  coins: number;
  xp: number;
  level: number;
  messageCount: number;
  lastDaily: Date | null; // Nullable fields
  lastWeekly: Date | null;
  inventory: Inventory;
  roles: UserRoles; // Include roles based on your schema
  keyUsageHistory: KeyUsageHistory[]; // Array of key usage history
  currencyTransactions: CurrencyTransaction[]; // Array of currency transactions
}

// Define the overall RootState
export interface RootState {
  user: UserState;
}