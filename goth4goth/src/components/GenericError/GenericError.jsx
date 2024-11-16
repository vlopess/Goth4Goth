import {useNavigate} from "react-router-dom";



export const GenericError = () => {

    const navigate = useNavigate();
    return (
        <>
            <div className="container-start">
                <h4 style={{
                    width: "75%",
                    color: "#ffffff60"
                }}>
                    Ocorreu algum problema.
                </h4>
                <button className={"animated-button"} onClick={() => navigate("/goth4goth/")}>Voltar para o inicio</button>
            </div>
        </>
    );
}