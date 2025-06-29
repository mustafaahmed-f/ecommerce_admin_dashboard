import { actions } from "@/app/_utils/constants/Actions";
import { generateSuccessMsg } from "@/app/_utils/helperMethods/generateSuccessMsg";
import { stripe } from "@/app/_utils/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const starting_after = searchParams.get("starting_after");
    const ending_before = searchParams.get("ending_before");

    const transactions = await stripe.issuing.transactions.list({
      limit: 10,
      starting_after: starting_after ?? undefined,
      ending_before: ending_before ?? undefined,
    });

    return NextResponse.json(
      {
        success: true,
        result: transactions.data,
        message: generateSuccessMsg(actions.fetched),
        additionalInfo: transactions.has_more,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message },
      { status: error.cause ?? 500 },
    );
  }
}
