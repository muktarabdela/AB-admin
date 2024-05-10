import React, { createContext, useContext, useState } from 'react';

const stateContext = createContext()

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
}

export const ContextProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState(true)
    const [userModal, setUserModal] = useState({ isOpen: false, modalData: {} })
    //appointment modal state to updaate the appointment
    const [appointmentModal, setAppointmentModal] = useState({ isOpen: false, updateBody: {} })

    //property modal state to update the property
    const [PropertyModal, setPropertyModal] = useState({ isOpen: false, updateBody: {} })

    //property modal state to add the property
    const [AddPropertyModal, setAddPropertyModal] = useState({ isOpen: false, addBody: {} })

    //information modal state to add the info
    const [AddInfoModal, setAddInfoModal] = useState({ isOpen: false, addBody: {} })

    //user modal to show detail of user who has appointment
    const [user, setUser] = useState({ isOpen: false, modalId: "" })

    //confirmation state to confirm to delete or update data
    const [confirm, setConfirm] = useState({ modalIsOpen: false, modalType: 'data', action: "", isConfirmed: false, id: "", data: {} })

    //Property Modal to show details of appointed properties
    const [property, setProperty] = useState({ isOpen: false, propertyId: "" })

    //Property Modal to show details of appointed properties
    const [info, setInfo] = useState({ isOpen: false, infoId: "" })

    //Property Modal to show details of appointed properties
    const [infoModal, setInfoModal] = useState({ isOpen: false, updateBody: {} })
    //Property Modal to show details of saved property
    const [savedProperty, setSavedProperty] = useState({ isOpen: false, details: {} })
    //users Modal to show list of users who save a property
    const [usersSaved, setUsersSaved] = useState({ isOpen: false, users: [] })
    //state to  show succes or error message
    const [result, setResult] = useState({ isOpen: false, status: "", msg: "" })

    const [isClicked, setisClicked] = useState(initialState)
    const handleClick = (clicked) => {
        setisClicked({ ...initialState, [clicked]: true })
    }
    const [screenSize, setScreenSize] = useState(undefined)
    return (
        <stateContext.Provider
            value={{
                activeMenu, setActiveMenu,
                isClicked, setisClicked, handleClick,
                screenSize, setScreenSize,
                userModal, setUserModal,
                appointmentModal, setAppointmentModal,
                confirm, setConfirm, user,
                setUser, property, setProperty,
                setPropertyModal, PropertyModal,
                AddPropertyModal, setAddPropertyModal,
                info, setInfo,
                infoModal, setInfoModal,
                AddInfoModal, setAddInfoModal,
                usersSaved, setUsersSaved, savedProperty,
                result, setResult, setSavedProperty
            }}
        >
            {children}
        </stateContext.Provider>
    )
}

export const useStateContext = () => useContext(stateContext)