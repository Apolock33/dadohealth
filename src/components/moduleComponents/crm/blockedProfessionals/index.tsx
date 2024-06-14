import { Button } from "primereact/button";
import { FaUnlock } from "react-icons/fa6";

const BlockedProfessionals = (prop: { title: string; status: boolean, onClick: any }) => {
    return (
        <div className="flex flex-row justify-content-between align-items-center px-3 bg-primary border-round-xl mb-3">
            <div>
                <h3 className="mb-0 text-sm">Nome: {prop.title}</h3>
                <h6 className="mt-3">Status: {(prop.status == true) ? 'Bloqueado' : null}</h6>
            </div>
            <div>
                <Button onClick={prop.onClick}>
                    <FaUnlock size={20} />
                </Button>
            </div>
        </div>
    );
}

export default BlockedProfessionals;