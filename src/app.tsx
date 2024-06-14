import { AuthProvider } from './contexts/auth/authContext';
import { GlobalProvider } from './contexts/global/globalContext';
import { UserProvider } from './contexts/user/userContext';
import { Routes } from './routes/routes';
import { CRMProvider } from './contexts/crm/crmContext';
import { PrimeReactProvider } from 'primereact/api';
import { SchedulingProvider } from './contexts/scheduling/schedulingContext';

const App = () => {
    return (
        <AuthProvider>
            <PrimeReactProvider>
                <GlobalProvider>
                    <UserProvider>
                        <CRMProvider>
                            <SchedulingProvider>
                                <Routes />
                            </SchedulingProvider>
                        </CRMProvider>
                    </UserProvider>
                </GlobalProvider>
            </PrimeReactProvider>
        </AuthProvider>
    );
}

export default App;