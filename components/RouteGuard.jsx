import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { authService } from '../services/auth.service';
import Cookies from 'js-cookie';

export { RouteGuard };

export default function RouteGuard({ children }) {

  const checkAuth = () =>{
    let token = Cookies.get("user-token");
    let control = authService.userValue.getValue();
    if (control === false || control === null || token === undefined ||token === null) {
      router.push('/login');
    }
  }
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        authCheck(router.asPath);
        checkAuth();

        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);
 
        router.events.on('routeChangeComplete', authCheck)

        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }

    }, []);

    function authCheck(url) {
      console.log('urrl',url);
        const publicPaths = ['/login'];
        const path = url.split('?')[0];

        if (!authService.user && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/login',
                query: { returnUrl: router.asPath }
            });
        } else {
            setAuthorized(true);
        }
    }

    return (authorized && children);
}
