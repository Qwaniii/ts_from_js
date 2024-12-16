import React, { memo, useCallback } from 'react';
import SideLayout from '../../components/side-layout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';

type SessionState = {
  user: {
    profile: {
      name: string;
    };
  };
  exists: boolean;
};

const  TopHead = () => {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const location = useLocation();
  const store = useStore();

  const select = useSelector<SessionState>((state) => ({
    user: state.session.user,
    exists: state.session.exists,
  }));

  const callbacks = {
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),

    // Отмена авторизации
    onSignOut: useCallback(() => {
      store.actions.session.signOut();
    }, []),
  };

  return (
    <SideLayout side="end" padding="small">
      {select.exists ? <Link to="/profile/self">{select.user.profile.name}</Link> : ''}
      {select.exists ? (
        <button onClick={callbacks.onSignOut}>{t && t('session.signOut')}</button>
      ) : (
        <button onClick={callbacks.onSignIn}>{t && t('session.signIn')}</button>
      )}
    </SideLayout>
  );
}

export default memo(TopHead);
