import { ObjectId } from "mongodb";
import { getDatabase } from "@/lib/db";
import { errorResponse, parseObjectId, readJson } from "@/lib/api-response";
import { getSession } from "@/lib/require-session";

const editableFields = ["destinationName", "country", "category", "duration", "image", "description", "price", "departureDate"];

async function findDestination(id) {
  if (!parseObjectId(id)) return null;
  const db = await getDatabase();
  return db.collection("destinations").findOne({ _id: new ObjectId(id) });
}

export async function GET(_request, { params }) {
  const { id } = await params;
  try {
    const destination = await findDestination(id);
    return destination ? Response.json(destination) : errorResponse(404, "Destination not found");
  } catch (error) {
    return errorResponse(503, "Destination service is unavailable", error.message);
  }
}

export async function PATCH(request, { params }) {
  const session = await getSession(request);
  if (!session) return errorResponse(401, "Authentication required");
  const { id } = await params;
  if (!parseObjectId(id)) return errorResponse(400, "Invalid destination id");
  const body = await readJson(request);
  const update = {};
  for (const field of editableFields) {
    if (body?.[field] !== undefined) update[field] = field === "price" ? Number(body[field]) : body[field];
  }
  if (update.price !== undefined && (!Number.isFinite(update.price) || update.price < 0)) return errorResponse(400, "Price must be a non-negative number");
  if (update.departureDate !== undefined) {
    update.departureDate = new Date(update.departureDate);
    if (Number.isNaN(update.departureDate.getTime())) return errorResponse(400, "Invalid departure date");
  }
  if (!Object.keys(update).length) return errorResponse(400, "No fields to update");
  try {
    const db = await getDatabase();
    const result = await db.collection("destinations").updateOne({ _id: new ObjectId(id) }, { $set: { ...update, updatedAt: new Date() } });
    if (!result.matchedCount) return errorResponse(404, "Destination not found");
    return Response.json({ acknowledged: result.acknowledged, modifiedCount: result.modifiedCount });
  } catch (error) {
    return errorResponse(503, "Destination service is unavailable", error.message);
  }
}

export async function DELETE(request, { params }) {
  const session = await getSession(request);
  if (!session) return errorResponse(401, "Authentication required");
  const { id } = await params;
  if (!parseObjectId(id)) return errorResponse(400, "Invalid destination id");
  try {
    const db = await getDatabase();
    const result = await db.collection("destinations").deleteOne({ _id: new ObjectId(id) });
    if (!result.deletedCount) return errorResponse(404, "Destination not found");
    return Response.json({ acknowledged: result.acknowledged, deletedCount: result.deletedCount });
  } catch (error) {
    return errorResponse(503, "Destination service is unavailable", error.message);
  }
}
