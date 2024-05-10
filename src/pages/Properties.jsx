import React, { useEffect, useState } from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { contextMenuItems, propertyGrid, GridPropertyAdd } from '../data/dummy';
import { ConfirmationBox, Header, PropertyDetail, UpdateProperty } from '../components'
import { getPropertyListings } from '../api/propertyApi';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';


const Properties = () => {
  const [properties, setProperties] = useState([]);
  const { property, PropertyModal, confirm, AddPropertyModal, setConfirm, setAddPropertyModal } = useStateContext();
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertyListings = await getPropertyListings();
        setProperties(propertyListings?.properties);
      } catch (error) {
        console.error('Error fetching property listings:', error);
      }
    };
    fetchProperties();
  }, []);
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Manage Property" />

      <div className='text-right relative bottom-[2.5em] '
        onClick={() => { setAddPropertyModal({ isOpen: true }); setConfirm({ action: "ADD", modalType: "property", }) }} style={{ background: "" }}
      >
        <Link to="/add-property">
          <button
            type="button"
            className=" items-center gap-5 pl-4 p-3 pb-2.5 rounded-lg  text-white bg-green-500 text-md m-2" >
            Add Property
          </button>
        </Link>

      </div>

      {property?.isOpen && <PropertyDetail propertyId={property.propertyId} />}
      {confirm.modalIsOpen && <ConfirmationBox />}
      {PropertyModal.isOpen && <UpdateProperty />}
      <GridComponent
        id="gridcomp"
        dataSource={properties}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
      >
        <ColumnsDirective className="cursor-pointer">
          {propertyGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent>

    </div>
  )
}

export default Properties 