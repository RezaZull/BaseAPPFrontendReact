import React, { useEffect, useState } from 'react'
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
  CFormSwitch,
} from '@coreui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import ApiService from '../../../../utils/axios'
import fireNotif from '../../../../utils/fireNotif'

const MMenuUpdate = () => {
  const [name, setName] = useState('')
  const [route, setRoute] = useState('')
  const [description, setDescription] = useState('')
  const [flag_active, setFlagActive] = useState(true)
  const Navigate = useNavigate()
  const location = useLocation()
  const todoUpdate = async (e) => {
    e.preventDefault()
    const id = location.state.id
    const data = {
      name,
      route,
      description,
      flag_active,
    }
    const resAPi = await ApiService.updateDataJWT(`/mMenu/${id}`, data)
    if (resAPi.data.success) {
      fireNotif.notifSuccess('Successfully Update Data').then((resSwal) => {
        if (resSwal.isConfirmed) {
          Navigate('/mastermenu')
        }
      })
    }
  }

  useEffect(() => {
    const todoGetData = async () => {
      const id = location.state.id
      const resAPI = await ApiService.getDataJWT(`/mMenu/${id}`)
      const data = resAPI.data.data
      setName(data.name)
      setRoute(data.route)
      setDescription(data.description)
      setFlagActive(data.flag_active)
    }
    todoGetData()
  }, [location.state.id])

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Form Update Menu</CCardHeader>
        <CCardBody>
          <CForm onSubmit={todoUpdate}>
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
            <CFormSwitch
              className="mb-3"
              label="Active"
              checked={flag_active}
              size="lg"
              onChange={(val) => setFlagActive(val.target.checked)}
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

export default MMenuUpdate
