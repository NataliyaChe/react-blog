import {useAuth} from './useAuth';

export const useWarning = () => {
    const { user } = useAuth();
    const warning = user.securityBreaches;
    console.log('user securityBreaches', warning);
    console.log('user warning', user);

    

    function getBan(warning) {
        switch(warning) {
            case 1: 
                console.log('case warning 1', warning);
                break;
            case 2: 
                console.log('case warning 2', warning);
                break;
            case 3: 
                console.log('case warning 3', warning);
                break;
        }
    }
    return {
        warning, getBan
    }
}