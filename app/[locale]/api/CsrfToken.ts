 "use server";
import axios from "axios";
import { cookies } from "next/headers";
import RedirectInCsc  from "./redirectIncCsc"
// Fetch CSRF token from Laravel Sanctum
export default async function fetchCsrfToken() {
  try {
    const res :any = await axios.get("https://mobilstore.aymankanawi.info/sanctum/csrf-cookie", {
      withCredentials: true, // ensure cookies are sent and received
    });

    const xsrfToken :any  = res.headers["set-cookie"]
      .find((cookie :any) => cookie.includes("XSRF-TOKEN"))
      ?.split("XSRF-TOKEN=")[1]
      ?.split(";")[0];

    const mobilStoreSession = res.headers["set-cookie"]
      .find((cookie :any) => cookie.includes("mobil_store_session"))
      ?.split("mobil_store_session=")[1]
      ?.split(";")[0];


    if (xsrfToken) {
      cookies().set("XSRF-TOKEN", xsrfToken);
    }
    if (mobilStoreSession) {
      cookies().set("mobil_store_session", mobilStoreSession);
    }

    return [xsrfToken, mobilStoreSession ];
  } catch (error) {
    // console.error("Error fetching CSRF token:", error);
    RedirectInCsc()
    return null;
  }
}
 