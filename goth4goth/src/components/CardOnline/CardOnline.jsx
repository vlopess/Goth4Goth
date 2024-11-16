import "./CardOnline.css";

export const CardOnline = ({qtd = 0}) => {
    return (
        <>
            <div className="card-online">
                <div className="point"></div>
                {qtd} Online
            </div>
        </>
    );
}