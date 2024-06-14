import React, { useContext, useRef, useState } from "react";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputSwitch } from "primereact/inputswitch";
import { useFormik } from "formik";
import { ScrollPanel } from "primereact/scrollpanel";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { UserContext } from "../../../../contexts/user/userContext";
import { AuthContext } from "../../../../contexts/auth/authContext";
import { generateFirebaseId } from "../../../../services/api";
import '../../../../assets/css/pacientCRMAddForm.css';
import { GlobalContext } from "../../../../contexts/global/globalContext";

const PacientCRMAddForm = (prop: Pacient) => {
    const navigate = useNavigate();
    const stepperRef = useRef<any>(null);
    const toast = useRef<Toast>(null);
    const { createUser, sendPasswordRetrieveEmail } = useContext(AuthContext);
    const { postUser, updateUser } = useContext(UserContext);
    const { mobileOpen } = useContext(GlobalContext);
    const [isForeigner, setIsForeigner] = useState(false);
    const [hasHealthInsurance, setHasHealthInsurance] = useState(false);
    const [hasReferral, setHasReferral] = useState(false);
    const [hasGuardian, setHasGuardian] = useState(false);

    const dropdownCivilianStateOptions = [
        { label: 'Solteiro(a)', value: 'solteiro' },
        { label: 'Casado(a)', value: 'casado' },
        { label: 'Divorciado(a)', value: 'divorciado' },
        { label: 'Viúvo(a)', value: 'viuvo' }
    ];

    const dropdownGenderOptions = [
        { label: 'Masculino', value: 'masculino' },
        { label: 'Feminino', value: 'feminino' }
    ];

    const dropdownRaceColorOptions = [
        { label: 'Preto', value: 'preto' },
        { label: 'Pardo', value: 'pardo' },
        { label: 'Branco', value: 'branco' },
        { label: 'Indígena', value: 'indigena' },
        { label: 'Amarelo', value: 'amarelo' }
    ];

    const dropdownHealthInsuranceOptions = [
        { label: 'Amil', value: 'amil' },
        { label: 'Bradesco Saúde', value: 'bradesco_saude' },
        { label: 'Unimed', value: 'unimed' },
        { label: 'SulAmérica Saúde', value: 'sulamerica_saude' },
        { label: 'NotreDame Intermédica', value: 'notredame_intermédica' },
        { label: 'Porto Seguro Saúde', value: 'porto_seguro_saude' }
    ];

    

    const initialValues = {
        id: prop.id || generateFirebaseId(),
        name: prop.name || '',
        username: prop.username || '',
        expertise: prop.expertise || '',
        userType: prop.userType || '4',
        email: prop.email || '',
        cpf: prop.cpf || '',
        phone: prop.phone || '',
        cellphone: prop.cellphone || '',
        rg: prop.rg || '',
        civilianState: prop.civilianState || '',
        gender: prop.gender || '',
        raceColor: prop.raceColor || '',
        birthDate: prop.birthDate || null,
        motherName: prop.motherName || '',
        isForeigner: prop.isForeigner || false,
        originCountry: prop.originCountry || '',
        naturalizationDate: prop.naturalizationDate || null,
        passportNumber: prop.passportNumber || '',
        issuingCountry: prop.issuingCountry || '',
        passportExpiryDate: prop.passportExpiryDate || null,
        susCard: prop.susCard || '',
        hasHealthInsurance: prop.hasHealthInsurance || false,
        healthInsuranceProvider: prop.healthInsuranceProvider || '',
        healthInsuranceNumber: prop.healthInsuranceNumber || '',
        healthInsuranceExpiryDate: prop.healthInsuranceExpiryDate || null,
        hasReferral: prop.hasReferral || false,
        referrerName: prop.referrerName || '',
        createDate: new Date().toISOString()
    };

    const formik = useFormik({
        initialValues,
        onSubmit: (values: any) => {
            if (prop.id == null || prop.id === undefined) {
                createUser(values.email, 'defaultPassword');
                postUser(values.id, values)
                    .then(() => {
                        navigate('/pacients');
                    })
                    .catch((error: any) => {
                        console.log(error);
                    });
                sendPasswordRetrieveEmail(values.email);
            } else {
                updateUser(values.id, values)
                    .then(() => {
                        navigate('/pacients');
                    })
                    .catch((error: any) => {
                        console.log(error);
                    });
            }
        }
    });

    return (
        <React.Fragment>
            <form onSubmit={formik.handleSubmit}>
                <Stepper ref={stepperRef} orientation={`vertical`}>
                    <StepperPanel key="Dados Pessoais" header="Dados Pessoais">
                        <ScrollPanel style={{ minWidth: '100%', height: '45vh' }}>
                            <div className="grid p-4 mt-3">
                                <FloatLabel>
                                    <InputText
                                        className='col-12 w-12 lg:w-30rem xl:w-30rem'
                                        id='name'
                                        name='name'
                                        value={formik.values.name}
                                        onChange={(e: any) => formik.setFieldValue('name', e.target.value)}
                                    />
                                    <label htmlFor='name'>Nome</label>
                                </FloatLabel>
                            </div>
                            <div className="grid p-4 gap-4">
                                <FloatLabel>
                                    <InputText
                                        className='col-12 w-12'
                                        id='username'
                                        name='username'
                                        value={formik.values.username}
                                        onChange={(e: any) => formik.setFieldValue('username', e.target.value)}
                                    />
                                    <label htmlFor='username'>Nome Social</label>
                                </FloatLabel>
                                <FloatLabel>
                                    <InputText
                                        className='col-12 w-12'
                                        id='expertise'
                                        name='expertise'
                                        value={formik.values.expertise}
                                        onChange={(e: any) => formik.setFieldValue('expertise', e.target.value)}
                                    />
                                    <label htmlFor='expertise'>Profissão</label>
                                </FloatLabel>
                            </div>
                            <div className="grid p-4 gap-4">
                                <FloatLabel>
                                    <InputMask
                                        className='col-6 w-12'
                                        id='phone'
                                        name='phone'
                                        mask="(99) 9999-9999"
                                        value={formik.values.phone}
                                        onChange={(e: any) => formik.setFieldValue('phone', e.target.value)}
                                    />
                                    <label htmlFor='phone'>Telefone</label>
                                </FloatLabel>
                                <FloatLabel>
                                    <InputMask
                                        className='col-6 w-12'
                                        id='cellphone'
                                        name='cellphone'
                                        mask="(99) 99999-9999"
                                        value={formik.values.cellphone}
                                        onChange={(e: any) => formik.setFieldValue('cellphone', e.target.value)}
                                    />
                                    <label htmlFor='cellphone'>Celular</label>
                                </FloatLabel>
                            </div>
                            <div className="grid p-4 gap-4">
                                <FloatLabel>
                                    <InputMask
                                        className='col-6 w-12'
                                        id='rg'
                                        name='rg'
                                        mask="99.999.999-9"
                                        value={formik.values.rg}
                                        onChange={(e: any) => formik.setFieldValue('rg', e.target.value)}
                                    />
                                    <label htmlFor='phone'>RG</label>
                                </FloatLabel>
                                <FloatLabel>
                                    <InputMask
                                        className='col-6 w-12'
                                        id='cpf'
                                        name='cellphone'
                                        mask="999.999.999-99"
                                        value={formik.values.cpf}
                                        onChange={(e: any) => formik.setFieldValue('cpf', e.target.value)}
                                    />
                                    <label htmlFor='cpf'>CPF</label>
                                </FloatLabel>
                            </div>
                            <div className="grid p-4 gap-5">
                                <FloatLabel>
                                    <Dropdown
                                        className='col-4 w-12'
                                        id='gender'
                                        name='gender'
                                        value={formik.values.gender}
                                        onChange={(e: any) => formik.setFieldValue('gender', e.target.value)}
                                        options={dropdownGenderOptions}
                                    />
                                    <label htmlFor='gender'>Gênero</label>
                                </FloatLabel>
                                <FloatLabel>
                                    <Dropdown
                                        className='col-4 w-12'
                                        id='raceColor'
                                        name='raceColor'
                                        value={formik.values.raceColor}
                                        onChange={(e: any) => formik.setFieldValue('raceColor', e.target.value)}
                                        options={dropdownRaceColorOptions}
                                    />
                                    <label htmlFor='raceColor'>Raça/Cor</label>
                                </FloatLabel>
                                <FloatLabel>
                                    <Dropdown
                                        className='col-4 w-12'
                                        id='civilianState'
                                        name='civilianState'
                                        value={formik.values.civilianState}
                                        onChange={(e: any) => formik.setFieldValue('civilianState', e.target.value)}
                                        options={dropdownCivilianStateOptions}
                                    />
                                    <label htmlFor='civilianState'>Estado Civíl</label>
                                </FloatLabel>
                            </div>
                            <div className="grid p-4 mt-3">
                                <FloatLabel>
                                    <Calendar
                                        className='col-12 w-12 lg:w-30rem xl:w-30rem'
                                        id='birthDate'
                                        name='birthDate'
                                        value={formik.values.birthDate}
                                        touchUI={mobileOpen}
                                        onChange={(e: any) => {
                                            formik.setFieldValue('birthDate', e.target.value);
                                        }}
                                        dateFormat={'dd/mm/yy'}
                                    />
                                    <label htmlFor='birthDate'>Data de Nascimento</label>
                                </FloatLabel>
                            </div>
                        </ScrollPanel>
                    </StepperPanel>
                    <StepperPanel key="Dados Opcionais" header="Dados Opcionais">
                        <ScrollPanel style={{ width: '100%', height: '45vh' }}>
                            <div className="grid p-4 mt-3">
                                <FloatLabel>
                                    <InputText
                                        className='col-12 w-12 lg:w-30rem xl:w-30rem'
                                        id='motherName'
                                        name='motherName'
                                        value={formik.values.motherName}
                                        onChange={(e: any) => formik.setFieldValue('motherName', e.target.value)}
                                    />
                                    <label htmlFor='motherName'>Nome da Mãe</label>
                                </FloatLabel>
                            </div>
                            <div className="flex align-items-center gap-3 pl-3">
                                <InputSwitch
                                    className=''
                                    id='isForeigner'
                                    name='isForeigner'
                                    checked={formik.values.isForeigner}
                                    onChange={(e: any) => {
                                        setIsForeigner(e.value);
                                        formik.setFieldValue('isForeigner', e.target.value)
                                    }}
                                />
                                <label htmlFor="isForeigner">Estrangeiro?</label>
                            </div>
                            {isForeigner ? <>
                                <div className="grid p-4 mt-3 gap-4">
                                    <FloatLabel>
                                        <InputText
                                            className='col-6 w-12'
                                            id='orignContry'
                                            name='orignContry'
                                            value={formik.values.orignContry}
                                            onChange={(e: any) => formik.setFieldValue('orignContry', e.target.value)}
                                        />
                                        <label htmlFor='orignContry'>País de Origem</label>
                                    </FloatLabel>
                                    <FloatLabel>
                                        <InputText
                                            className='col-6 w-12'
                                            id='passportNumber'
                                            name='passportNumber'
                                            value={formik.values.passportNumber}
                                            onChange={(e: any) => formik.setFieldValue('passportNumber', e.target.value)}
                                        />
                                        <label htmlFor='passportNumber'>Número do Passaporte</label>
                                    </FloatLabel>
                                </div>
                                <div className="grid p-4 gap-4">
                                    <FloatLabel>
                                        <InputText
                                            className='col-6 w-12'
                                            id='issuingCountry'
                                            name='issuingCountry'
                                            value={formik.values.issuingCountry}
                                            onChange={(e: any) => formik.setFieldValue('issuingCountry', e.target.value)}
                                        />
                                        <label htmlFor='issuingCountry'>País Emissor</label>
                                    </FloatLabel>
                                </div>
                                <div className="grid p-4">
                                    <FloatLabel>
                                        <Calendar
                                            className='col-12 w-12 lg:w-30rem xl:w-30rem'
                                            id='issuingCountry'
                                            name='issuingCountry'
                                            value={formik.values.issuingCountry}
                                            onChange={(e: any) => formik.setFieldValue('issuingCountry', e.target.value)}
                                            dateFormat={'dd/mm/yy'}
                                        />
                                        <label htmlFor='issuingCountry'>Data de Validade do Passaporte</label>
                                    </FloatLabel>
                                </div>
                            </> : null}
                            <div className="grid p-4 mt-3">
                                <FloatLabel>
                                    <InputText
                                        className='col-12 w-12 lg:w-30rem xl:w-30rem'
                                        id='susCard'
                                        name='susCard'
                                        value={formik.values.susCard}
                                        onChange={(e: any) => formik.setFieldValue('susCard', e.target.value)}
                                    />
                                    <label htmlFor='susCard'>Numero do Cartao SUS</label>
                                </FloatLabel>
                            </div>
                        </ScrollPanel>
                    </StepperPanel>
                    <StepperPanel key="Plano de Saúde" header="Plano de Saúde">
                        <ScrollPanel style={{ width: '100%', height: '45vh' }}>
                            <div className="flex align-items-center gap-3 pl-3">
                                <InputSwitch
                                    className=''
                                    id='hasHealthInsurance'
                                    name='hasHealthInsurance'
                                    checked={formik.values.hasHealthInsurance}
                                    value={formik.values.hasHealthInsurance}
                                    onChange={(e: any) => {
                                        setHasHealthInsurance(e.value);
                                        formik.setFieldValue('hasHealthInsurance', e.value)
                                    }}
                                />
                                <label htmlFor="hasHealthInsurance">Possui Plano de Saúde?</label>
                            </div>
                            {hasHealthInsurance ?
                                <div>
                                    <div className="grid p-4 mt-3">
                                        <FloatLabel>
                                            <Dropdown
                                                className='col-12 w-12 lg:w-30rem xl:w-30rem'
                                                id='healthInsurance'
                                                name='gender'
                                                value={formik.values.healthInsurance}
                                                onChange={(e: any) => formik.setFieldValue('healthInsurance', e.target.value)}
                                                options={dropdownHealthInsuranceOptions}
                                            />
                                            <label htmlFor='healthInsurance'>Convênio</label>
                                        </FloatLabel>
                                    </div>
                                    <div className="grid p-4 gap-4">
                                        <FloatLabel>
                                            <Calendar
                                                className='col-6 w-12'
                                                id='healthInsuranceExpiryDate'
                                                name='healthInsuranceExpiryDate'
                                                value={formik.values.healthInsuranceExpiryDate}
                                                onChange={(e: any) => formik.setFieldValue('healthInsuranceExpiryDate', e.target.value)}
                                                dateFormat="dd/mm/yyyy"
                                            />
                                            <label htmlFor='healthInsuranceExpiryDate'>Validade do Plano</label>
                                        </FloatLabel>
                                    </div>
                                    <div className="flex align-items-center p-4 gap-3">
                                        <InputSwitch
                                            className=''
                                            id='hasReferral'
                                            name='hasReferral'
                                            checked={formik.values.hasReferral}
                                            onChange={(e: any) => {
                                                setHasReferral(e.value);
                                                formik.setFieldValue('hasReferral', e.target.value)
                                            }}
                                        />
                                        <label htmlFor='hasReferral'>Indicação?</label>
                                    </div>
                                    {hasReferral ?
                                        <div className="grid p-4">
                                            <FloatLabel>
                                                <InputText
                                                    className='col-12 w-12 lg:w-30rem xl:w-30rem'
                                                    id='referrerName'
                                                    name='referrerName'
                                                    checked={formik.values.referrerName}
                                                    value={formik.values.referrerName}
                                                    onChange={(e: any) => formik.setFieldValue('referrerName', e.target.value)}
                                                />
                                                <label htmlFor='referrerName'>Nome de Quem Indicou</label>
                                            </FloatLabel>
                                        </div> : null}
                                </div> : null}
                        </ScrollPanel>
                    </StepperPanel>
                    <StepperPanel key="Responsável" header="Dados do Responsável">
                        <ScrollPanel style={{ width: '100%', height: '45vh' }}>
                            <div className="flex align-items-center p-4 gap-3">
                                <InputSwitch
                                    className=''
                                    id='hasGuardian'
                                    name='hasGuardian'
                                    checked={formik.values.hasGuardian}
                                    onChange={(e: any) => {
                                        setHasGuardian(e.value);
                                        formik.setFieldValue('hasGuardian', e.target.value)
                                    }}
                                />
                                <label htmlFor='hasGuardian'>Responsável?</label>
                            </div>
                            {hasGuardian ?
                                <>
                                    <div className="grid p-4">
                                        <FloatLabel>
                                            <InputText
                                                className='col-12 w-12 lg:w-30rem xl:w-30rem'
                                                id='guardianName'
                                                name='guardianName'
                                                value={formik.values.guardianName}
                                                onChange={(e: any) => formik.setFieldValue('guardianName', e.target.value)}
                                            />
                                            <label htmlFor='guardianName'>Nome do Responsável</label>
                                        </FloatLabel>
                                    </div>
                                    <div className="grid p-4">
                                        <FloatLabel>
                                            <InputText
                                                className='col-12 w-12 lg:w-30rem xl:w-30rem'
                                                id='kinship'
                                                name='kinship'
                                                value={formik.values.kinship}
                                                onChange={(e: any) => formik.setFieldValue('kinship', e.target.value)}
                                            />
                                            <label htmlFor='kinship'>Parentesco</label>
                                        </FloatLabel>
                                    </div>
                                    <div className="grid p-4 gap-4">
                                        <FloatLabel>
                                            <InputText
                                                className='col-6 w-12'
                                                id='guardianCpf'
                                                name='guardianCpf'
                                                value={formik.values.guardianCpf}
                                                onChange={(e: any) => formik.setFieldValue('guardianCpf', e.target.value)}
                                            />
                                            <label htmlFor='guardianCpf'>CPF do Responsável</label>
                                        </FloatLabel>
                                        <FloatLabel>
                                            <InputText
                                                className='col-6 w-12'
                                                id='guardianName'
                                                name='guardianName'
                                                value={formik.values.guardianName}
                                                onChange={(e: any) => formik.setFieldValue('guardianName', e.target.value)}
                                            />
                                            <label htmlFor='guardianName'>Telefone do Responsável</label>
                                        </FloatLabel>
                                    </div>
                                </> : null}
                        </ScrollPanel>
                    </StepperPanel>
                    <StepperPanel key="Dados de LogIn" header="Dados de LogIn">
                        <ScrollPanel style={{ width: '100%', height: '45vh' }}>
                            <div className="flex flex-column py-4 mb-3">
                                <FloatLabel>
                                    <InputText
                                        className='col-12 w-12'
                                        id='email'
                                        name='email'
                                        value={formik.values.email}
                                        onChange={(e: any) => formik.setFieldValue('email', e.target.value)}
                                    />
                                    <label htmlFor='email'>E-mail</label>
                                </FloatLabel>
                                <p>Caso o paciente seja menor de idade, o e-mail deverá ser do responsável</p>
                            </div>
                        </ScrollPanel>
                    </StepperPanel>
                </Stepper>
                <div className="flex justify-content-center mt-5">
                    <Button type="submit" label="Salvar" />
                </div>
            </form>
            <Toast ref={toast} />
        </React.Fragment>
    );
};

export default PacientCRMAddForm;
