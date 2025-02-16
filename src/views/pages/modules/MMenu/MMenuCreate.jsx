import React, { useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CButton,
  CFormTextarea,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import ApiService from '../../../../utils/axios'
import { localStorageKey, localStorageService } from '../../../../utils/localStorageService'
import fireNotif from '../../../../utils/fireNotif'

const MMenuCreate = () => {
  const [name, setName] = useState('')
  const [route, setRoute] = useState('')
  const [description, setDescription] = useState('')
  const Navigate = useNavigate()
  const todoSave = async () => {
    const userId = await localStorageService.getData(localStorageKey.user)
    const data = {
      name,
      route,
      description,
      user_id: userId.user.id,
    }
    const resAPi = await ApiService.postDataJWT('/mMenu', data)
    console.log(resAPi)
    if (resAPi.data.success) {
      fireNotif.notifSuccess('Successfully Create Data').then((resSwal) => {
        if (resSwal.isConfirmed) {
          Navigate('/mastermenu')
        }
      })
    }
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Form Create Menu</CCardHeader>
        <CCardBody>
          <CForm onSubmit={todoSave}>
            <CInputGroup className="mb-3">
              <CInputGroupText>Name</CInputGroupText>
              <CFormInput
                type="text"
                placeholder="Menu Name"
                value={name}
                onChange={(val) => setName(val.target.value)}
                required
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>Route</CInputGroupText>
              <CFormInput
                type="text"
                placeholder="Menu Route"
                value={route}
                onChange={(val) => setRoute(val.target.value)}
                required
              />
            </CInputGroup>
            <CFormTextarea
              className="mb-3"
              label="Menu Description"
              value={description}
              onChange={(val) => setDescription(val.target.value)}
              required
            />
            <CButton type="submit" color="primary">
              Submit
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  )
}

export default MMenuCreate
