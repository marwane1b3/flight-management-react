import React, { useState, useEffect } from "react";
import "./home.scss";
import Data from "../../utils/flights-list";
import {
  DataGrid,
  Column,
  Selection,
  Editing,
} from "devextreme-react/data-grid";
export default function Home() {
  const [flights, setFlights] = useState<
    {
      IATA_AIRLINE_CODE: string;
      FLIGHT_NUMBER: string;
      FLIGHT_DATE: string;
      ORIGIN: string;
      DESTINATION: string;
    }[]
  >();
  const [flightDetails, setFlightDetails] = useState<
    {
      CLIENT_CODE: string;
      NUMBER_TOTAL_SEATS: number;
      BOOKED_SEATS: number;
    }[]
  >();
  const [showFlightDetails, setShowFlightDetails] = useState<boolean>(false);

  const cellRenderingFunction = (data: any, keys: string[]) => {
    return (
      <div>
        {data!.key![keys[0]]} {data!.key![keys[1]]}
      </div>
    );
  };

  const handleRowSelectedFunction = (ev: {
    selectedRowsData: {
      IATA_AIRLINE_CODE: string;
      FLIGHT_NUMBER: string;
      FLIGHT_DATE: string;
      ORIGIN: string;
      DESTINATION: string;
    }[];
  }) => {
    setShowFlightDetails(true);
    const selectedContigents = Data.flights.filter(
      (el: {
        IATA_AIRLINE_CODE: string;
        FLIGHT_NUMBER: string;
        FLIGHT_DATE: string;
        ORIGIN: string;
        DESTINATION: string;
        LIST_CONTIGENTS: {
          CLIENT_CODE: string;
          NUMBER_TOTAL_SEATS: number;
          BOOKED_SEATS: number;
        }[];
      }) => el.IATA_AIRLINE_CODE === ev.selectedRowsData[0].IATA_AIRLINE_CODE
    );

    setFlightDetails(selectedContigents[0].LIST_CONTIGENTS);
  };

  useEffect(() => {
    const parsedData: {
      IATA_AIRLINE_CODE: string;
      FLIGHT_NUMBER: string;
      FLIGHT_DATE: string;
      ORIGIN: string;
      DESTINATION: string;
    }[] = Data.flights.map((el) => {
      return {
        IATA_AIRLINE_CODE: el.IATA_AIRLINE_CODE,
        FLIGHT_NUMBER: el.FLIGHT_NUMBER,
        FLIGHT_DATE: el.FLIGHT_DATE,
        ORIGIN: el.ORIGIN,
        DESTINATION: el.DESTINATION,
      };
    });
    setFlights(parsedData);
  }, []);

  return (
    <React.Fragment>
      <h2 className={"content-block"}>Home</h2>
      <div className={"content-block"}>
        <h6>Available Flights</h6>
        <DataGrid
          dataSource={flights}
          allowColumnReordering={true}
          onDataErrorOccurred={(e: any) => (
            <div>{"une est survenue veuillez resseyer plutard"}</div>
          )}
          onSelectionChanged={handleRowSelectedFunction}
        >
          <Column
            dataField="FLIGHT_FULLCODE"
            dataType="string"
            cellRender={(data) =>
              cellRenderingFunction(data, [
                "IATA_AIRLINE_CODE",
                "FLIGHT_NUMBER",
              ])
            }
          ></Column>

          <Column dataField="FLIGHT_DATE" dataType="string"></Column>
          <Column
            dataField="AIRPORT_CODES"
            dataType="string"
            cellRender={(data) =>
              cellRenderingFunction(data, ["ORIGIN", "DESTINATION"])
            }
          ></Column>
          <Selection mode="single" allowSelectAll={false} />
        </DataGrid>
        {showFlightDetails ? (
          <>
            <div className="spacing-list-details">
              <DataGrid
                dataSource={flightDetails}
                allowColumnReordering={true}
                onDataErrorOccurred={(e: any) => (
                  <div>{"une est survenue veuillez resseyer plutard"}</div>
                )}
              >
                <Selection mode="single" allowSelectAll={false} />
                <Editing mode="row" allowUpdating={true} />
              </DataGrid>
            </div>
          </>
        ) : null}
      </div>
    </React.Fragment>
  );
}
