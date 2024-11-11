import { Button } from 'antd'
import React from 'react'
import CustomersTable from '../components/customers/CustomersTable'

function Customers() {
  return (
    <div>
      <h1>טבלת לקוחות</h1>
      <CustomersTable />
    </div>
  )
}

export default Customers