import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ManagerSidebar from "../Components/ManagerSidebar"
function ManagerMessageView (){
    const params = useParams()
    const [getMessage, setGetMessage] = useState({})
    const [comment, setComment] = useState("")
    const [statusUpdate, setStatusUpdate] = useState("pending") // to store the status (pending, accpeted and rejected)
    // const [statusUpdate, setStatusUpdate] = useState("")
    const HandleGetMessage = () => {
        axios.get(`http://localhost:7000/request/${params.ID}`).then((response) => {
            // console.log(response.data)
            setGetMessage(response.data)
            calculateDuration(response.data.startDate, response.data.endDate); // Calculate duration when data is fetched

        }).catch((error) => {
            console.log(error)
        })
    }

    // Function oo update gareenaayo xaalada qofka
    const HandleUpdateStatus = (ID) => {
        axios.put(`http://localhost:7000/update/status/${ID}`, {
            "status": statusUpdate 
        }).then((res) => {
            if(res.data.message){
                alert("Status has been updated")
            }
        }).catch((error) => {
            console.log(error)
            alert("Error updating status, please try again later.");
        })

    }
    const ApprovedRequest = () => {
        setStatusUpdate("approved")
        HandleUpdateStatus(params.ID)
    }
    const RejectedRequest = () => {
        setStatusUpdate("rejected")
        HandleUpdateStatus(params.ID)
    }  
    // Function to calculate duration (in days)
    const calculateDuration = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const duration = Math.floor((end - start) / (1000 * 3600 * 24)); // Difference in days
        setGetMessage(prevState => ({ ...prevState, duration })); // Update the duration in state
    };

    // const HandleResponseData = (() => {
    //     const RespondData = {
    //         fullName: getMessage.fullName,
    //         id: getMessage.id,
    //         title: getMessage.title,
    //         startDate: getMessage.startDate,
    //         endDate: getMessage.endDate,
    //         duration: getMessage.duration,
    //         destination: getMessage.destination,
    //         reason: getMessage.reason,
    //         comment,
    //         status,
    //     }


    //     axios.post(`http://localhost:7000/manager/response/${params.ID}`,
          
    //     ).then((response) => {
    //         console.log("Response sent successfully:", response.data)
    //     }).catch((error) => {
    //         console.log("Error sending response:", error)
    //     })
    // })

    useEffect (() => {
        HandleGetMessage()
    },[])
    return  <div>
        <ManagerSidebar />
    <div className="w-full h-screen">
        <div className="w-[400px] absolute px-[20px] rounded-lg pt-[20px] mt-5 ml-[35%] h-[550px] shadow-lg shadow-[#6A6458]">
            <h1 className="text-center text-[#3b3832] font-semibold text-[20px]"> More Details </h1>
            <div className="mt-4 flex items-center gap-5">
                <ul className="font-semibold leading-[30px]">
                    <li>Name</li>
                    <li>ID</li>
                    <li>Title</li>
                    <li>Start Date</li>
                    <li>End Date</li>
                    <li>Duration </li>
                    <li>Destination </li>
                </ul>
                <ul className="leading-[30px]">
                    <li> : </li>
                    <li> : </li>
                    <li> : </li>
                    <li> : </li>
                    <li> : </li>
                    <li> : </li>
                    <li> : </li>
                </ul>
                <ul className=" leading-[30px]">
                    <li>{getMessage.fullName}</li>
                    <li>{getMessage.ID}</li>
                    <li>{getMessage.title}</li>
                    <li>{new Date(getMessage.startDate).toLocaleDateString('en-SO')}</li>
                    <li>{new Date(getMessage.endDate).toLocaleDateString('en-SO')}</li>
                    <li>{getMessage.duration} days </li>
                    <li>{getMessage.destination} </li>
                </ul>
            </div>
            <div className="w-[380px] h-[100px]">
            <h1 className="mt-1 font-semibold"> Permission Reason : </h1>
            <textarea value={getMessage.reason} className="w-[360px] ml-[-5px] h-[75px] outline-none  px-[6px] " placeholder="Enter your reason"></textarea>
            <h1 className="mt-1 font-semibold"> Manager Comment : </h1>
            <textarea value={comment} onChange={(event) => setComment(event.target.value)} className="w-[360px] ml-[-5px] h-[75px] outline-none  px-[6px] " placeholder="Enter your reason"></textarea>
            <div className="flex gap-20 ml-5">
                <button onClick={ApprovedRequest}  className="mt-1 w-[120px] h-[35px] rounded-[8px] bg-[#3b3832] hover:bg-[#6A6458] text-white"> Accept </button>
                <button onClick={RejectedRequest} className="mt-1 w-[120px] h-[35px] rounded-[8px] hover:bg-[#eb3333] bg-[#FC6161] text-white"> Reject </button>
            </div>

            
        </div>

            
        </div>
        
    </div>
    </div>
}
export default ManagerMessageView