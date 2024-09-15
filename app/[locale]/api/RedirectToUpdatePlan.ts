import { redirect } from "next/navigation";


export default async function RedirectToUpdatePlan() {
    if (typeof window === 'undefined') {
            redirect("/notfound");
    } else {
        window.location.href = "/notfound";
    }
}
