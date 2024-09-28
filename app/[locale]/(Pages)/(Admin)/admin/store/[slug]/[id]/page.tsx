import React from 'react'
import PageContent from "@/app/[locale]/components/page/Admin/Store/Slug/Id/PageContent"

type Props = {
    params: { locale:string,id: string };
};
export default async function Page({ params: {locale, id } }: Props) {
  return (
    <div>
        <PageContent locale={locale} />
    </div>
  )
}
