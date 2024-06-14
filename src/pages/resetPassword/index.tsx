import { useFormik } from "formik";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import imgLogin from "../../assets/imgs/imgLogin.jpg";
import Logo from '../../assets/imgs/logo dadohealth.png'
import { useContext, useRef } from "react";
import { AuthContext } from "../../contexts/auth/authContext";

const ResetPassword = () => {
    const toast = useRef<Toast>(null);
    const { sendPasswordRetrieveEmail } = useContext(AuthContext)
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: (values) => {
            sendPasswordRetrieveEmail(values.email)
                .then(() => {
                    toast.current?.show({ severity: 'success', summary: 'E-mail Enviado!', detail: `Por favor verifique sua Caixa de Entrada`, life: 3000 });
                })
                .catch((err: any) => {
                    console.log(err);
                    toast.current?.show({ severity: 'error', summary: 'Falha ao Enviar E-mail', detail: `Por favor tente novamente mais tarde`, life: 3000 });
                });
        }
    })

    return (
        <section>
            <div className="bg-img-complement flex flex-column justify-content-center align-items-center p-5">
                <img src={Logo} className="logo mb-2" />
                <main className="bg-white border-round-lg">
                    <div className="grid">

                        <div className="flex justify-content-center align-items-center col img-display p-5">
                            <img src={imgLogin} alt="Img Login" className="login-img border-round-lg bg-contain" />
                        </div>

                        <div className="col flex flex-column justify-content-center align-items-center p-5">
                            <div>
                                <h1 className="title text-3xl">Esqueceu a Senha?</h1>
                            </div>

                            <div>
                                <div className="border-login mb-2" />
                            </div>

                            <div className="max-w-21rem text-center text-primary">
                                <p>Por favor digiete seu e-mail para que possamos enviar um e-mail de recuperação de senha</p>
                            </div>

                            <form onSubmit={formik.handleSubmit} className="flex flex-column input-config">
                                <div className="col-12">
                                    <FloatLabel>
                                        <InputText
                                            className="email-input"
                                            id="email" name="email" value={formik.values.email} onChange={(e: any) => formik.setFieldValue('email', e.target.value)} />
                                        <label htmlFor="email">E-mail</label>
                                    </FloatLabel>
                                </div>
                                <div className="flex flex-column justify-content-center text-center col-12">
                                    <Button className="flex justify-content-center " type="submit" label="Enviar E-mail" />
                                </div>
                                <div className="flex flex-column justify-content-center text-center col-12">
                                    <Button outlined icon='pi pi-arrow-left' label="Voltar" type="button" onClick={() => navigate('/')} />
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
            <Toast ref={toast} position="top-center" />
        </section>
    );
}

export default ResetPassword;