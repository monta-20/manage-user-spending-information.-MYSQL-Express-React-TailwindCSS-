// src/types.ts

export interface Spending {
    id: string; // Assuming id is a number
    createdat: string; // Assuming createdat is a string, adjust if it's a Date object
    userid: number;
    count: number;
    type: string;
    model: string;
  }
  