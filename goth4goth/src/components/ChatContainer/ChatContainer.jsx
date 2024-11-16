import "./ChatContainer.css";
import {useLocation, useNavigate} from "react-router-dom";
import {FetcherService} from "../../services/Fetcher.jsx";
import {useEffect, useRef, useState} from "react";
import {Timestamp} from "firebase/firestore";
import {escolherAvatar, showSwal} from "../../utils.jsx";

const fetcherService = new FetcherService();


export const ChatContainer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [messages, setMessages] = useState([]);
    const [textedMessage, setTextedMessage] = useState("");
    const userID = localStorage.getItem('userID');
    const dummy = useRef(null);
    const [room, setRoom] = useState();


    useEffect(() => {
        const unsubscribe = fetcherService.listen(location.state.room.id, setMessages, setRoom);
        return () => unsubscribe();
    }, []);

    const sendMessage = async () => {
        try {
            let message = {
                'text' : textedMessage,
                'user' : await fetcherService.getCurrentUser(),
                'createdAt' : Timestamp.now()
            }
            console.log(message);
            await fetcherService.addMessage(location.state.room.id, message);
            setTextedMessage("");
            dummy.current.scrollIntoView({ behavior: 'smooth'});
        }catch (e) {
            navigate(-1);
        }
    }


    return (
        <>
            <div className="container-chat">
                <div className="nav-bar">
                    <a></a>
                    <div className="close" onClick={ async () => {
                        showSwal().then(async (result)=> {
                            if(result.isConfirmed){
                                if(location.state.room.creator !== undefined && location.state.room.creator.id === userID) await fetcherService.deleteRoom(location.state.room.id);
                                else await fetcherService.exitRoom(location.state.room.id);
                                navigate(-1);
                            }
                        });
                    }}>
                        <div className="line one"></div>
                        <div className="line two"></div>
                    </div>
                </div>
                <div className="messages-area">
                    {messages.map((msg, index)  => {
                        let className = msg.user.id === userID ? "me" : "other";
                        return <div  className={className} style={{display: "flex", flexDirection: "column", margin: "10px 0"}}>
                            <div style={{padding: "0 5px", backgroundColor: "#40414F", margin: 0}}>
                                <img src={escolherAvatar(msg.user.user.avatar)} className="img"/>
                                <p>{msg.user.user.username} disse:</p>
                            </div>
                            <div key={index} className={`message ${className}`}>{msg.text}</div>
                        </div>
                    })}
                    <div ref={dummy} style={{height: "100px"}}></div>
                </div>
                <div className="sender-area">
                <div className="input-place">
                        <input value={textedMessage} onChange={(e)=> setTextedMessage(e.target.value)} placeholder="Send a message." className="send-input" type="text"/>
                        <div className="send" onClick={() => sendMessage()}>
                            <svg className="send-icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                                 xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"
                                 xml:space="preserve"><g><g><path fill="#6B6C7B" d="M481.508,210.336L68.414,38.926c-17.403-7.222-37.064-4.045-51.309,8.287C2.86,59.547-3.098,78.551,1.558,96.808 L38.327,241h180.026c8.284,0,15.001,6.716,15.001,15.001c0,8.284-6.716,15.001-15.001,15.001H38.327L1.558,415.193 c-4.656,18.258,1.301,37.262,15.547,49.595c14.274,12.357,33.937,15.495,51.31,8.287l413.094-171.409 C500.317,293.862,512,276.364,512,256.001C512,235.638,500.317,218.139,481.508,210.336z"></path></g></g></svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}