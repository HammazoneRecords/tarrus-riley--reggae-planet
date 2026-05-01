
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


export interface Artist {
  id: string;
  name: string;
  genre: string;
  image: string;
  day: string;
  description: string;
  youtube?: string;
}

export interface MerchItem {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'hero',
  LINEUP = 'lineup',
  EXPERIENCE = 'experience',
  TICKETS = 'tickets',
  MERCH = 'merch',
  COLLAB = 'collab'
}
