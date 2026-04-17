import { NextRequest, NextResponse } from "next/server";
import { resolveAuthenticatedUser } from "@/lib/server-auth";
import { dbConnect } from "@/lib/mongoose";
import Conversation from "@/models/Conversation";
import Message from "@/models/Message";

export async function GET(request: NextRequest) {
  const user = await resolveAuthenticatedUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const conversationId = searchParams.get("conversationId");
  if (!conversationId) {
    return NextResponse.json({ error: "Missing conversationId" }, { status: 400 });
  }

  await dbConnect();
  const conversation = await Conversation.findById(conversationId).lean();
  if (!conversation) {
    return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
  }

  const isParticipant = conversation.participants.some((participantId: unknown) => String(participantId) === String(user._id));
  if (!isParticipant) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const messages = await Message.find({ conversationId }).sort({ createdAt: 1 }).lean();
  return NextResponse.json({ messages });
}

export async function POST(request: NextRequest) {
  const user = await resolveAuthenticatedUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const body = (await request.json().catch(() => ({}))) as { conversationId?: string; content?: string };
  if (!body.conversationId || !body.content?.trim()) {
    return NextResponse.json({ error: "Missing conversationId or content" }, { status: 400 });
  }

  const conversation = await Conversation.findById(body.conversationId);
  if (!conversation) {
    return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
  }

  const isParticipant = conversation.participants.some((participantId: unknown) => String(participantId) === String(user._id));
  if (!isParticipant) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const receiverId = conversation.participants.find((participantId: unknown) => String(participantId) !== String(user._id));
  const message = await Message.create({
    conversationId: conversation._id,
    senderId: user._id,
    receiverId: receiverId || user._id,
    content: body.content.trim(),
  });

  conversation.lastMessageAt = new Date();
  conversation.lastMessagePreview = body.content.trim().slice(0, 120);
  await conversation.save();

  return NextResponse.json({ message }, { status: 201 });
}