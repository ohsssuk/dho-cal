'use client';

import ResultTable from './item/ResultTable';
import { useEffect, useState } from 'react';
import styles from './fleet.module.css';
import { fleetData, partsSumForShip, resultTableData } from './type';
import { ShipItemProps } from './item/ShipProps';
import {
  calculatePartsSum,
  calculatePartsSumForShip,
  generateCombinations,
} from './calculation';

const SHIP_COUNT_IN_FLEET = 7;

export default function FleetOutput({ inputData }: { inputData: fleetData }) {
  const [resultTableData, setResultTableData] = useState<
    resultTableData[] | null
  >(null);
  const [resultShipsParts, setResultShipsParts] = useState<partsSumForShip>(
    calculatePartsSumForShip(inputData),
  );

  useEffect(() => {
    handleCalculateFleet();
  }, [inputData]);

  const handleCalculateFleet = () => {
    const { useShips } = inputData;

    const allCombinations: ShipItemProps[][] = generateCombinations(
      useShips,
      SHIP_COUNT_IN_FLEET,
    );

    const partsSum = calculatePartsSum(inputData);

    const newResultTableData: resultTableData[] = [];
    allCombinations.forEach((combination) => {
      const {
        naeSum,
        sweSum,
        dolSum,
        loadedQuantitySum,
        crewSum,
        minCrewSum,
        durabilitySum,
        rowingSum,
        verticalSailSum,
        horizontalSailSum,
        stat1Sum,
        stat2Sum,
        stat3Sum,
      } = combination.reduce(
        (acc, current) => ({
          naeSum: acc.naeSum + (current.nae ?? 0),
          sweSum: acc.sweSum + (current.swe ?? 0),
          dolSum: acc.dolSum + (current.dol ?? 0),
          loadedQuantitySum:
            acc.loadedQuantitySum + (current.loadedQuantity ?? 0),
          crewSum: acc.crewSum + (current.crew ?? 0),
          minCrewSum: acc.minCrewSum + (current.minCrew ?? 0),
          durabilitySum: acc.durabilitySum + (current.durability ?? 0),
          rowingSum: acc.rowingSum + (current.rowing ?? 0),
          verticalSailSum: acc.verticalSailSum + (current.verticalSail ?? 0),
          horizontalSailSum:
            acc.horizontalSailSum + (current.horizontalSail ?? 0),
          stat1Sum: acc.stat1Sum + (current.stat1 ?? 0),
          stat2Sum: acc.stat2Sum + (current.stat2 ?? 0),
          stat3Sum: acc.stat3Sum + (current.stat3 ?? 0),
        }),
        {
          naeSum: 0,
          sweSum: 0,
          dolSum: 0,
          loadedQuantitySum: 0,
          crewSum: 0,
          minCrewSum: 0,
          durabilitySum: 0,
          rowingSum: 0,
          verticalSailSum: 0,
          horizontalSailSum: 0,
          stat1Sum: 0,
          stat2Sum: 0,
          stat3Sum: 0,
        },
      );

      newResultTableData.push({
        ids: combination.map((item) => Number(item.id)),
        nae: Number(((naeSum + partsSum.nae) / combination.length).toFixed(2)),
        swe: Number(((sweSum + partsSum.swe) / combination.length).toFixed(2)),
        dol: Number(((dolSum + partsSum.dol) / combination.length).toFixed(2)),
        loadedQuantity: loadedQuantitySum + partsSum.loadedQuantity,
        crew: crewSum,
        minCrew: minCrewSum,
        durability: Number((durabilitySum / combination.length).toFixed(2)),
        rowing: rowingSum,
        verticalSail: Number((verticalSailSum / combination.length).toFixed(2)),
        horizontalSail: Number(
          (horizontalSailSum / combination.length).toFixed(2),
        ),
        stat1: Number((stat1Sum / combination.length).toFixed(2)),
        stat2: Number((stat2Sum / combination.length).toFixed(2)),
        stat3: Number((stat3Sum / combination.length).toFixed(2)),
      });
    });

    setResultTableData(newResultTableData);
    setResultShipsParts(calculatePartsSumForShip(inputData));
  };

  return (
    <>
      {resultTableData && inputData && (
        <ResultTable
          fleetData={inputData}
          resultTableData={resultTableData}
          resultShipsParts={resultShipsParts}
        />
      )}
    </>
  );
}
