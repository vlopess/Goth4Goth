import "./ChatItemList.css";
import {useNavigate} from "react-router-dom";
import {FetcherService} from "../../services/Fetcher.jsx";
import {escolherAvatar} from "../../utils.jsx";


const fetcherService = new FetcherService();

export const ChatItemList = ({data}) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="chat-item-list" onClick={async () => {
                let room = await fetcherService.enterRoom(data.id);
                navigate("/goth4goth/home", {state: {room: room}})
            }}>
                <img src={escolherAvatar(data.creator.user.avatar)} className="img"/>
                <div className="textBox">
                    <div className="textContent">
                        <p className="h1">{data.creator.user.username}</p>
                    </div>
                    <p className="p">{data.creator.user.descricao}</p>
                </div>
            </div>
        </>
    );
}