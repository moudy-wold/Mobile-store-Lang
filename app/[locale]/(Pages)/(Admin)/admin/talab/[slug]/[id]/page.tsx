import React from 'react';
import PageContent from "@/app/[locale]/components/page/Admin/Talab/Slug/Id/PageContent";
import { GetProductById_Talab } from '@/app/[locale]/api/talab';

type Props = {
    params: { locale: string, id: string };
};

async function Page({ params: { locale, id } }: Props) {
    const data = await GetProductById_Talab(id);

    return (
        <div>
            <PageContent locale={locale} data={data.data} />
        </div>
    );
}

export default Page;
