import { FaHome } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaClock } from "react-icons/fa";

const Menu = [
    
    {
        id: 1,
        title: "Home",
        icon: <FaHome />,
        link: '/'
    },
    {
        id: 2,
        title: "Important",
        icon: <FaList />,
        link: "/important"
    },
    {
        id: 3,
        title: "Completed",
        icon: <FaCheck />,
        link: "/completed"
    },
    {
        id: 4,
        title: "Do it Now",
        icon: <FaClock />,
        link: "/incomplete"
    }
]

export default Menu
