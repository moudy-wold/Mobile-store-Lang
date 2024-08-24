
import React, { useEffect, useState } from 'react';

const FixImageUrl = (url:string) => {
  
  const jsonString = url;


  const parsedData = JSON.parse(jsonString.replace(/\\/g, ''));
  const imageUrl = parsedData.image;

  return imageUrl;
};

export default FixImageUrl;