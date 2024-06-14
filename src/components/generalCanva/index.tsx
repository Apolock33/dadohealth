import { Sidebar } from "primereact/sidebar";
import '../../assets/css/generalCanva.css';

const GeneralCanva = ({ canvaColor, header, open, onHide, position, children }: any) => {
    return (
        <Sidebar header={header} style={{ borderRadius: '1.5rem 0 0 0', boxShadow: 'none !important', background: canvaColor }} visible={open} position={position} onHide={onHide} showCloseIcon>
            {children}
        </Sidebar>
    );
}

export default GeneralCanva;