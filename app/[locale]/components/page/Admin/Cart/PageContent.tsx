"use client"
import React, { useEffect, useState } from 'react'
import { Modal, notification } from 'antd';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import dynamic from 'next/dynamic'
import { GetAllProductsFromCard_Talab } from '@/app/[locale]/api/talab';

const ConfirmOrder = dynamic(() => import('./ConfirmOrder'), { ssr: false })
const ProductCard = dynamic(() => import('./ProductCard'), { ssr: false })

function CartContent({ locale }: LocaleProps) {
    const { t } = useTranslation(locale, "common")
    const router = useRouter();
    const { card_System, repair_Service_System } = useSelector((state: any) => state.counter);
    const [openConfirmOrder, setOpenConfirmOrder] = useState(false);
    const [deleteItem, setDeleteItem] = useState(false);
    const [data, setData] = useState<any>([]);
    const [totalPrice, setTotalPrice] = useState<any>();
    const [totalCount, setTotalCount] = useState<any>(0);
    const [cateCount, setCateCount] = useState<any>(0);
    const [refreshCounte, setRefreshCounte] = useState(false);
    const [currentProductPrice, setCurrentProductPrice] = useState(0);
    const [currentProductId, setCurrentProductId] = useState("");
    const [Inc, setInc] = useState(false)
    const [Dec, setDec] = useState(false)

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await GetAllProductsFromCard_Talab();
                setData(res.data?.data) 
                console.log(res.data)
                setTotalPrice(res?.data?.data?.reduce((acc: number, item: any) => {
                    return acc + +item.price;
                }, 0))
                setTotalCount(res?.data?.data?.reduce((acc: number, item: any) => {
                    return acc + +item.quantity;
                }, 0))

            } catch (err: any) {
                console.log(err)
                notification.error({
                    message: err.response.data.message
                })
            }

        }

        getData()
    }, [deleteItem])

    useEffect(() => {
        setTotalPrice(data.reduce((acc: number, item: any) => {
            return acc + +item.price;
        }, 0))
    }, [deleteItem, refreshCounte])

    useEffect(() => {
        setTotalCount(totalCount + 1)
        setTotalPrice(+totalPrice + +currentProductPrice)
    }, [Inc])

    useEffect(() => {
        setTotalPrice(+totalPrice - +currentProductPrice)
        setTotalCount(totalCount - 1)
    }, [Dec])

    useEffect(() => {
        const updatedArray = data.filter((item: any) => item.id !== currentProductId);
        setData(updatedArray)
    }, [currentProductId])


    return (
        <div className='container'>
            <h1 className=' text-gray-500 text-3xl mb-5 px-3'>{t("cart")} {data.length} {" "} {t("products")} </h1>
            <div className='grid grid-cols-[75%_25%] gap-10'>
                <div className=''>
                    <div className=''>
                        {data?.map((item: any, index: number) => (
                            <div key={index} className=''>
                                <ProductCard
                                    data={item}
                                    deleteItem={deleteItem}
                                    setDeleteItem={setDeleteItem}
                                    refreshCounte={refreshCounte}
                                    setRefreshCounte={setRefreshCounte}
                                    setInc={setInc}
                                    Inc={Inc}
                                    setDec={setDec}
                                    Dec={Dec}
                                    setCurrentProductPrice={setCurrentProductPrice}
                                    setCurrentProductId={setCurrentProductId}

                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='mt-2'>
                    <div className="p-5 flex flex-col items-start gap-5 rounded-xl bg-[#f3f3f399]">
                        <h1 className='text-2xl font-semibold text-[#555] '>{t("application_summary")}</h1>
                        <hr className='h-[2px] w-full bg-gray-400 ' />
                        <div className='flex flex-row items-center justify-between w-full text-[#555]'>
                            <span className='text-xl'>{t("count_of_categories")}</span>
                            <span className=''>{data.length}</span>
                        </div>
                        <div className='flex flex-row items-center justify-between w-full text-[#555]'>
                            <span className='text-xl'>{t("count_of_products")}</span>
                            <span className=''>{totalCount}</span>
                        </div>
                        <div className='flex flex-row items-center justify-between w-full text-[#555] -mt-3'>
                            <span className='text-xl'>{t("price_of_product")}</span>
                            <span className=''>
                                 {totalPrice}
                            </span>
                        </div>
                    </div>
                    <div className="mt-8">
                        <button onClick={() => { setOpenConfirmOrder(true) }} className="w-full rounded-xl pb-2 pt-[4px] text-2xl font-semibold text-white bg-[#006496] border-2 border-[#006496] hover:text-[#006496] hover:bg-white  transition-all duration-150 cursor-pointer">{t("confirme_order")}</button> </div>
                </div>
            </div>

            {/* Start Confirm Order Modal */}
            <div>
                <Modal
                    title={t("confirme_order")}
                    open={openConfirmOrder}
                    onCancel={() => setOpenConfirmOrder(false)}
                    cancelText="إلغاء"
                    okButtonProps={{ style: { backgroundColor: '#4096ff', display: "none" } }}
                >
                    <ConfirmOrder data={data} locale={locale} />
                </Modal>
            </div>
            {/* End Confirm Order Modal */}
        </div>
    )
}

export default CartContent
