import { v4 as uuidv4 } from "uuid";

interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description:
        "Minim exercitation sunt esse magna laboris occaecat Lorem dolore nostrud voluptate nisi aliquip anim.",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description: "Nisi sunt labore excepteur veniam.",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description: "Proident anim proident ad eu ea amet id ut duis minim.",
      status: "pending",
      createdAt: Date.now(),
    },
  ],
};
