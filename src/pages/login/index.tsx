import { useContext, useRef } from "react";
import { AuthContext } from "../../contexts/auth/authContext";
import { Link, useNavigate } from "react-router-dom";
import '../../assets/css/login.css';
import imgLogin from "../../assets/imgs/imgLogin.jpg";
import Logo from '../../assets/imgs/logo dadohealth.png'
import Cookie from 'js-cookie'
import { Password } from "primereact/password";
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useFormik } from "formik";
import { UserContext } from "../../contexts/user/userContext";

const Login = () => {
    const toast = useRef<Toast>(null);
    const {
        setUser,
        updateToken,
        signIn,
    } = useContext(AuthContext);

    const {
        preserveUserInfo
    } = useContext(UserContext)

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values) => {
            const login = signIn(values)
                .then((res) => {
                    Cookie.set('user', JSON.stringify(res), {
                        path: '/',
                        expires: 1
                    });

                    Cookie.set('token', res.stsTokenManager?.accessToken, {
                        path: '/',
                        expires: 1
                    });

                    const storedUserString = Cookie.get('user');
                    if (storedUserString) {
                        try {
                            const storedUser = JSON.parse(storedUserString);
                            if (storedUser) {
                                setUser(storedUser);
                            }
                        } catch (error) {
                            console.error('Error parsing stored user data:', error);
                        }
                    }

                    preserveUserInfo()

                    updateToken(res.user.refreshToken);
                    navigate('/');
                })
                .catch(err => {
                    toast.current?.show({ severity: 'error', summary: 'Falha ao Logar', detail: `Usuário e/ou senha invalidos.`, life: 3000 });
                    console.log(err);
                });
            return login;
        }
    })



    return (
        <section className="bg-login flex justify-content-center align-items-center">
            <div className="bg-img-complement flex flex-column justify-content-center align-items-center p-5">
                <img src={Logo} className="logo mb-2" />
                <main className="bg-white border-round-lg">
                    <div className="grid">

                        <div className="flex justify-content-center align-items-center col img-display p-5">
                            <img src={imgLogin} alt="Img Login" className="login-img border-round-lg bg-contain" />
                        </div>

                        <div className="col flex flex-column justify-content-center align-items-center p-5">
                            <div>
                                <h1 className="title text-3xl">Bem-Vindo</h1>
                            </div>

                            <div>
                                <div className="border-login mb-5" />
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
                                <div className="col-12 mt-4">
                                    <FloatLabel>
                                        <Password className="passwordInput"
                                            inputId="password" name="password" value={formik.values.password} onChange={(e: any) => formik.setFieldValue('password', e.target.value)} toggleMask feedback={false} />
                                        <label htmlFor="password">Senha</label>
                                    </FloatLabel>
                                </div>
                                <div className="flex flex-column justify-content-center text-center col-12">
                                    <Button type="button" link className="mt-1 mb-0 flex justify-content-center p-1 px-0">
                                        <Link to="/retrieve-password" className="no-underline text-primary">
                                            Esqueci Minha Senha!
                                        </Link>
                                    </Button>
                                </div>
                                <div className="flex flex-column justify-content-center text-center col-12">
                                    <Button className="flex justify-content-center " type="submit" >Entrar</Button>
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

export default Login;