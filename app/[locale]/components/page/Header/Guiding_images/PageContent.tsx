"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { JackInTheBox } from "react-awesome-reveal";

function GuidingImages({data,locale}:any) {
  
  return (
    <div className="container my-5">
      <div className="grid md:grid-cols-2 gap-5">
        {data?.data?.map((item: any, index: number) => (
          <JackInTheBox
            duration={500}
            delay={0}
            cascade
            className="relative"
            key={index}
          >
            <div className="">
              <Link href={item.url}>
                <Image
                  src={item.image}
                  width={650}
                  height={300}
                  alt="guiding image"
                  className="!w-[650] !h-[300] rounded-lg object-fill"
                />
              </Link>
            </div>
          </JackInTheBox>
        ))}
      </div>
    </div>
  );
}

export default GuidingImages;
