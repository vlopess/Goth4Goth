import "./StartContainer.css";
import {CardOnline} from "../CardOnline/CardOnline.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {FetcherService} from "../../services/Fetcher.jsx";

const fetcherService = new FetcherService();


export const StartContainer = () => {

    const navigate = useNavigate();
    const [qtd, setQtd] = useState(0);

    useEffect(() => {
        async function fetchData() {
            let newData = await fetcherService.getCurrentUsersOnline();
            console.log(newData.length)
            setQtd(newData.length);
        }
        fetchData();
    }, []);

    return (
        <>
            <div className="container-start">
                <div></div>
                <h4 style={{
                    width: "75%",
                    color: "#ffffff60"
                }}>
                    Bem-vindo ao Goth4Goth – um chat em tempo real para góticos
                    e alternativos se conectarem e compartilhe interesses.
                    Participe de salas públicas e
                    privadas.
                </h4>
                <CardOnline qtd={qtd}/>
                <button
                    className={"animated-button"}
                    style={{width: "25%"}}
                    onClick={()=> navigate("/goth4goth/register")}
                >
                    <span>Iniciar sessão</span>
                    <span></span>
                </button>
            </div>
        </>
    );
}