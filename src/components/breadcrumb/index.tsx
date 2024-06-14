import { BreadCrumb } from "primereact/breadcrumb";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Breadcrumb = () => {

    const items = [
        { label: 'Components' },
        { label: 'Form' },
        {
            label: 'InputText',
            template: () => <Link to="/">Component</Link>
        }
    ];

    const home = { icon: <FaHome />, url: '/' };

    return (
        <BreadCrumb model={items} home={home} />
    );
}

export default Breadcrumb;