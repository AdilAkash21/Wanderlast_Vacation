import { toNextJsHandler } from "better-auth/next-js";

const missingConfigurationResponse = () => Response.json(
    { error: "Authentication is not configured. Set MONGODB_URI to enable authentication." },
    { status: 503 },
);

const getAuthHandler = async () => {
    if (!process.env.MONGODB_URI) {
        return null;
    }

    const { auth } = await import("@/lib/auth");
    return toNextJsHandler(auth);
};

export async function GET(request) {
    const handler = await getAuthHandler();
    return handler ? handler.GET(request) : missingConfigurationResponse();
}

export async function POST(request) {
    const handler = await getAuthHandler();
    return handler ? handler.POST(request) : missingConfigurationResponse();
}