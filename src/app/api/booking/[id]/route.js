import { ObjectId } from "mongodb";
import { getDatabase } from "@/lib/db";
import { errorResponse, parseObjectId } from "@/lib/api-response";
import { getSession } from "@/lib/require-session";

export async function GET(request, { params }) {
  const session = await getSession(request);
  if (!session) return errorResponse(401, "Authentication required");
  const { id } = await params;
  if (id !== session.user.id) return errorResponse(403, "You can only view your own bookings");
  try {
    const db = await getDatabase();
    return Response.json(await db.collection("bookings").find({ userId: session.user.id }).sort({ createdAt: -1 }).toArray());
  } catch (error) {
    return errorResponse(503, "Booking service is unavailable", error.message);
  }
}

export async function DELETE(request, { params }) {
  const session = await getSession(request);
  if (!session) return errorResponse(401, "Authentication required");
  const { id } = await params;
  try {
    const db = await getDatabase();
    const filter = parseObjectId(id) ? { _id: new ObjectId(id), userId: session.user.id } : { userId: session.user.id };
    const result = await db.collection("bookings").deleteOne(filter);
    return Response.json({ acknowledged: result.acknowledged, deletedCount: result.deletedCount });
  } catch (error) {
    return errorResponse(503, "Booking service is unavailable", error.message);
  }
}
