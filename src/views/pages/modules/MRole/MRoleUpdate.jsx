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
  CFormSwitch,
} from '@coreui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import ApiService from '../../../../utils/axios'
import { localStorageKey, localStorageService } from '../../../../utils/localStorageService'
import fireNotif from '../../../../utils/fireNotif'

const MRoleUpdate = () => {
  const [name, setName] = useState('')
  const Navigate = useNavigate()
  const [flag_active, setFlagActive] = useState(true)
  const location = useLocation()
  const todoGetData = async () => {
    const id = location.state.id
    const resAPI = await ApiService.getDataJWT(`/mRole/${id}`)
    const data = resAPI.data.data
    setName(data.name)
  }
  const todoUpdate = async () => {
    const id = location.state.id
    const userId = await localStorageService.getData(localStorageKey.user)
    const data = {
      name,
      flag_active,
      user_id: userId.user.id,
    }
    const resAPi = await ApiService.updateDataJWT(`/mRole/${id}`, data)
    console.log(resAPi)
    if (resAPi.data.success) {
      fireNotif.notifSuccess('Successfully Update Data').then((resSwal) => {
        if (resSwal.isConfirmed) {
          Navigate('/masterrole')
        }
      })
    }
  }

  useEffect(() => {
    todoGetData()
  }, [])

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Form Update Role</CCardHeader>
        <CCardBody>
          <CForm onSubmit={todoUpdate}>
            <CInputGroup className="mb-3">
              <CInputGroupText>Name</CInputGroupText>
              <CFormInput
                type="text"
                placeholder="Role Name"
                value={name}
                onChange={(val) => setName(val.target.value)}
                required
              />
            </CInputGroup>
            <CFormSwitch
              className="mb-3"
              label="Active"
              value={flag_active}
              size="lg"
              onChange={(val) => setFlagActive(val.target.checked)}
              defaultChecked={flag_active}
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

export default MRoleUpdate
