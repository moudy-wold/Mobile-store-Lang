import React from "react"; 
import CreateProduct from "@/app/[locale]/components/page/Admin/Category/CrudProducts/CreateProduct/CreateProduct"

async function Page({ params: { locale } }: LocaleParams) {
    return(
        <div>
            <CreateProduct locale={locale} />
        </div>
    )
}

export default Page;