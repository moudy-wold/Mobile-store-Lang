// import React from "react"
// // import Imagezoom from "@/components/page/Category/Phone/Imagezoom";
// // import ProductDetails from "@/components/page/Category/Phone/SomeProductDetails";
// // import MiddleSection from "@/components/page/Category/Phone/MiddleSections";
// // import AllProductDetails from "@/components/page/Category/Phone/AllProductDetails";
// import Hero from "@/components/global/Hero";
// type Props = {
//     data: any
// }

// function ProductPage({ data }: Props) {

//     const breadcrumbData = [
//         { title: 'الهواتف', url: '/phone', id: 1 },
//         { title: data.name, url: '/#', id: 2 },
//     ];
//     return (
//         <>
//             <div className=" container">
//                 <Hero title="الرئيسية" breadcrumb={breadcrumbData} />
//             </div>
//             <div className="lg:grid lg:grid-cols-[29%_36%_31%] gap-5 p-8">
               
//             {/* <div className="lg:grid lg:grid-cols-[29%_67%] gap-5 p-8">                
//                 <div className="">
//                     <Imagezoom images={data.images} />
//                 </div>
//                 <div className="">
//                     <div className=" border-b-2 border-gray-300 p-3 flex justify-between">
//                         <div>
//                             <p className="text-2xl text-[#555] font-bold">قميص بنقشة باروكيه حرير فيرساتشي</p>
//                             <p className="text-lg text-[#717070] my-4"><span className="text-[#f28232f0]">5,600</span> ر.س.شامل ضريبة القيمة المضافة</p>
//                             <p className="text-lg text-[#717070] mb-4">التسليم ضمن 4 أيام عمل</p>
//                             <p className="text-lg text-[#717070] mb-4">إعادة مجانية ضمن 15 يوما</p>
//                         </div>
//                         <div> <button className="bg-[#f28232f0] text-white w-24 px-3 py-2 flex items-center rounded-md hover:bg-white hover:text-[#f28232f0] border-2 border-[#f28232f0] transition-all duration-200 ">
//                             <span className='w-10'>
//                                 <FaRegHeart className=" text-xl" />
//                             </span>
//                             <span className="mr-1 text-base lg:text-lg flex items-center justify-center">مفضلة</span>
//                         </button></div>
//                     </div>
//                     <div className="border-b-2 border-gray-300 p-3 pb-6">
//                         <div>
//                             <p className="text-[#555555] font-semibold text-xl mb-5">القياس</p>
//                             <div className="flex items-center">
//                                 {size.map((item: any) => (
//                                     <div className={`relative ${!item.isActive  && "before:w-[115%]" } before:absolute   before:h-[2px] before:bg-gray-400 before:top-[23px] before:left-[-7px] before:rotate-[29deg] border-2 border-gray-300 rounded-lg px-8 py-3 ml-2  cursor-pointer   hover:bg-[#e8f5e9] hover:border-[#43a047] transition-all duration-200`} key={item.id}>{item.label}</div>
//                                 ))}
//                             </div>
//                         </div>
//                         <div className="mt-5">
//                             <p className="text-[#555555] font-semibold text-xl mb-5">الألوان</p>
//                             <div className="flex items-center">
//                                 {data.images.map((item: any) => (
//                                     <div className=" border-2 border-gray-300 rounded-lg p-1 ml-4 cursor-pointer hover:border-[#43a047]">
//                                         <Image src={item.image} alt="asd" height={60} width={60} />
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>

 
//             </div> */}
//             </div>
//             <div className="w-full bg-gray-100 p-5">
//                 <AllProductDetails data={data} />
//             </div>
//         </>
//     )
// }

// export default ProductPage;