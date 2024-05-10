import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Resize, Sort, Filter, Page, ExcelExport, PdfExport } from '@syncfusion/ej2-react-grids';
import { Header, Property, UsersSaved } from '../components';
import { savedProperties } from '../api/savedproperties';
import { contextMenuItems } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import { specificProperty } from '../api/propertyApi';

const SavedProperties = () => {
  const [saved, setSaved] = useState([]);
  const [uniqueProperties, setUniqueProperties] = useState([]);
  const { usersSaved, setUsersSaved, savedProperty, setSavedProperty } = useStateContext()

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const savedResponse = await savedProperties();
        setSaved(savedResponse.savedProperties);

        const uniqueProps = savedResponse.savedProperties.reduce((acc, prop) => {
          if (!acc.find(p => p.propertyId === prop.propertyId)) {
            acc.push(prop);
          }
          return acc;
        }, []);
        setUniqueProperties(uniqueProps);
      } catch (error) {
        console.error('Error fetching saved properties listing:', error);
      }
    };
    fetchSaved();
  }, []);

  const handleShowUsers = async (propertyId) => {
    try {
      const savedResponse = await savedProperties();
      const users = savedResponse.savedProperties.filter(item => item.propertyId === propertyId);
      //users.map(user => console.log("user: " + user.userId));
      setUsersSaved({ isOpen: true, users: users });

    } catch (error) {
      console.log(error);
    }
  };

  const handleShowProperty = async (propertyId) => {
    try {
      const response = await specificProperty(propertyId)
      if (response) {
        setSavedProperty({ isOpen: true, details: response.property })
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Apps" title="Saved Properties" />
      {usersSaved.isOpen && <UsersSaved />}
      {savedProperty.isOpen && <Property />}
      <GridComponent
        id="gridcomp"
        dataSource={uniqueProperties}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
      >
        <ColumnsDirective>
          <ColumnDirective headerText='Property' textAlign='Center' width='120' template={(props) => {
            return (
              <button
                type="button"
                onClick={() => handleShowProperty(props.propertyId)}
                style={{ background: "red" }}
                className="text-white py-1 px-2 capitalize rounded-2xl text-md"
              >
                Show
              </button>
            );
          }} />
          <ColumnDirective headerText='Users' textAlign='Center' width='120' template={(props) => {
            return (
              <button
                type="button"
                onClick={() => handleShowUsers(props.propertyId)}
                style={{ background: "orange" }}
                className="text-white py-1 px-2 capitalize rounded-2xl text-md"
              >
                Show
              </button>
            );
          }} />
        </ColumnsDirective>
        <Inject services={[Resize, Sort, Filter, Page, ExcelExport, PdfExport]} />
      </GridComponent>
    </div>
  );
};

export default SavedProperties;
