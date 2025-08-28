import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const email = searchParams.get("email");
    const completed = searchParams.get("completed");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    const createdAfter = searchParams.get("created_after");
    const createdBefore = searchParams.get("created_before");
    const hasNote = searchParams.get("has_note");
    const sortBy = searchParams.get("sort_by") || "created_at";
    const sortOrder = searchParams.get("sort_order") || "desc";

    let query = supabase.from("tasks").select("*");

    if (!email)
      return NextResponse.json({ error: "Email is required" }, { status: 400 });

    if (email) {
      query = query.eq("email", email);
    }

    if (completed !== null) {
      if (completed === "true") {
        query = query.not("completed_at", "is", null);
      } else if (completed === "false") {
        query = query.is("completed_at", null);
      }
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,note.ilike.%${search}%`);
    }

    if (createdAfter) {
      query = query.gte("created_at", createdAfter);
    }

    if (createdBefore) {
      query = query.lte("created_at", createdBefore);
    }

    if (hasNote !== null) {
      if (hasNote === "true") {
        query = query.not("note", "is", null);
      } else if (hasNote === "false") {
        query = query.is("note", null);
      }
    }

    query = query.order(sortBy, { ascending: sortOrder === "asc" });
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching tasks:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      tasks: data || [],
      pagination: {
        limit,
        offset,
        total: count || 0,
        hasMore: (data?.length || 0) === limit,
      },
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, title, note } = body;

    if (!email || !title) {
      return NextResponse.json(
        { error: "Email and title are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("tasks")
      .insert([{ email, title, note }])
      .select()
      .single();

    if (error) {
      console.error("Error creating task:", error);
      return NextResponse.json(
        { error: "Error creating task" },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
