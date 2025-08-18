// Enums
export enum UserRole {
  ADMIN = "ROLE_ADMIN",
  SELLER = "ROLE_SELLER",
  BUYER = "ROLE_BUYER",
}
export enum EventType {
  ART = "ART",
  SPORT = "SPORT",
  MUSIC = "MUSIC",
  FESTIVAL = "FESTIVAL",
  CONFERENCE = "CONFERENCE",
  CULTURE = "CULTURE",
  FOOD = "FOOD",
}
export enum EventStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  CANCELLED = "CANCELLED",
}
export enum Currency {
  USD = "USD",
  EUR = "EUR",
  MAD = "MAD",
}
export enum ArtisanCategory {
  TEXTILE = "TEXTILE",
  WOOD = "WOOD",
  POTTERY = "POTTERY",
  // ...add more as needed
}
export enum ArtisanStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  SUSPENDED = "SUSPENDED",
}
export enum BookingType {
  HOTEL = "HOTEL",
  PACKAGE = "PACKAGE",
  TRANSPORT = "TRANSPORT",
  FOOD = "FOOD",
  ARTISAN = "ARTISAN",
  EVENT = "EVENT",
}
export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
}
export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
}
export enum FoodType {
  COOKING_CLASS = "COOKING_CLASS",
  DINNER = "DINNER",
  TASTING = "TASTING",
}
export enum FoodDifficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}
export enum FoodStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  CANCELLED = "CANCELLED",
}
export enum HotelStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  CLOSED = "CLOSED",
}
export enum HotelAmenity {
  WIFI = "WIFI",
  SPA = "SPA",
  PARKING = "PARKING",
  POOL = "POOL",
  // ...add more as needed
}
export enum PackageType {
  TOUR = "TOUR",
  EXCURSION = "EXCURSION",
  ADVENTURE = "ADVENTURE",
  // ...add more as needed
}
export enum PackageStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}
export enum TransportType {
  CAR = "CAR",
  BUS = "BUS",
  BIKE = "BIKE",
  // ...add more as needed
}
export enum TransportStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  CANCELLED = "CANCELLED",
}

// User
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  avatar?: string;
  companyName?: string;
  description?: string;
  license?: string;
  address?: {
    street?: string;
    city?: string;
    country?: string;
    zipCode?: string;
  };
  role: UserRole;
  isActive: boolean;
  emailVerified: boolean;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}

// RefreshToken
export interface RefreshToken {
  id: string;
  token: string;
  user: User;
  expiresAt: string;
  revoked: boolean;
  used: boolean;
  createdAt: string;
}

// Event
export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  category: string;
  dateRange: { start: string; end: string };
  timeRange: { start: string; end: string };
  venue: string;
  address: string;
  city: string;
  lat?: number;
  lng?: number;
  status: EventStatus;
  featured: boolean;
  tags: string[];
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    website?: string;
  };
  requirements?: {
    ageLimit?: number;
    dresscode?: string;
    specialRequirements?: string[];
  };
  createdAt?: string;
  updatedAt?: string;
  organizer: User;
  tickets?: Ticket[];
  images?: EventImage[];
  attendees?: Attendee[];
}

// Ticket
export interface Ticket {
  id: string;
  typeName: string;
  price: number;
  currency: Currency;
  quantity: number;
  sold: number;
  event: Event;
}

// EventImage
export interface EventImage {
  id: string;
  url: string;
  caption?: string;
  isPrimary: boolean;
  event: Event;
}

// Attendee
export interface Attendee {
  id: string;
  name: string;
  email: string;
  phone?: string;
  event: Event;
  user?: User;
  ticket: Ticket;
  createdAt: string;
}

// Artisan
export interface Artisan {
  id: string;
  title: string;
  description: string;
  category: ArtisanCategory;
  status: ArtisanStatus;
  price: number;
  material: string;
  owner: User;
  createdAt?: string;
  updatedAt?: string;
}

// Booking
export interface Booking {
  id: string;
  type: BookingType;
  itemId: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  seller: User;
  createdAt?: string;
  updatedAt?: string;
}

// Food
export interface Foods {
  id: string;
  title: string;
  description: string;
  type: FoodType;
  difficulty: FoodDifficulty;
  status: FoodStatus;
  price: number;
  participants: number;
  owner: User;
  createdAt?: string;
  updatedAt?: string;
}

// Hotel
export interface Hotel {
  id: string;
  name: string;
  description: string;
  location: {
    address: string;
    city: string;
    region?: string;
    coordinates?: { lat: number; lng: number };
  };
  images: { url: string; caption?: string; isPrimary: boolean }[];
  amenities: HotelAmenity[];
  status: HotelStatus;
  featured: boolean;
  minPrice: number;
  maxPrice: number;
  reviews?: Review[];
}

// Review
export interface Review {
  id: string;
  rating: number;
  comment?: string;
  user: User;
  hotel: Hotel;
  createdAt: string;
}

// Package
export interface Package {
  id: string;
  title: string;
  description: string;
  type: PackageType;
  status: PackageStatus;
  price: number;
  createdAt?: string;
  updatedAt?: string;
}

// Transport
export interface Transport {
  id: string;
  title: string;
  description: string;
  type: TransportType;
  status: TransportStatus;
  price: number;
  city: string;
  feature?: string;
  owner: User;
  createdAt?: string;
  updatedAt?: string;
}