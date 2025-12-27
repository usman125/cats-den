import { z } from "zod";
import { connectToDatabase } from "@/lib/db/connection";
import User from "@/lib/db/models/user";
import { Errors, handleAPIError, apiSuccess } from "@/lib/api/errors";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return Errors.validationError(result.error.issues[0].message);
    }

    const { name, email, password } = result.data;

    const db = await connectToDatabase();
    if (!db) {
      return Errors.databaseError();
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Errors.alreadyExists("An account with this email");
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    return apiSuccess({ message: "Account created successfully" }, 201);
  } catch (error) {
    return handleAPIError(error);
  }
}










