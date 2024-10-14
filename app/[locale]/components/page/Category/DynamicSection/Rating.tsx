import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Input, notification, Space } from "antd";
import { useTranslation } from "@/app/i18n/client";
import { AddReview } from "@/app/[locale]/api/product";
import { AddReview_Talab } from "@/app/[locale]/api/talab";
import moment from "moment";
import Loader from "../../../global/Loader/Loader";
type Props = {
    locale: any,
    reviews: any,
    product_id: string,
    store?: boolean,
}
function Rating({ locale, product_id, reviews, store }: Props) {
    const { t } = useTranslation(locale, "common");
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [ratingMarge, setRatingMarge] = useState([false, false, false, false, false])
    const [userRole, setUserRole] = useState("");

    const handleRating = (number: number) => {
        const updatedMarge = ratingMarge.map((_, index) => index < number);
        setRating(number)
        setRatingMarge(updatedMarge);
    };

    const onFinish = async () => {
        setIsLoading(true)
        let res: any;
        try {
            if (store == true) {
                res = await AddReview_Talab(product_id, rating, review)
            } else {
                res = await AddReview(product_id, rating, review)
            }
            notification.success({
                message: t("sent_review_successfully")
            })
            setRatingMarge([false, false, false, false, false])
            setReview("")
        } catch (err: any) {
            console.log(err)
            notification.error({
                message: err.response.data.message
            })
        }
        finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        const userRole: any = localStorage.getItem("userRole");
        const pareUserRole = JSON.parse(userRole);
        setUserRole(pareUserRole)
    }, [])
    
    return (
        <div className="py-7 px-5 border-t-2 border-gray-300 ">
            {isLoading && <Loader />}
            {/* Start Title */}
            <div>
                <h1 className="w-fit border-b-[1px] border-black text ">{t("reviews")}</h1>
            </div>
            {/* End Title */}


            {/* Start Show Reviews */}
            {reviews?.length == 0 && <p className="mt-2">{t("no_reviews_yet")}</p>}
            <div className="flex flex-col gap-3 mt-3 p-3">
                {reviews?.map((re: any) => {
                    // Rating
                    let updatedMarge = ratingMarge.map((_, index) => index < re.rating);
                    return (
                        <div className="min-w-[220px] !max-w-[350px] my-3">
                            <div className=" bg-[#f0f2f5] p-2 px-3 rounded-lg">
                                <div className="flex items-center justify-between">
                                    {/* Start Name */}
                                    <p className="">{re.user_name}</p>
                                    {/* End Name */}

                                    {/* Start User Rating */}
                                    <ul className="flex gap-1 ">
                                        {updatedMarge?.map((item: any) => (
                                            <li className="">
                                                {item ?
                                                    <Image alt="star" src="/assets/fullStar.svg" width={17} height={17} className="" />
                                                    :
                                                    <Image alt="star" src="/assets/emptyStar.svg" width={15} height={15} className="" />
                                                }
                                            </li>
                                        ))}

                                    </ul>
                                    {/* End User Rating */}
                                </div>

                                {/* Start review */}
                                <p>{re.review}</p>
                                {/* End review */}
                            </div>
                            <div className="flex items-center gap-4 p-[2px]">
                                <span className="text-[13px] ">{moment(re.created_at).locale("en").format("DD/MM/YYYY HH:mm")}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* End Show Reviews */}

            {/* Start Rating */}
            <div className={`${userRole == "admin" ? "hidden" : "block"} mt-3 p-3`}>
                <ul className="flex gap-1 ">
                    {ratingMarge.map((item: any, index: number) => {
                        return (
                            <li key={index}>
                                <button
                                    className=""
                                    onClick={() => handleRating(index + 1)} // تحديث التقييم عند الضغط على النجمة
                                >
                                    {item ? (
                                        <Image
                                            alt="star"
                                            src="/assets/fullStar.svg"
                                            width={17}
                                            height={17}
                                            className=""
                                        />
                                    ) : (
                                        <Image
                                            alt="star"
                                            src="/assets/emptyStar.svg"
                                            width={15}
                                            height={15}
                                            className=""
                                        />
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
            {/* End Rating */}

            {/* Start reciew Form */}
            <div className={`${userRole == "admin" ? "hidden" : "block"}  px-4`}>
            <Space.Compact style={{ width: '100%' }}>
            <Input
                    value={review}
                    placeholder={t("write_your_review")}
                     className="w-2/5 !py-2 outline-none focus:border-[1px] focus:!border-[#006496] "
                    onChange={(e) => setReview(e.target.value)}
                />
                    <Button
                      onClick={() => { review.trim() !== '' ? onFinish() : null }}
                      className={`py-5 border-[1px] border-[#006496] rounded-lg w-20 flex items-center justify-center text-base text-[#006496] bg-white transition-all ${review.trim() !== '' ? 'hover:bg-[#006496] hover:text-white  ' : 'opacity-50 cursor-not-allowed'}`}
                      disabled={review.trim() === ''}
                  >
                      {t('send')}</Button>
                </Space.Compact>

                
                

            </div>
            {/* End reciew Form*/}
        </div>
    )
}
export default Rating