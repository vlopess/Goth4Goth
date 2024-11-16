import "./UserImageOptions.css";
import bat from "../../assets/images/bat.png"
import Witch from "../../assets/images/Witch.png"
import blackcat from "../../assets/images/blackcat.png"
import Vampire from "../../assets/images/Vampire.png"




export const UserImageOptions = ({avatar, setAvatar}) => {



    const updateAvatar = (value) => {
        setAvatar(value);
    }

    return (
        <>
            <div className={"options"}>
                <button className={`option ${avatar === "bat" ? "selected" : ""}`} onClick={() => updateAvatar("bat")}>
                    <img src={bat} alt="bat"/>
                </button>
                <button className={`option ${avatar === "Witch" ? "selected" : ""}`} onClick={() => updateAvatar("Witch")}>
                    <img src={Witch} alt="Witch"/>
                </button>
                <button className={`option ${avatar === "blackcat" ? "selected" : ""}`} onClick={() => updateAvatar("blackcat")}>
                    <img src={blackcat} alt="blackcat"/>
                </button>
                <button className={`option ${avatar === "vampire" ? "selected" : ""}`} onClick={() => updateAvatar("vampire")}>
                    <img src={Vampire} alt="vampire"/>
                </button>
            </div>
        </>
    );
}