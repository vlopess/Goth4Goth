import "./RegisterContainer.css";
import {UserImageOptions} from "../UserImageOptions/UserImageOptions.jsx";
import {useNavigate} from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {ToastContainer, toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect, useState} from "react";
import {FetcherService} from "../../services/Fetcher.jsx";

const fetcherService = new FetcherService();

export const RegisterContainer = () => {

    const navigate = useNavigate();
    const [avatar, setAvatar] = useState("");
    const [user, setUser] = useState({'id' : '','username' : '', 'descricao' : '', 'avatar' : '',})

    useEffect(() => {
        setUser({...user, 'avatar' : avatar});
    }, [avatar]);

    return (
        <>
            <ToastContainer />
            <div className="container-start">
                <div onClick={() => navigate(-1)} className="close" style={{display: "flex", justifyContent: "end", width: "95%"}}>
                    <div className="line one"></div>
                    <div className="line two"></div>
                </div>
                <div></div>
                <h3 style={{
                    width: "75%",
                    color: "#ffffff60"
                }}>
                    Escolha o seu Avatar:
                </h3>
                <UserImageOptions avatar={avatar} setAvatar={setAvatar}/>
                <Row style={{width: "100%", display: "flex", justifyContent: "center"}}>
                    <Col xs={12} md={12} lg={6}>
                        <div>
                            <div className="input-place">
                                <input placeholder={"Digite o username"} maxLength={50} className="send-input" type="text" onChange={(e) => setUser({...user, 'username': e.target.value})}/>
                            </div>
                            <div className="input-place">
                                <input placeholder={"Descreva o que você procura"} maxLength={50} className="send-input" type="text" onChange={(e) => setUser({...user, 'descricao': e.target.value})}/>
                            </div>
                        </div>
                    </Col>
                </Row>
                <button
                    className={"animated-button"}
                    style={{width: "25%"}}
                    onClick={async () => {
                        let errors = [];
                        if(!user.username) errors.push("Digite o username!");
                        if(!user.descricao) errors.push("Digite a descrição!");
                        if(!user.avatar) errors.push("Escolha o avatar!");
                        if(errors.length !== 0){
                            errors.forEach((e)=>{
                                toast.error(e, {
                                    position: "top-center",
                                    autoClose: 5000,
                                    hideProgressBar: true,
                                    closeOnClick: false,
                                    pauseOnHover: false,
                                    draggable: false,
                                    progress: undefined,
                                    theme: "dark",
                                    transition: Bounce,
                                });
                            });
                        }else{
                            try {
                                let docRef = await fetcherService.createUser(user);
                                localStorage.setItem('userID', docRef.id);
                                navigate("/goth4goth/online");
                            } catch (e) {
                                console.error("Error adding document: ", e);
                            }
                        }

                    }}
                >
                    <span>Entrar</span>
                    <span></span>
                </button>
            </div>
        </>
    );
}