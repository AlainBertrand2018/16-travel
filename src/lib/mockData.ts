export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "Activity" | "Outing Package" | "Transfer";
  description?: string;
  subcategory?: string;
  duration?: string;
  itineraryImages?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "super-admin" | "sales" | "marketing";
  status: "active" | "inactive";
  avatar?: string;
}

export interface BookingItem {
  id: string;
  productId: string;
  productName: string;
  productType: "Activity" | "Outing Package" | "Transfer";
  date: string;
  time: string;
  price: number;
  details?: string; // For additional options/vehicle type
}

export interface Booking {
  id: string;
  // Basic Info
  customerName: string;
  email: string;
  phone: string;
  passportNumber?: string;
  countryOfOrigin?: string;
  adults: number;
  children: number;
  language: string;
  specialNotes?: string;

  // Duration
  arrivalDate: string;
  departureDate: string;
  durationDays: number;

  // Items/Program
  items: BookingItem[];

  // Financials
  paymentType: "Reservation" | "Prepaid" | "Postpaid";
  paymentStatus: "paid" | "unpaid" | "partial";
  totalAmount: number;
  advancePaid?: number;
  datePaid?: string;
  remainAmount?: number;

  status: "ongoing" | "completed" | "cancelled" | "pending";
  createdAt: string;
}

export interface AnalyticsData {
  totalRevenue: number;
  activeBookings: number;
  completedBookings: number;
  revenueTrend: { month: string; amount: number }[];
  categoryDistribution: { category: string; count: number }[];
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  registrationNumber: string; // Imm. Number
  category: "Executive Car" | "Family SUV" | "Minivan" | "Coach";
  status: "Available" | "In Service" | "Maintenance";
  capacity: number;
  image?: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseNumber: string;
  status: "Active" | "Inactive" | "On Trip";
  rating?: number;
  image?: string;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "a1",
    name: "Tandem Parasailing",
    price: 95,
    image: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=2070",
    category: "Activity",
    subcategory: "Water Sports",
    description: "Soar above the turquoise lagoon for a breathtaking bird's-eye view."
  },
  {
    id: "a2",
    name: "VIP Helicopter Tour",
    price: 450,
    image: "https://images.unsplash.com/photo-1506159679117-91689a7444c1?q=80&w=2070",
    category: "Activity",
    subcategory: "Aerial Tours",
    description: "Experience the island's majestic waterfalls and peaks from the sky."
  },
  {
    id: "p1",
    name: "Le Sud-Ouest Sauvage",
    price: 450,
    image: "https://sixteen-travel.vercel.app/images/7couleurs.jpg",
    category: "Outing Package",
    description: "Explore the wild south-west. From the Seven Colored Earths to hidden waterfalls."
  },
  {
    id: "p2",
    name: "L'Est Turquoise",
    price: 550,
    image: "https://sixteen-travel.vercel.app/images/south-east.jpg",
    category: "Outing Package",
    description: "Sail towards the sunrise with private island picnics."
  },
  {
    id: "s1",
    name: "VIP Airport Transfer",
    price: 80,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069",
    category: "Transfer",
    description: "Reliable and comfortable transportation from SSR International Airport."
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "BK-001",
    customerName: "Jean Dupont",
    email: "jean.dupont@email.com",
    phone: "+230 5819 1502",
    passportNumber: "Z1234567",
    countryOfOrigin: "France",
    adults: 2,
    children: 1,
    language: "French",
    arrivalDate: "2026-03-20",
    departureDate: "2026-03-25",
    durationDays: 5,
    status: "ongoing",
    paymentType: "Reservation",
    paymentStatus: "paid",
    totalAmount: 1080,
    createdAt: "2026-03-10",
    items: [
      {
        id: "itm-1",
        productId: "s1",
        productName: "Arrival Transfer (Minivan)",
        productType: "Transfer",
        date: "2026-03-20",
        time: "10:30",
        price: 80,
        details: "Minivan"
      },
      {
        id: "itm-2",
        productId: "p1",
        productName: "Le Sud-Ouest Sauvage",
        productType: "Outing Package",
        date: "2026-03-21",
        time: "09:00",
        price: 450
      },
      {
        id: "itm-3",
        productId: "p2",
        productName: "L'Est Turquoise",
        productType: "Outing Package",
        date: "2026-03-23",
        time: "08:30",
        price: 550
      }
    ]
  },
  {
    id: "BK-002",
    customerName: "Sarah Wilkins",
    email: "sarah.w@example.com",
    phone: "+44 7700 900077",
    passportNumber: "UK9876543",
    countryOfOrigin: "UK",
    adults: 1,
    children: 0,
    language: "English",
    arrivalDate: "2026-03-21",
    departureDate: "2026-03-24",
    durationDays: 3,
    status: "ongoing",
    paymentType: "Prepaid",
    paymentStatus: "paid",
    totalAmount: 215,
    createdAt: "2026-03-12",
    items: [
      {
        id: "itm-4",
        productId: "s1",
        productName: "Arrival Transfer (VIP Car)",
        productType: "Transfer",
        date: "2026-03-21",
        time: "14:00",
        price: 95,
        details: "Executive Car"
      },
      {
        id: "itm-5",
        productId: "b1",
        productName: "Tandem Parasailing",
        productType: "Activity",
        date: "2026-03-22",
        time: "10:00",
        price: 120
      }
    ]
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: "U1",
    name: "Alain Bertrand",
    email: "admin@sixteen-travel.com",
    role: "super-admin",
    status: "active"
  },
  {
    id: "U2",
    name: "Marie Claire",
    email: "sales@sixteen-travel.com",
    role: "sales",
    status: "active"
  },
  {
    id: "U3",
    name: "Jean Paul",
    email: "marketing@sixteen-travel.com",
    role: "marketing",
    status: "active"
  }
];

export const INITIAL_ANALYTICS: AnalyticsData = {
  totalRevenue: 12500,
  activeBookings: 12,
  completedBookings: 45,
  revenueTrend: [
    { month: "Jan", amount: 8000 },
    { month: "Feb", amount: 9500 },
    { month: "Mar", amount: 12500 }
  ],
  categoryDistribution: [
    { category: "Activity", count: 25 },
    { category: "Packages", count: 15 },
    { category: "Transfers", count: 10 }
  ]
};

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: "v1",
    make: "Mercedes-Benz",
    model: "S-Class",
    year: "2024",
    registrationNumber: "S 1600",
    category: "Executive Car",
    status: "Available",
    capacity: 3
  },
  {
    id: "v2",
    make: "Toyota",
    model: "Land Cruiser",
    year: "2023",
    registrationNumber: "SUV 880",
    category: "Family SUV",
    status: "In Service",
    capacity: 5
  },
  {
    id: "v3",
    make: "Hyundai",
    model: "H1",
    year: "2023",
    registrationNumber: "VAN 404",
    category: "Minivan",
    status: "Available",
    capacity: 7
  }
];

export const INITIAL_DRIVERS: Driver[] = [
  {
    id: "d1",
    name: "Rishi Kumar",
    phone: "+230 5770 1234",
    licenseNumber: "L-229384",
    status: "Active",
    rating: 4.9
  },
  {
    id: "d2",
    name: "Vikash Singh",
    phone: "+230 5880 5678",
    licenseNumber: "L-110293",
    status: "On Trip",
    rating: 4.8
  }
];
