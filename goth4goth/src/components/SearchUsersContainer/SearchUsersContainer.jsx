import "./SearchUsersContainer.css";
import {ChatItemList} from "../ChatItemList/ChatItemList.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {FetcherService} from "../../services/Fetcher.jsx";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {showSwal} from "../../utils.jsx";


const fetcherService = new FetcherService();

export const SearchUsersContainer = () => {
    const navigate = useNavigate();
    const [listUsers, setListUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let newData = await fetcherService.getRoomAvailable();
            setListUsers(newData);
        }
        fetchData();
    }, []);


    return (
        <>
            <div className="container-contact">
                <div className="nav-bar">
                    <button
                        onClick={async() => {
                            let room = await fetcherService.createRoom();
                            navigate("/goth4goth/home", {state: {room: room}});
                        }}
                        style={{
                            borderRadius: "0 0 15px 0",
                            fontSize: "16x"
                        }}
                    >
                        Criar sala
                    </button>
                    <div></div>
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <div className="point"></div>
                        <a>
                            Usuários Disponíveis
                        </a>
                    </div>
                    <div></div>
                    <div className="close" onClick={async () => {
                        showSwal().then(async (result)=>{
                            if(result.isConfirmed){
                                await fetcherService.deleteCurrentUser();
                                localStorage.setItem('userID', null);
                                navigate(-1);
                            }
                        });
                    }}>
                        <div className="line one"></div>
                        <div className="line two"></div>
                    </div>
                </div>
                <div style={{
                    overflow: "scroll",
                    overflowX: "hidden",
                    height: "90%",
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "10%",
                    alignItems: "center"
                }}>
                    {listUsers.length === 0 && (
                        <div style={{display: "flex", height: "100%", alignItems: "center"}}>Não tem usuários onlines</div>
                    )}
                    {listUsers.length !== 0 && (
                        listUsers.map((data)=> <ChatItemList data={data}/>)
                    )}
                </div>
            </div>
        </>
    );
}