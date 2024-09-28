import ChangePassword from "@/app/[locale]/components/page/Auth/Change-password/PageContent";
import Reacr from "react";


async function Page({ params: { locale } }: LocaleParams) {
  return(
    <div className="">
        <ChangePassword locale={locale}/>
    </div>
  )
}

export default Page;
