import { 
  INITIAL_PRODUCTS, 
  INITIAL_BOOKINGS, 
  INITIAL_VEHICLES, 
  INITIAL_DRIVERS, 
  INITIAL_USERS 
} from "./mockData";
import { dbService } from "./db";

export const seedDatabase = async () => {
  console.log("Starting database seed...");
  
  try {
    // 1. Seed Products
    console.log("Seeding products...");
    for (const product of INITIAL_PRODUCTS) {
      await dbService.addItem("products", product);
    }

    // 2. Seed Bookings
    console.log("Seeding bookings...");
    for (const booking of INITIAL_BOOKINGS) {
      await dbService.addItem("bookings", booking);
    }

    // 3. Seed Vehicles
    console.log("Seeding vehicles...");
    for (const vehicle of INITIAL_VEHICLES) {
      await dbService.addItem("transport_vehicles", vehicle);
    }

    // 4. Seed Drivers
    console.log("Seeding drivers...");
    for (const driver of INITIAL_DRIVERS) {
      await dbService.addItem("transport_drivers", driver);
    }

    // 5. Seed Users (Profiles)
    console.log("Seeding user profiles...");
    for (const user of INITIAL_USERS) {
      // For users, we might want to use their email as a key or just add as items
      // In a real app, these should match Firebase Auth UIDs
      await dbService.addItem("users", user);
    }

    console.log("Database seeded successfully!");
    return true;
  } catch (error) {
    console.error("Error seeding database:", error);
    return false;
  }
};
