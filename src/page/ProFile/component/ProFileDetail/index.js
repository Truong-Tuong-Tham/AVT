import React, { useEffect } from "react";
import CardInF from "./ComponentProFile/CardProF";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postLoginAction } from "../../../../redux/user/userSlice";

const PFDetail = ({ iduser }) => {
  const idUser = iduser;
  const { infoUser } = useSelector((state) => state.userReducer);
  

  const navigate = useNavigate();

  console.log("iduser",iduser);
  useEffect(() => {
    // userInfo (redux) có dữ liệu => true => đã đăng nhập
    if (infoUser===null)  {
     

      navigate('/');
    }
    else {
     
     
    }
  }, []);
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="w-full max-w-md">
        <CardInF idUser={idUser} />
      </div>
    </div>
  );
};

export default PFDetail;
