import React, { useEffect, useState } from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { ConfirmationBox, Header, PropertyDetail } from '../components'
import { Link } from 'react-router-dom';
import { contextMenuItems, informationGrid } from '../data/dummy';
import { getInformation } from '../api/informationApi';
import { useStateContext } from '../contexts/ContextProvider';
import InfoDetail from '../components/Modals/InfoDetail';
import InfoUpdate from "../components/Modals/InfoUpdate"
const Information = () => {
  const { info, infoModal, confirm } = useStateContext()
  const [information, setInformation] = useState([]);
  const editing = { allowDeleting: true, allowEditing: true };

  useEffect(() => {
    const fetchInformation = async () => {
      try {
        const response = await getInformation();
        console.log(response.information);
        setInformation(response.information);
      } catch (error) {
        console.error('Error fetching information:', error);
      }
    };

    fetchInformation();
  }, []);
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Manage information" />
      <div className='text-right relative bottom-[2.5em]'>
        <Link to="/add-information">
          <button
            type="button"
            className=" items-center gap-5 pl-4 p-3 pb-2.5 rounded-lg  text-white bg-green-500 text-md m-2"
          >
            Add Information
          </button>
        </Link>
      </div>
      {info?.isOpen && <InfoDetail infoId={info.infoId} />}
      {infoModal?.isOpen && <InfoUpdate infoId={info.infoId} />}
      {confirm.modalIsOpen && <ConfirmationBox />}

      <GridComponent
        id="gridcomp"
        dataSource={information}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
      // rowSelected={handlePropertyClick}
      >
        <ColumnsDirective className="cursor-pointer">
          {informationGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent>
    </div>)
}

export default Information