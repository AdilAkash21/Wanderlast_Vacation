import { getDatabase } from "@/lib/db";
import { errorResponse, readJson } from "@/lib/api-response";
import { getSession } from "@/lib/require-session";

const fields = ["destinationName", "country", "category", "duration", "image", "description"];

function validateDestination(input) {
  const value = Object.fromEntries(fields.map((field) => [field, String(input?.[field] ?? "").trim()]));
  const price = Number(input?.price);
  const departureDate = new Date(input?.departureDate);
  const errors = {};
  for (const field of fields) if (!value[field]) errors[field] = "This field is required";
  if (!Number.isFinite(price) || price < 0) errors.price = "Price must be a non-negative number";
  if (Number.isNaN(departureDate.getTime())) errors.departureDate = "A valid departure date is required";
  return { value: { ...value, price, departureDate }, errors };
}

export async function GET() {
  try {
    const db = await getDatabase();
    const destinations = await db.collection("destinations").find({}).sort({ createdAt: -1 }).toArray();
    return Response.json(destinations);
  } catch (error) {
    return errorResponse(503, "Destination service is unavailable", error.message);
  }
}

export async function POST(request) {
  const session = await getSession(request);
  if (!session) return errorResponse(401, "Authentication required");
  const body = await readJson(request);
  const { value, errors } = validateDestination(body);
  if (Object.keys(errors).length) return errorResponse(400, "Invalid destination", errors);
  try {
    const db = await getDatabase();
    const document = { ...value, createdBy: session.user.id, createdAt: new Date(), updatedAt: new Date() };
    const result = await db.collection("destinations").insertOne(document);
    return Response.json({ ...document, _id: result.insertedId }, { status: 201 });
  } catch (error) {
    return errorResponse(503, "Destination service is unavailable", error.message);
  }
}
