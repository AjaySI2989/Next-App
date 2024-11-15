'use client'
import React, { useState } from 'react';
import { fetchStandingsData } from 'src/utils/apiService';
import { useQuery } from '@tanstack/react-query';
import { Standings } from './standings';
import { SelectBox } from './selectbox';
import { SERIES_IDS } from '../utils/constants';

export const StandingsContainer = () => {

  const [serialID, setSerialID] = useState(5612);
  const [shouldFetch, setShouldFetch] = useState(false); 


  const { data: standings } = useQuery({
      queryKey: ['standings', serialID],
      queryFn: () => fetchStandingsData(serialID),
      enabled: shouldFetch && serialID !== null,
  });

  const handleSelectChange = (newSerialID: number) => {
    if (newSerialID !== serialID) {
      setSerialID(newSerialID); 
      setShouldFetch(true);
    }
  };
  return (
    <div>
      <SelectBox
        options={SERIES_IDS}
        onSelect={handleSelectChange}
      />
      <Standings standings={standings} />
    </div>
  )
}
