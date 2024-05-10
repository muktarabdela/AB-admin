import React, { useState } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import { deleteAppointment, updateAppointment } from '../../api/appointmentApi'
import { deleteProperty, updateProperty, addPropertyApi } from '../../api/propertyApi';
import { createInformation, deleteInformation, updateInformation } from '../../api/informationApi';
import { useNavigate } from 'react-router-dom';


const ConfirmationBox = () => {
  const navigate = useNavigate();

  const { confirm, setConfirm, appointmentModal, PropertyModal, AddPropertyModal, AddInfoModal, setInfoModal, infoModal } = useStateContext();
  const [isLoading, setIsLoading] = useState(false)
  const content = confirm.modalType
  const action = confirm.action
  const handleConfirm = async () => {
    try {
      if (content === "Appointment" && action === "Delete") {
        setIsLoading(true)
        const response = await deleteAppointment(confirm.id)
        setIsLoading(false)
        setConfirm({ modalIsOpen: false })
        window.location.reload()
      }
      else if (content === "Appointment" && action === "Update") {
        setIsLoading(true)
        const response = await updateAppointment(confirm.id, appointmentModal.updateBody)
        setIsLoading(false)
        setConfirm({ modalIsOpen: false })
        window.location.reload()
      }
      else if (content === "property" && action === "ADD") {
        setIsLoading(true)
        const response = await addPropertyApi(AddPropertyModal.addBody)
        setIsLoading(false)
        setConfirm({ modalIsOpen: false })
        navigate('/properties')
        window.location.reload()
      }
      else if (content === "property" && action === "Update") {
        setIsLoading(true)
        const response = await updateProperty(PropertyModal.updateBody, confirm.id)
        setIsLoading(false)
        setConfirm({ modalIsOpen: false })
        window.location.reload()
      }
      else if (content === "property" && action === "Delete") {
        setIsLoading(true)
        const response = await deleteProperty(confirm.id)
        console.log(response)
        setIsLoading(false)
        setConfirm({ modalIsOpen: false })
        window.location.reload()
      }
      else if (content === "information" && action === "ADD") {
        setIsLoading(true)
        const response = await createInformation(AddInfoModal.addBody)
        setIsLoading(false)
        setConfirm({ modalIsOpen: false })
        navigate('/informations')
        window.location.reload()
      }
      else if (content === "information" && action === "Update") {
        setIsLoading(true)
        const response = await updateInformation(infoModal.updateBody, confirm.id)
        console.log(response)
        setIsLoading(false)
        setConfirm({ modalIsOpen: false })
        window.location.reload()
      }
      else if (content === "information" && action === "Delete") {
        setIsLoading(true)
        const response = await deleteInformation(confirm.id)
        console.log(response)
        setIsLoading(false)
        setConfirm({ modalIsOpen: false })
        window.location.reload()
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (!isLoading) {
    return (
      <div
        className={`fixed inset-0 z-50  overflow-y-auto`}
      >
        <div className="flex items-center justify-center min-h-screen">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
            onClick={() => setConfirm({ modalIsOpen: false })}
          ></div>

          <div className="relative bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full">
            <div className="p-6">
              <div className="text-lg font-semibold mb-4">Confirm Action</div>
              <div className="text-sm text-gray-700 mb-4">
                {`Are you sure you want to ${action} this ${content}?`}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setConfirm({ modalIsOpen: false })}
                  className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 mr-2 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => { handleConfirm() }}
                  className="bg-red-500 text-white rounded-lg py-2 px-4 hover:bg-red-600"
                >
                  {action}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto min-h-screen">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <div className="relative bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-68 p-6">
          <div className="flex justify-center items-center h-38 ">
            <div className="animate-pulse rounded-full h-14 w-14 border-4 border-primary-light border-green-500 "></div>
          </div>
        </div>
      </div>
    )
  }
};

export default ConfirmationBox;
