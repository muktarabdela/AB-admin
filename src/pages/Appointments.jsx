import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu,
  Filter, Page, ExcelExport, PdfExport, Edit, Inject
} from '@syncfusion/ej2-react-grids'
import { contextMenuItems, appointmentsGrid } from '../data/dummy';
import { Header, ConfirmationBox, UpdateAppointment, Modal, UserDetail, PropertyDetail } from '../components';
import { appointmentListings } from '../api/appointmentApi'
import { useStateContext } from '../contexts/ContextProvider';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { confirm, appointmentModal, userModal, user, setUser, property } = useStateContext();
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentreponse = await appointmentListings();
        setAppointments(appointmentreponse);
      } catch (error) {
        console.error('Error fetching appointment listings:', error);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Appointments" />
      {user.isOpen && <UserDetail userId={user.modalId} />}
      {confirm.modalIsOpen && <ConfirmationBox />}
      {appointmentModal.isOpen && <UpdateAppointment />}
      {property.isOpen && <PropertyDetail propertyId={property.propertyId} />}
      <GridComponent
        id="gridcomp"
        dataSource={appointments}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {appointmentsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />

      </GridComponent>
    </div>
  );
};

export default Appointments;
