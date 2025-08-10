import React from "react";
import { startStripeCheckout } from "../../services/billingClient";

type Props = {
  // Provide your Stripe Price IDs via env or props
  datasetStandardPriceId?: string;
  modelSeatPriceId?: string;
  prediction100kPriceId?: string;
};

export const BuyButtons: React.FC<Props> = ({
  datasetStandardPriceId,
  modelSeatPriceId,
  prediction100kPriceId,
}) => {
  const successUrl = window.location.origin + "/billing/success";
  const cancelUrl = window.location.origin + "/billing/cancel";

  return (
    <div className="flex flex-col gap-2">
      <button
        className="px-4 py-2 rounded bg-blue-600 text-white"
        disabled={!datasetStandardPriceId}
        onClick={() =>
          datasetStandardPriceId &&
          startStripeCheckout(datasetStandardPriceId, {
            mode: "subscription",
            successUrl,
            cancelUrl,
            metadata: { sku: "dataset_standard" },
          })
        }
      >
        Buy Standard Dataset (Monthly)
      </button>

      <button
        className="px-4 py-2 rounded bg-emerald-600 text-white"
        disabled={!modelSeatPriceId}
        onClick={() =>
          modelSeatPriceId &&
          startStripeCheckout(modelSeatPriceId, {
            mode: "subscription",
            successUrl,
            cancelUrl,
            metadata: { sku: "model_seat" },
          })
        }
      >
        Subscribe to Model (Per Seat)
      </button>

      <button
        className="px-4 py-2 rounded bg-indigo-600 text-white"
        disabled={!prediction100kPriceId}
        onClick={() =>
          prediction100kPriceId &&
          startStripeCheckout(prediction100kPriceId, {
            mode: "payment",
            successUrl,
            cancelUrl,
            metadata: { sku: "pred_100k" },
          })
        }
      >
        Buy 100k Predictions (One-time)
      </button>
    </div>
  );
};

export default BuyButtons;


