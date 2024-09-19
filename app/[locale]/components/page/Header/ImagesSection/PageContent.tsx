"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { JackInTheBox } from "react-awesome-reveal";
function ImageSection() {
  const data :any= [ 
  ];
  return (
    <div className="container my-5">
      <div className="grid md:grid-cols-2 gap-5">
        {data?.map((item: any,index:number) => (
        <JackInTheBox duration={500} delay={0} cascade className="relative" key={index}>
          <div className="">
            <Link href={item.url}>
              <Image
                src={item.image}
                width={650}
                height={300}
                alt="a"
                className="rounded-lg w-full h-full object-fill"
              />
            </Link>
          </div>
        </JackInTheBox>
        ))}
      </div>
    </div>
  );
}

export default ImageSection;
