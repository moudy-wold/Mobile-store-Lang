"use server"
import { headers } from 'next/headers';

export default async function GetHsotInSsr  ()  {
  const headersList = headers();
  const hostname = headersList.get('x-forwarded-host');

  return  hostname
};

 