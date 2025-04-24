import LiveOrderSummary from "@/components/ShopPage/live-order"
import { supbase } from "@/utils/supabase/client" // Fixed typo in variable name

export default async function ShopName() {
  // No need to await params directly - Next.js handles this for us
//   const access_token = await params.shopName;
const access_token = "sdfasfdsdfsafd"
  console.log(access_token);

  let userData = null;
  let errorMessage = null;

  try {
    if (access_token) {
      const { data, error } = await supbase.auth.getUser(access_token);

      if (error) {
        errorMessage = error.message;
      } else {
        userData = data.user;
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    errorMessage = "Failed to load user data";
  }

  return (
    <div className="mt-10">
      {errorMessage ? (
        <div className="text-red-500">{errorMessage}</div>
      ) : userData ? (
        <p>Welcome, {userData.email}</p>
      ) : (
        <p>Loading user data...</p>
      )}

      <div className="md:flex md:gap-2">
        {/* Product section can be uncommented when ready */}
        <div>
          {/* <ProductPag /> */}
        </div>
      </div>
      <div className="hidden md:block">
        <LiveOrderSummary />
      </div>
    </div>
  );
}