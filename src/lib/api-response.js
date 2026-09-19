import { NextResponse } from "next/server";

export function errorResponse(status, error, details) {
  return NextResponse.json({ error, ...(details ? { details } : {}) }, { status });
}

export function parseObjectId(value) {
  return /^[a-f\d]{24}$/i.test(value);
}

export async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
