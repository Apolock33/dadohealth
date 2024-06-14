import { InputText } from 'primereact/inputtext';
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { InputSwitch } from 'primereact/inputswitch';
import '../../../../assets/css/proForm.css';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { useContext } from 'react';
import { generateFirebaseId } from '../../../../services/api';
import { AuthContext } from '../../../../contexts/auth/authContext';
import { UserContext } from '../../../../contexts/user/userContext';

const ProfesionalForm = (prop: any) => {
    const { postUser, updateUser } = useContext(UserContext);
    const { createUser, sendPasswordRetrieveEmail } = useContext(AuthContext);

    const dropdownOptions = [
        {
            label: 'CRM',
            value: 'crm'
        },
        {
            label: 'CRO',
            value: 'cro'
        },
        {
            label: 'Carteira Profissional',
            value: 'clt'
        }
    ];

    const userTypesOptions = [
        {
            label: 'Profissional',
            value: '1'
        },
        {
            label: 'Administrativo',
            value: '2'
        },
        {
            label: 'Geral',
            value: '3'
        },
        {
            label: 'Paciente',
            value: '4'
        },
        {
            label: 'Financeiro',
            value: '5'
        }
    ]

    const initialValues = {
        id: prop.id || generateFirebaseId(),
        name: prop.name || '',
        email: prop.email || '',
        cpf: prop.cpf || '',
        pic: prop.pic || '',
        userType: prop.userType || '1',
        expertise: prop.expertise || '',
        adm: prop.adm || false,
        concierge: prop.concierge || false,
        blockUser: prop.blockUser || false,
        blockProntuary: prop.blockProntuary || false,
        blockFinances: prop.blockFinances || false,
        blockDocumentation: prop.blockDocumentation || false,
        blockEvolutions: prop.blockEvolutions || false,
        blockDiary: prop.blockDiary || false,
        identificationType: prop.identificationType || '',
        identificationNumber: prop.identificationNumber || '',
        identificationUF: prop.identificationUF || '',
        createDate: Date.now()
    };

    const formik = useFormik({
        initialValues,
        onSubmit: (values: any) => {
            if (initialValues.id === '') {
                createUser(values.email, 'dadoteca@123')
                    .then((resLogin: any) => {
                        console.log(resLogin);
                        postUser(values.id, values)
                            .then((resUserData: any) => {
                                console.log(resUserData);
                                prop.closeForm();
                            })
                            .catch((error: any) => {
                                console.log(error);
                                prop.closeForm();
                            });
                        sendPasswordRetrieveEmail(values.email);
                    });
            } else {
                updateUser(values.id, values)
                    .then(() => {
                        prop.closeForm();
                    })
                    .catch((error: any) => {
                        console.log(error);
                        prop.closeForm();
                    })
            }
        },
        onReset: () => {
            prop.closeForm();
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className='flex justify-content-center my-5'>
                <FloatLabel>
                    <InputText className="w-17rem" id="name" value={formik.values.name} onChange={(e) => formik.setFieldValue('name', e.target.value)} />
                    <label htmlFor="name">Nome:</label>
                </FloatLabel>
            </div>
            <div className='flex justify-content-center my-5'>
                <FloatLabel>
                    <InputText className="w-17rem" id="expertise" value={formik.values.expertise} onChange={(e) => formik.setFieldValue('expertise', e.target.value)} />
                    <label htmlFor="expertise">Especialidade:</label>
                </FloatLabel>
            </div>
            <div className='flex justify-content-center my-5'>
                <FloatLabel>
                    <Dropdown className="w-17rem" id="userType" value={formik.values.userType} options={userTypesOptions} onChange={(e) => formik.setFieldValue('userType', e.target.value)} />
                    <label htmlFor="userType">Tipo de Usuário:</label>
                </FloatLabel>
            </div>
            <div className='my-5'>
                <div className='flex align-items-center my-3'>
                    <InputSwitch name='adm' checked={formik.values.adm} onChange={() => formik.setFieldValue('adm', !formik.values.adm)} />
                    <label className='ml-2' htmlFor="adm">ADMIN?</label>
                </div>
                <div className='flex align-items-center my-3'>
                    <InputSwitch name='concierge' checked={formik.values.concierge} onChange={() => formik.setFieldValue('concierge', !formik.values.concierge)} />
                    <label className='ml-2' htmlFor="concierge">Concierge?</label>
                </div>
                <div className='flex align-items-center my-3'>
                    <InputSwitch name='blockPontuary' checked={formik.values.blockPontuary} onChange={() => formik.setFieldValue('blockPontuary', !formik.values.blockPontuary)} />
                    <label className='ml-2' htmlFor="blockPontuary">Bloquear Pontuario</label>
                </div>
                <div className='flex align-items-center my-3'>
                    <InputSwitch name='blockFinances' checked={formik.values.blockFinances} onChange={() => formik.setFieldValue('blockFinances', !formik.values.blockFinances)} />
                    <label className='ml-2' htmlFor="blockFinances">Bloquear Finanças</label>
                </div>
                <div className='flex align-items-center my-3'>
                    <InputSwitch name='blockDocumentation' checked={formik.values.blockDocumentation} onChange={() => formik.setFieldValue('blockDocumentation', !formik.values.blockDocumentation)} />
                    <label className='ml-2' htmlFor="blockDocumentation">Bloquear Documentação</label>
                </div>
                <div className='flex align-items-center my-3'>
                    <InputSwitch name='blockEvolutions' checked={formik.values.blockEvolutions} onChange={() => formik.setFieldValue('blockEvolutions', !formik.values.blockEvolutions)} />
                    <label className='ml-2' htmlFor="blockEvolutions">Bloquear Evoluções</label>
                </div>
                <div className='flex align-items-center my-3'>
                    <InputSwitch name='blockDiary' checked={formik.values.blockDiary} onChange={() => formik.setFieldValue('blockDiary', !formik.values.blockDiary)} />
                    <label className='ml-2' htmlFor="blockDiary">Bloquear Diário</label>
                </div>
            </div>
            <div className='flex justify-content-center my-5'>
                <FloatLabel>
                    <Dropdown className="w-17rem" id="identificationType" value={formik.values.identificationType} options={dropdownOptions} onChange={(e) => formik.setFieldValue('identificationType', e.target.value)} editable checkmark showClear />
                    <label htmlFor="identificationType">Tipo da Carteira:</label>
                </FloatLabel>
            </div>
            <div className='flex justify-content-center my-5'>
                <FloatLabel>
                    <InputMask mask={(formik.values.identificationType === 'crm') ? '99999999-9' : (formik.values.identificationType === 'cro') ? 'CRO-UF-99999' : '999.99999.99-9'} className="w-17rem" id="identificationNumber" name="identificationNumber" value={formik.values.identificationNumber} onChange={(e) => formik.setFieldValue('identificationNumber', e.target.value)} />
                    <label htmlFor="identificationNumber">Numero da Carteira:</label>
                </FloatLabel>
            </div>
            <div className='flex justify-content-center my-5'>
                <FloatLabel>
                    <InputText className="w-17rem" id="identificationUF" value={formik.values.identificationUF} onChange={(e) => formik.setFieldValue('identificationUF', e.target.value)} />
                    <label htmlFor="identificationUF">UF da Carteira:</label>
                </FloatLabel>
            </div>
            <div className='flex justify-content-center my-5'>
                <FloatLabel>
                    <InputText className="w-17rem" id="cpf" value={formik.values.cpf} onChange={(e) => formik.setFieldValue('cpf', e.target.value)} />
                    <label htmlFor="cpf">CPF:</label>
                </FloatLabel>
            </div>
            <div className='flex justify-content-center my-5'>
                <FloatLabel>
                    <InputText className="w-17rem" id="email" value={formik.values.email} onChange={(e) => formik.setFieldValue('email', e.target.value)} />
                    <label htmlFor="email">E-mail:</label>
                </FloatLabel>
            </div>
            <div className='flex justify-content-between'>
                <Button type='submit'>Salvar</Button>
                <Button type='reset' severity='danger' onClick={formik.handleReset}>Cancelar</Button>
            </div>
        </form>
    );
}

export default ProfesionalForm;
