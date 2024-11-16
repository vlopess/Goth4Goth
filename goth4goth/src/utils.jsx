import bat from "./assets/images/bat.png";
import Witch from "./assets/images/Witch.png";
import blackcat from "./assets/images/blackcat.png";
import Vampire from "./assets/images/Vampire.png";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export function escolherAvatar(value) {
    switch (value) {
        case 'bat': return bat;
        case 'Witch': return Witch;
        case 'blackcat': return blackcat;
        case 'vampire': return Vampire;
    }
}

export const showSwal = () => {
    return withReactContent(Swal).fire({
        title: <i>Deseja realmente sair?</i>,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sair",
        customClass: {
            popup: 'my-swal-popup',
            title: 'my-swal-title',
            content: 'my-swal-content',
            confirmButton: 'my-swal-button'
        },
    });
}