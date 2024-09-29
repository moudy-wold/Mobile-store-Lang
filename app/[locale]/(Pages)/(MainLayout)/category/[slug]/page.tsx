"use client";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic'

const ProductsPage = dynamic(() => import('@/app/[locale]/components/global/ProductsPage/ProductsPage'),{ssr:false})

type Props = {
  params: { locale: string; slug: string };
};

function Page({ params: { locale, slug } }: Props) {
  const [categoryId, setcategoryId] = useState("");

  useEffect(() => {
    const category = localStorage.getItem("categoryId");
    category && setcategoryId(category);
  }, []);

  return (
    <div>{categoryId && <ProductsPage id={categoryId} title={slug}  locale={locale} />}</div>
  );
}

export default Page;
