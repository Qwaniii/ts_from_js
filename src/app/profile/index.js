import { memo, useCallback, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import ProfileCard from '../../components/profile-card';
import SideLayout from '../../components/side-layout';

function Profile() {
  const store = useStore();

  const params = useParams()

  useInit(() => {
    store.actions.profile.load(params.id);
  }, [params.id]);

  const select = useSelector(state => ({
    profile: state.profile.data,
    waiting: state.profile.waiting,
  }));

  const { t } = useTranslate();

  return (
    <PageLayout>
      <TopHead />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileCard data={select.profile} />
        <SideLayout padding="medium">
          <Link to={`/chat`}>Перейти в чат</Link>
        </SideLayout>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
