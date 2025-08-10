import React, { useEffect, useState } from "react";
import { getEntitlements, hasPlatformAccess, Entitlement } from "../../services/entitlementsClient";
import { BuyButtons } from "./BuyButtons";

type Props = {
  userEmail?: string; // wire from your auth/profile if available
  priceIdDevHub?: string; // Stripe Price ID for Developer Hub
  priceIdDevHubPro?: string; // Stripe Price ID for Developer Hub Pro
};

export const PlatformAccess: React.FC<Props> = ({ userEmail, priceIdDevHub, priceIdDevHubPro }) => {
  const [ents, setEnts] = useState<Entitlement[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (!userEmail) {
          setEnts([]);
          return;
        }
        const e = await getEntitlements({ email: userEmail });
        if (mounted) setEnts(e);
      } catch (err: any) {
        if (mounted) setError(err?.message || "Failed to load entitlements");
      }
    })();
    return () => {
      mounted = false;
    };
  }, [userEmail]);

  const hasDevHub = ents ? hasPlatformAccess(ents, [priceIdDevHub || ""]) : false;
  const hasDevHubPro = ents ? hasPlatformAccess(ents, [priceIdDevHubPro || ""]) : false;

  return (
    <div className="p-4 border rounded">
      <h3 className="font-semibold mb-2">Platform Access</h3>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {ents === null ? (
        <div>Checking your access…</div>
      ) : hasDevHub || hasDevHubPro ? (
        <div className="text-emerald-700">You have active access to Aethergen Developer Hub.</div>
      ) : (
        <div>
          <div className="mb-3">Get access to build-your-own models and synthetic datasets.</div>
          <BuyButtons
            datasetStandardPriceId={undefined}
            modelSeatPriceId={undefined}
            prediction100kPriceId={undefined}
          />
          <div className="mt-2 text-sm text-slate-600">Note: Configure your DevHub price IDs in this component or route these buttons elsewhere with the correct IDs.</div>
        </div>
      )}
    </div>
  );
};

export default PlatformAccess;


