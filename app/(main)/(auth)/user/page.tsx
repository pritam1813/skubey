import React from "react";
import { createClient } from "@/app/utils/supabase/server";

export default async function User() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div id="content" className="col-sm-6 tw-order-1 lg:tw-order-2 tw-mx-auto">
      Account : {user?.email}
    </div>
  );
}
