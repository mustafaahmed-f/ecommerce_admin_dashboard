import { StripeTransaction } from "@/app/_features/transactions/types/TransactionType";
import { actions } from "@/app/_utils/constants/Actions";
import { generateSuccessMsg } from "@/app/_utils/helperMethods/generateSuccessMsg";
import { stripe } from "@/app/_utils/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const starting_after =
      searchParams.get("starting_after") === ""
        ? undefined
        : searchParams.get("starting_after");
    const ending_before =
      searchParams.get("ending_before") === ""
        ? undefined
        : searchParams.get("ending_before");

    const [firstTransaction, transactions] = await Promise.all([
      stripe.paymentIntents.list({
        limit: 1,
      }),
      stripe.paymentIntents.list({
        limit: 10,
        starting_after: starting_after ?? undefined,
        ending_before: ending_before ?? undefined,
      }),
    ]);

    const isOnFirstPage =
      transactions.data.length > 0 &&
      transactions.data[0].id === firstTransaction.data[0].id;

    const hasPrevious = !isOnFirstPage;

    const finalTransactions: StripeTransaction[] = transactions.data.map(
      (transaction: any) => ({
        id: transaction.id,
        created: transaction.created,
        status: transaction.status,
        amount: transaction.amount,
        currency: transaction.currency,
        payment_method_types: transaction.payment_method_types,
        amount_received: transaction.amount_received,
        latest_charge: transaction.latest_charge,
      }),
    );

    return NextResponse.json(
      {
        success: true,
        result: finalTransactions,
        message: generateSuccessMsg(actions.fetched),
        additionalInfo: {
          hasMore: transactions.has_more,
          hasPrevious,
          firstId: transactions.data[0].id,
          lastId: transactions.data[transactions.data.length - 1].id,
        },
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
