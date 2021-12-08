import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Service from "./Service";
import { fetchServices } from '../actions/actionCreators'

export default function ServiceList() {
  const dispatch = useDispatch();

  const { loading, error, services } = useSelector((state) => ({
    ...state.fetcher,
    services: state.serviceList,
  }));

  useEffect(() => {
    dispatch(fetchServices());
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul style={{ listStyleType: 'none' }}>
      {
        services.map((service) => <Service service={service} key={service.id} />)
      }
    </ul>
  );
}
