import React from 'react'
import { useParams } from 'react-router-dom';

const ServiceManagement = () => {
  const {iduser}=useParams();
  console.log("iduser",iduser);
  return (
    <div>
      
    </div>
  )
}

export default ServiceManagement
