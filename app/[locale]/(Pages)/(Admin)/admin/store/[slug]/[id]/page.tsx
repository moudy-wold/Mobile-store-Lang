import React from 'react'
import PageContent from "@/components/page/Admin/Store/Slug/Id/PageContent"

type Props = {
    params: { id: string };
};
export default async function Page({ params: { id } }: Props) {
  return (
    <div>
        <PageContent />
    </div>
  )
}
