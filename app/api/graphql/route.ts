import { NextRequest, NextResponse } from "next/server";
import { gql } from "@apollo/client";
import { serverClient } from "@/lib/server/serverClient";

export const dynamic = "force-dynamic";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(request: NextRequest) {
  const { query, variables } = await request.json();

  try {
    let result;

    // Check if the query is a mutation or a query
    if (query.trim().startsWith("mutation")) {
      result = await serverClient.mutate({
        mutation: gql`
          ${query}
        `,
        variables,
      });
    } else {
      result = await serverClient.query({
        query: gql`
          ${query}
        `,
        variables,
      });
    }

    const data = result.data;
    console.log("DATA >>>", data);

    return NextResponse.json(
      { data },
      // Resolve CORS issue
      {
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
