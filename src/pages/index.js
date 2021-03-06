import { useState } from 'react';

import Layout from '../components/Layout/Layout';
import CountriesTables from '../components/SearchInput/CountriesTables/CountriesTable';
import SearchInput from '../components/SearchInput/SearchInput';
import styles from '../styles/Home.module.css';

const COUNTRIES_API = `https://restcountries.eu/rest/v2/all`;

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState('');

  // filters results based on user input
  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
    e.preventDefault;
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>Found {countries.length} countries</div>
        <div className={styles.input}>
          <SearchInput
            placeholder="Filter by Name, Region or SubRegion"
            onChange={onInputChange}
          />
        </div>
      </div>

      <CountriesTables countries={filteredCountries} />
    </Layout>
  );
}

// gets all data at build time
// "STATIC" , meaning the data will only be updated at build time
export const getStaticProps = async () => {
  const res = await fetch(COUNTRIES_API);
  const countries = await res.json();
  return {
    props: {
      countries,
    },
  };
};
