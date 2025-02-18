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
import { useNavigate } from 'react-router-dom'
import ApiService from '../../../../utils/axios'
import { localStorageKey, localStorageService } from '../../../../utils/localStorageService'
import fireNotif from '../../../../utils/fireNotif'

const MUserCreate = () => {
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [id_m_roles, setIdMRoles] = useState('')
  const [password, setPassword] = useState('')
  const [flag_active, setFlagActive] = useState(true)
  const [roles, setRoles] = useState([])
  const Navigate = useNavigate()
  const todoGetData = async () => {
    const resAPI = await ApiService.getDataJWT('/mRole?searchParam=flag_active&searchValue=true')
    setRoles(resAPI.data.data)
  }
  const todoSave = async () => {
    const userId = await localStorageService.getData(localStorageKey.user)
    const data = {
      first_name,
      last_name,
      username,
      email,
      id_m_roles,
      password,
      flag_active,
      user_id: userId.user.id,
    }
    const resAPi = await ApiService.postDataJWT('/mUser', data)
    if (resAPi.data.success) {
      fireNotif.notifSuccess('Successfully Create Data').then((resSwal) => {
        if (resSwal.isConfirmed) {
          Navigate('/masteruser')
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
        <CCardHeader>Form Create User</CCardHeader>
        <CCardBody>
          <CForm onSubmit={todoSave}>
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
            <CInputGroup className="mb-3">
              <CInputGroupText>Password</CInputGroupText>
              <CFormInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(val) => setPassword(val.target.value)}
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

export default MUserCreate
