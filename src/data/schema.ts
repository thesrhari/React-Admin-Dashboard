import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const userSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  firstName: z
    .string()
    .min(3, { message: "First name must be at least 3 characters" }),
  lastName: z
    .string()
    .min(1, { message: "Last name must be at least 1 characters" }),
  price: z.coerce
    .number({ invalid_type_error: "Price must be at least 0" })
    .min(0),
});
