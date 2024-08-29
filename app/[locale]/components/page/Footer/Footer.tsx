"use client";
import Search from "@/app/[locale]/components/global/Search/SearchProducts/SearchProducts";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaFacebook, FaLinkedinIn, FaSnapchat, FaTelegramPlane, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { RiWechat2Line } from "react-icons/ri";
import { AiOutlineInstagram } from "react-icons/ai";
import { FiTwitter, FiYoutube } from "react-icons/fi";
import {   useSelector } from "react-redux";
 
function Footer() {
  const [data, setData] = useState<any[]>([]);
  const path = usePathname();
  const adminPage = path.includes("admin");
  const SearchPage = path.includes("search");
  const { infoData } = useSelector((state: any) => state.counter)

  useEffect(() => {
    if (infoData?.data?.social) {
      const parsedSocial = JSON.parse(infoData?.data?.social);
      const newArray = parsedSocial.map((item: any) => {
        let IconComponent;

        switch (item.icon) {
          case 'FaFacebook':
            IconComponent = FaFacebook;
            break;
          case 'FiTwitter':
            IconComponent = FiTwitter;
            break;
          case 'FaWhatsapp':
            IconComponent = FaWhatsapp;
            break;
          case 'FaTelegramPlane':
            IconComponent = FaTelegramPlane;
            break;
          case 'FaTiktok':
            IconComponent = FaTiktok;
            break;
          case 'AiOutlineInstagram':
            IconComponent = AiOutlineInstagram;
            break;
          case 'FiYoutube':
            IconComponent = FiYoutube;
            break;
          case 'RiWechat2Line':
            IconComponent = RiWechat2Line;
            break;
          case 'FaSnapchat':
            IconComponent = FaSnapchat;
            break;
          case 'FaLinkedinIn':
            IconComponent = FaLinkedinIn;
            break;
          default:
            IconComponent = null; // أو يمكنك تعيين قيمة افتراضية
        }

        return {
          ...item,
          icon: IconComponent,
        };
      });
      setData(newArray);
    }
  }, [infoData?.data?.social]);

  return (
    <>
      {!adminPage && (
        <footer className="bg-[#f5f4f4]">
          <div className="block lg:flex justify-between items-center p-5 lg:px-10 container">
            <div className="flex items-center">
              <Link href="/">
                <Image src={infoData?.data?.logo != null ? infoData?.data?.logo : ""} alt="Logo" height={150} width={150} />
              </Link>
            </div>

            <div className="mt-4 lg:mt-0">
              <div className="text-[#004169] mt-3 lg:mt-1">
                <Link href="/about-us" className="cursor-pointer hover:border-b-2 border-[#004169] transition-all text-base lg:text-xl font-semibold lg:font-normal">
                  من نحن
                </Link>
              </div>
              <div className="text-[#004169] mt-3 lg:mt-1">
                <span className="cursor-pointer hover:border-b-2 border-[#004169] transition-all text-base lg:text-xl font-semibold lg:font-normal">
                  خدماتنا
                </span>
              </div>
              <div className="text-[#004169] mt-3 lg:mt-1">
                <span className="cursor-pointer hover:border-b-2 border-[#004169] transition-all text-base lg:text-xl font-semibold lg:font-normal">
                  سياسة الخصوصية
                </span>
              </div>
            </div>

            <div className="mt-5 lg:mt-2">
              <ul className="flex items-center">
                {data.map((item, index) => (
                  <li key={index} className="ml-2">
                    <Link href={item.url} className="">
                      {item.icon && <item.icon className="text-3xl lg:text-lg text-[#4267B2] hover:border-b-2 border-[#4267B2] hover:p-[1px] transition-all" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="py-2 flex items-center justify-center">
            <p>
              جميع الحقوق محفوظة <span className="text-sm">{new Date().getFullYear()}</span> لشركة <span className="text-[#006496]">Moudy</span> ©
            </p>
          </div>
        </footer>
      )}
    </>
  );
}

export default Footer;
