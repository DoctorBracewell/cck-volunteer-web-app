import Head                    from 'next/head';
import { useRouter }           from 'next/router';
import { useEffect, useState } from 'react';
import DeliveriesList          from '@/components/deliveries-list';
import Header                  from '@/components/header';
import styles                  from '../styles/Home.module.css';

/**
 * The app's route page, i.e., the '/route' path
 */
const RoutePage = () => {
  let baseUrl;

  if (typeof window !== 'undefined') {
    const getUrl = window.location;

    baseUrl = `${ getUrl.protocol  }//${  getUrl.host }`;
  }

  const { query, isReady }              = useRouter();
  const [ queryValues, setQueryValues ] = useState(query);

  useEffect(() => {
    if (isReady) {
      setQueryValues(query);
    }
  }, [ query, isReady ]);

  const { date, ref, passcode } = queryValues;

  const mode = queryValues.mode || 'bicycling';

  if (!date || !ref || !passcode) {
    return (<div>Oh no! Missing one or more required query parameters</div>);
  }

  return (
    <>
      <Head>
        <title>CCK - Deliveries</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header />
        <DeliveriesList date={date} id_ref={ref} passcode={passcode} mode={mode} basePath={baseUrl} />
      </main>
    </>
  );
};

export default RoutePage;
