import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { checkTokens } from './Auth';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const verifyAuth = async () => {
            const authenticated = await checkTokens();
            setIsAuthenticated(authenticated);
        };

        verifyAuth();
    }, []);

    if (isAuthenticated === null) {
        // 인증 상태 확인 중
        return <div>로딩 중...</div>;
    }

    if (!isAuthenticated) {
        // 인증되지 않은 경우 로그인 페이지로 리다이렉트
        // 현재 경로를 state로 전달하여 로그인 후 원래 페이지로 돌아갈 수 있게 함
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;