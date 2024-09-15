"use client";
import React, { useEffect, useState } from "react";
import ProductsPage from "@/app/[locale]/components/global/ProductsPage/ProductsPage"
import Hero from "@/app/[locale]/components/global/Hero/Hero";

type Props = {
    params: { slug: string };
};

function Page({ params: { slug } }: Props) {
    const [categoryId, setcategoryId] = useState("")
 
    
    useEffect(() => {
        const category = localStorage.getItem("categoryId")
        category && setcategoryId(category)
    }, [])
  
    return (
        <div>
           
            {categoryId && <ProductsPage id={categoryId} title={slug} />}
        </div>
    )
}

export default Page;