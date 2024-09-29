"use client"
import React from "react";
import Plans from "../Admin/Info/Plans/Plans";


function UpdatePlane({ locale }: LocaleProps) {

    return (
        <div className="">
            <Plans locale={locale} />
        </div>
    )
}

export default UpdatePlane;