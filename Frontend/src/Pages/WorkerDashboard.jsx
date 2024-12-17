import { Link } from "react-router-dom";
import WorkerHeader from "../Components/WorkerHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useEffect, useState } from "react";
function WorkerDashboard (){
    const [requests, setRequests] = useState([]);
    // const [message, setMessage] = useState("")
    // const navigate = useNavigate();

    const id = localStorage.getItem("worker")

    const HandleGetResult = () => {
        axios.get(`http://localhost:7000/request/SingleRead/${JSON.parse(id).id}`).then((response) => {
            // console.log(response.data)
                setRequests(response.data)
        }).catch((error) => {
            console.log(error)
            alert("Error in getting requests")
        })
    }
    useEffect(() => {
        HandleGetResult();
},[])

    return <div className="w-full  h-screen">
        <WorkerHeader />
        <div>
            { requests.length > 0 ? (
            <div className="w-full sm:ml-[18%]  ml-[2%]  top-5 absolute  mt-10 max-4-6xl sm:max-w-4xl max-auto bg-white  shadow-lg  sm:overflow-hidden">
                
                <table className=" table-auto font-Nunito  w-full text-left border-collabse">
                    <thead>
                        <tr className="bg-[#e1e1e1] border border-gray-300 border-b text-[20px] font-semibold text-black">
                            <td className="p-3 border border-gray-900 text-center"> No.</td>
                            <td className="p-3 border border-gray-900 text-center"> Start Date </td>
                            <td className="p-3 border border-gray-900 text-center"> End Date </td>
                            <td className="p-3 border border-gray-900 text-center"> Status </td>
                            <td className="p-3 border border-gray-900 text-center"> Destination </td>
                            <td className="p-3 border border-gray-900 text-center"> Action </td>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {
                            requests.map((RequestMessage, index) => {
                                return <tr className="border-b border border-gray-300">
                                <td className="p-3 border text-center border-gray-500"> {index + 1} </td>
                                <td className="p-3 border text-center border-gray-500">{new Date(RequestMessage.startDate).toLocaleDateString('en-SO')} </td>
                                <td className="p-3 border text-center border-gray-500">{new Date(RequestMessage.endDate).toLocaleDateString('en-SO')} </td>
                                <td className="p-3 border text-center border-gray-500"> <span className="text-white  bg-[#6A6458] rounded-[5px] px-3 py-1">{RequestMessage.status}</span> </td>
                                <td className="p-3 border text-center border-gray-500"> {RequestMessage.destination}  </td> {/* make the world range 5 word +*/}
                                <td className="p-3 border border-gray-500 text-[#6A6458] text-center underline hover:text-black font-semibold"> <Link to={`/workerViewBox/${RequestMessage.ID}`}>View More</Link>  </td> {/* make the world range 5 word +*/}
                                {/* <Link to={`/workerViewBox/${RequestMessage._id}`}><td className=""> View more </td></Link> */}
                            </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
                 )
                :(
                <div className=" ">
                    <h1 className="text-[20px] font-semibold pt-60 text-center text-red-500"> NO Requests was found </h1>
                </div>
                )
            } 
        
        </div>
        </div>
}
export default WorkerDashboard