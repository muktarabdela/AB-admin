import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu,
    Filter, Page, ExcelExport, PdfExport, Edit, Inject
} from '@syncfusion/ej2-react-grids'
import { contextMenuItems, userGrid } from '../data/dummy';
import { Header, Modal } from '../components';
import { allUsers } from '../api/userApi'
import { useStateContext } from '../contexts/ContextProvider';

const Users = () => {
    const [users, setUsers] = useState([]);
    const { userModal, setUserModal } = useStateContext();
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userListings = await allUsers();
                console.log(userListings)
                setUsers(userListings);
            } catch (error) {
                console.error('Error fetching property listings:', error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Users" />
            {userModal.isOpen && <Modal userData={userModal.modalData} />}
            <GridComponent
                id="gridcomp"
                dataSource={users}
                allowPaging
                allowSorting
                allowExcelExport
                allowPdfExport
                contextMenuItems={contextMenuItems}
            >
                <ColumnsDirective>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    {userGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
                </ColumnsDirective>
                <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
            </GridComponent>
        </div>
    );
};

export default Users;
