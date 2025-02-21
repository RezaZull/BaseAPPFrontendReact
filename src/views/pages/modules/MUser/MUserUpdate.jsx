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
  CFormSelect,
} from '@coreui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import ApiService from '../../../../utils/axios'
import { localStorageKey, localStorageService } from '../../../../utils/localStorageService'
import fireNotif from '../../../../utils/fireNotif'

const MUserUpdate = () => {
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [id_m_roles, setIdMRoles] = useState('')
  const [flag_active, setFlagActive] = useState(true)
  const [roles, setRoles] = useState([])
  const Navigate = useNavigate()
  const location = useLocation()
  const todoUpdate = async (e) => {
    e.preventDefault()
    const id = location.state.id
    const userId = await localStorageService.getData(localStorageKey.user)
    const data = {
      first_name,
      last_name,
      username,
      email,
      id_m_roles,
      flag_active,
      user_id: userId.user.id,
      user_id: userId.user.id,
    }
    const resAPi = await ApiService.updateDataJWT(`/mUser/${id}`, data)
    console.log(resAPi)
    if (resAPi.data.success) {
      fireNotif.notifSuccess('Successfully Update Data').then((resSwal) => {
        if (resSwal.isConfirmed) {
          Navigate('/masteruser')
        }
      })
    }
  }

  useEffect(() => {
    const todoGetData = async () => {
      const id = location.state.id
      const resAPI = await ApiService.getDataJWT(`/mUser/${id}`)
      const data = resAPI.data.data
      const resAPIRole = await ApiService.getDataJWT(
        '/mRole?searchParam=flag_active&searchValue=true',
      )
      setRoles(resAPIRole.data.data)
      setFirstName(data.first_name)
      setLastName(data.last_name)
      setUsername(data.username)
      setEmail(data.email)
      setIdMRoles(data.id_m_roles)
      setFlagActive(data.flag_active)
    }
    todoGetData()
  }, [location.state.id])

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Form Update User</CCardHeader>
        <CCardBody>
          <CForm onSubmit={todoUpdate}>
            <CInputGroup className="mb-3">
              <CInputGroupText>First Name</CInputGroupText>
              <CFormInput
                type="text"
                placeholder="First Name"
                value={first_name}
                onChange={(val) => setFirstName(val.target.value)}
                required
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>Last Name</CInputGroupText>
              <CFormInput
                type="text"
                placeholder="Last Name"
                value={last_name}
                onChange={(val) => setLastName(val.target.value)}
                required
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>Username</CInputGroupText>
              <CFormInput
                type="text"
                placeholder="Username"
                value={username}
                onChange={(val) => setUsername(val.target.value)}
                required
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>@</CInputGroupText>
              <CFormInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(val) => setEmail(val.target.value)}
                required
              />
            </CInputGroup>
            <CFormSelect
              className="mb-3"
              aria-label="Roles"
              value={id_m_roles}
              onChange={(val) => setIdMRoles(val.target.value)}
            >
              {roles.map((data, idx) => {
                return (
                  <option key={idx} value={data.id}>
                    {data.name}
                  </option>
                )
              })}
            </CFormSelect>
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

export default MUserUpdate
