import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { useContext, useEffect, useRef, useState } from "react";
import { FaUserPlus } from "react-icons/fa6";
import { CRMContext } from "../../../../contexts/crm/crmContext";
import { SchedulingContext } from "../../../../contexts/scheduling/schedulingContext";
import { generateFirebaseId } from "../../../../services/api";
import { Toast } from "primereact/toast";

const FastSchedule = ({ children }: any | null) => {
    const [pacientList, setPacientList] = useState<Pacient[]>([]);
    const [doctorsList, setDoctorsList] = useState<Pacient[]>([]);
    const toast = useRef<Toast>(null!);

    const {
        getPacientList
    } = useContext(CRMContext);

    const {
        createSchedule
    } = useContext(SchedulingContext);

    const dropdownHealthInsuranceOptions = [
        { label: 'Amil', value: 'amil' },
        { label: 'Bradesco Saúde', value: 'bradesco_saude' },
        { label: 'Unimed', value: 'unimed' },
        { label: 'SulAmérica Saúde', value: 'sulamerica_saude' },
        { label: 'NotreDame Intermédica', value: 'notredame_intermédica' },
        { label: 'Porto Seguro Saúde', value: 'porto_seguro_saude' }
    ];


    const fetchData = async () => {
        try {
            const data = await getPacientList();
            const filteredData = data.filter((user: any) => user?.userType === '4');
            setPacientList(filteredData);
        } catch (error) {
            console.error('Error fetching professional list:', error);
        }
    }

    const fetchDoctors = async () => {
        try {
            const data = await getPacientList();
            const filteredData = data.filter((user: any) => user?.userType !== '4' && user.userType !== '2' && user.userType !== '5');
            setDoctorsList(filteredData);
        } catch (error) {
            console.error('Error fetching professional list:', error);
        }
    }

    const pacientOptions = () => {
        return pacientList.map((user: any) => {
            return {
                label: user.name,
                value: user.id
            }
        })
    }

    const doctorsOptions = () => {
        return doctorsList.map((user: any) => {
            return {
                label: user.name,
                value: user.id
            }
        })
    }

    const expertiseOptions = () => {
        return doctorsList.map((user: any) => {
            return {
                label: user.expertise,
                value: user.expertise
            }
        });
    }

    const formik = useFormik({
        initialValues: {
            id: generateFirebaseId(),
            startDate: '',
            endDate: '',
            doctor: '',
            pacient: '',
            status: 1,
            expertise: '',
            healthInsurance: '',
            createDate: new Date().toISOString()
        },
        onSubmit: (values: any) => {
            values.startDate = new Date(values.startDate).toISOString();
            values.endDate = new Date(values.endDate).toISOString();
            console.log(values)
            createSchedule(values.id, values)
                .then(() => {
                    toast.current?.show({ severity: 'success', summary: 'Agendado!', detail: 'Agendamento Realizado', life: 3000 });
                })
                .catch((err: any) => {
                    toast.current?.show({ severity: 'error', summary: 'Falha ao Agendar', detail: `Falha ao realizar agendamento. Tente novamente mais tarde. Detalhamento de Erro: ${err.message}`, life: 3000 });
                });
        }
    })

    useEffect(() => {
        fetchData();
        fetchDoctors();
    }, []);

    return (
        <form onSubmit={formik.handleSubmit} className="grid">
            <div className="field border-round-left-2xl col-12 p-inputgroup">
                <FloatLabel>
                    <Dropdown
                        options={pacientOptions()}
                        className="w-full"
                        value={formik.values.pacient}
                        onChange={(e: any) => formik.setFieldValue('pacient', e.target.value)}
                    />
                    <label htmlFor="pacient">Paciente</label>
                </FloatLabel>
                <Button icon={<FaUserPlus />} type="button" />
            </div>
            <div className="field col-12">
                <FloatLabel>
                    <Calendar
                        className="w-full"
                        id="startDate"
                        name="startDate"
                        value={formik.values.startDate}
                        onChange={(e: any) => {
                            formik.setFieldValue('startDate', e.target.value)
                            console.log(e.target.value)
                        }}
                        showTime
                        hourFormat="24"
                        dateFormat="dd/mm/yy"
                    />
                    <label htmlFor='startDate'>Data de Inicio</label>
                </FloatLabel>
            </div>
            <div className="field col-12">
                <FloatLabel>
                    <Calendar
                        className="w-full"
                        id="endDate"
                        name="endDate"
                        value={formik.values.endDate}
                        onChange={(e: any) => {
                            formik.setFieldValue('endDate', e.target.value);
                        }}
                        showTime
                        hourFormat="24"
                        dateFormat="dd/mm/yy"
                    />
                    <label htmlFor='endDate'>Data de Fim</label>
                </FloatLabel>
            </div>
            <div className="field col-12">
                <FloatLabel>
                    <Dropdown
                        className="w-full"
                        id="doctor"
                        name="doctor"
                        value={formik.values.doctor}
                        onChange={(e: any) => formik.setFieldValue('doctor', e.target.value)}
                        options={doctorsOptions()}
                    />
                    <label htmlFor='doctor'>Nome do Profissional</label>
                </FloatLabel>
            </div>
            <div className="field col-12">
                <FloatLabel>
                    <Dropdown
                        className="w-full"
                        id="expertise"
                        name="expertise"
                        value={formik.values.expertise}
                        options={expertiseOptions()}
                        onChange={(e: any) => formik.setFieldValue('expertise', e.target.value)}
                    />
                    <label htmlFor='expertise'>Especialidade</label>
                </FloatLabel>
            </div>
            <div className="field col-12">
                <FloatLabel>
                    <Dropdown
                        className="w-full"
                        id="expertise"
                        name="healthInsurance"
                        value={formik.values.healthInsurance}
                        options={dropdownHealthInsuranceOptions}
                        onChange={(e: any) => formik.setFieldValue('healthInsurance', e.target.value)}
                    />
                    <label htmlFor='healthInsurance'>Plano de Saúde</label>
                </FloatLabel>
            </div>
            {children}
            <div className="field col-12">
                <Button
                    className="w-full"
                    label="Agendar"
                    type="submit"
                />
            </div>
            <Toast ref={toast} position="top-center" />
        </form>
    );
}

export default FastSchedule;