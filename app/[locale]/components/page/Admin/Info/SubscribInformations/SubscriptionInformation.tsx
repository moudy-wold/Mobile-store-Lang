import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table';
import React from 'react'

function SubscriptionInformation() {


    const columns: ColumnsType<any> = [    
        {
          title: "رقم الهاتف",
          dataIndex: "phoneNumber",
          key: "phoneNumber",
        },
        { title: "إسم الموقع",
          dataIndex: "domain",
          key: "domain",},
        {
            title: "تاريخ الإشتراك",
            dataIndex: "startDate",
            key: "startDate",            
          },
          {
            title: "تاريخ الإنتهاء",
            dataIndex: "endDate",
            key: "endDate",            
          },
        
       
      ];
    
const data = [{
    phoneNumber:"05374561068",
    domain:"moudy",
    startDate:"2024/3/2",
    endDate:"2025/3/2",

}]

      const tableData = data?.map((user: any) => ({
        phoneNumber: user.phoneNumber,
        domain: user.domain,
        startDate: user.startDate,
        endDate: user.endDate,
      }));
     
    


  return (
    <div>
     <Table columns={columns} dataSource={tableData} />
    </div>
  )
}

export default SubscriptionInformation
