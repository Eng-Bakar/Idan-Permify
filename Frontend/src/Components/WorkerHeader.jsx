import { FaUser } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { FaSquarePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { RiShutDownLine } from "react-icons/ri";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
<MdSpaceDashboard className="text-[30px] ml-10 text-center  text-[#6A6458] " />
import { MdSpaceDashboard } from "react-icons/md";



function WorkerHeader (){
    const navigate = useNavigate();  // useNavigate hook to navigate to other pages
    const [IsUserOpen, setIsUserOpen] = useState(false)
const HandleOpen = () => {
    setIsUserOpen(true)
}
const HandleClose = () => {
    setIsUserOpen(false)
}
    const worker = localStorage.getItem('worker'); // worker is key in local storage
    const LogOut = () => {
        localStorage.clear();
        navigate("/");
    }

    return <div> 
    <div className="h-screen fixed z-10 sm:pt-7 pt-4  w-full sm:w-[8%]     border-r-[#6A6458] border-r-2 border-solid  ">
        <h1 className=" text-[25px] text-[#6A6458] pb-5 border-b-solid border-b-2 border-b-[#6A6458] w-full font-semibold text-center font-Roboto"> iDan </h1>
        <div className=" items-center mt-20 px-[10px]  ">
            <Link to="/workerDashboard"><MdSpaceDashboard className="text-[35px] ml-5 hover:text-black  text-[#6A6458]" /></Link>
            <Link to="/workerForm"><FaSquarePlus className="text-[30px] ml-5 mt-10 hover:text-black text-[#6A6458]" /></Link>
            <Link to="/workerNotification"><IoIosNotifications className="text-[35px] ml-4 mt-10 hover:text-black text-[#6A6458]" /></Link>
            <FaUser style={{display: IsUserOpen ? "none" : ""}} onClick={HandleOpen} className="text-[30px] ml-4 mt-10 hover:text-black  text-[#6A6458]" />
            <FaUser style={{display: IsUserOpen ? "block" : "none"}} onClick={HandleClose} className="text-[30px] ml-4 hover:text-black mt-10 hidden  text-[#6A6458]" />
        </div>
    </div>
    <div style={{display: IsUserOpen ? "block" : "none"}} className="w-[200px] z-10 shadow-md  sm:right-4 right-4     fixed top-12  h-[220px]  bg-white rounded-[10px]">
        <div className="w-full h-[50px]  rounded-t-[10px] bg-[#6A6458] shadow-b-md shadow-b-gray-200 pt-5 rounded-b-[20px]">
            <div className="w-[50px] ml-[36%]   py-[10px] px-[5px] h-[50px] shadow rounded-full bg-white">
                <FaUser className="w-[30px] h-[30px] ml-1 text-[#6A6458]" />
            </div>
            <div className="px-[20px] mt-3">
                <h1 className="text-[18px] text-center font-semibold font-Roboto"> {JSON.parse(worker).name} </h1>
                <h1 className="text-[16px]  font-Roboto"> <span className="font-semibold">ID:</span> {JSON.parse(worker).id} </h1>
                <h1 className="text-[16px]  font-Roboto"> <span className="font-semibold">Title:</span> {JSON.parse(worker).title} </h1>
            <button onClick={LogOut} className="w-[100px] flex items-center gap-2 justify-center px-1  h-[35px] mt-3 text-white bg-[#3b3832] hover:bg-[#6A6458] rounded-[5px] ml-7"> Log Out <RiShutDownLine className="w-[20px] h-[20px] " /></button>
            </div>
        </div>
    </div>
</div>
}
export default WorkerHeader