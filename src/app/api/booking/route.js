import { ObjectId } from "mongodb";
import { getDatabase } from "@/lib/db";
import { errorResponse, readJson } from "@/lib/api-response";
import { getSession } from "@/lib/require-session";

export async function POST(request) {
  const session = await getSession(request);
  if (!session) return errorResponse(401, "Authentication required");
  const body = await readJson(request);
  const destinationId = String(body?.destinationId ?? "");
  const departureDate = new Date(body?.departureDate);
  if (!/^[a-f\d]{24}$/i.test(destinationId) || Number.isNaN(departureDate.getTime())) {
    return errorResponse(400, "A valid destination and departure date are required");
  }
  try {
    const db = await getDatabase();
    const destination = await db.collection("destinations").findOne({ _id: new ObjectId(destinationId) });
    if (!destination) return errorResponse(404, "Destination not found");
    const booking = {
      userId: session.user.id,
      userName: session.user.name || body.userName || "Guest",
      userImage: session.user.image || body.userImage || null,
      destinationId: destination._id,
      destinationName: destination.destinationName,
      destinationPrice: destination.price,
      departureDate,
      createdAt: new Date(),
    };
    const result = await db.collection("bookings").insertOne(booking);
    return Response.json({ ...booking, _id: result.insertedId }, { status: 201 });
  } catch (error) {
    return errorResponse(503, "Booking service is unavailable", error.message);
  }
}
