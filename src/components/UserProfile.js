import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogInContext from '../context/LogInContext';
const UserProfile = () => {
  const [userDetail, setUserDetail] = useState([]);
  const {LoginData} = useContext(LogInContext)
  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${LoginData.username}`);
      setUserDetail(response.data); 
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    if (LoginData.username) { 
      fetchUser();
    }
  }, [LoginData.username]); 
  const [resetPassword, setResetPassword] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [usernameError, setUsernameError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const usernameRegex = /^[a-zA-Z0-9]{5,16}$/;
  const passwordRegex = /^[a-zA-Z0-9_!@#\$%\^&\*]{6,20}$/;

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!usernameError && !newPasswordError && !confirmPasswordError) {
      if(confirmPasswordError !== null){
        try{
          await axios.put(`http://localhost:8080/api/users/${LoginData.username}`,userDetail);
          navigate("/")
        }catch(error){
          console.log(error);
        }
      }
      console.log('Profile updated successfully');
      // Submit form data
    } else {
      alert('Please correct the errors before submitting');
    }
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUserDetail({
      ...userDetail,
      username: value
    });
    if (!usernameRegex.test(value)) {
      setUsernameError('Username should be 5-16 characters and only include letters and numbers.');
    } else if (value.toLowerCase() === 'username') {
      setUsernameError('Username cannot be "Username"');
    } else {
      setUsernameError('');
    }
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setResetPassword((prevState) => ({
      ...prevState,
      newPassword: value
    }));
    
    if (!passwordRegex.test(value)) {
      setNewPasswordError('Password should be 6-20 characters and include letters, numbers, or special characters.');
    } else {
      setNewPasswordError('');
    }
  };
  
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    
    setResetPassword((prevState) => ({
      ...prevState,
      confirmPassword: value
    }));
    
    if (value !== resetPassword.newPassword) {
      setConfirmPasswordError('Passwords do not match.');
    } else {
      setConfirmPasswordError('');
      setUserDetail((prevState) => ({
        ...prevState,
        password: value
      }));
      console.log(userDetail);
    }
  };  

  const handleGenderChange = (e) => {
    setUserDetail({
      ...userDetail,
      gender: e.target.value
    });
    console.log(userDetail)
  };
  
  const navigate = useNavigate();
  const handleCancel = () =>{
    navigate("/");
  }
  return (
    <form
      onSubmit={handleUpdate}
      className="container bg-light rounded shadow-sm p-4 mt-5"
    >
      <h1 className="text-center text-secondary mb-4">Edit Your Profile</h1>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            value={userDetail?.username || ''}
            onChange={handleUsernameChange}
          />
          {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Full Name:</label>
          <input
            type="text"
            className="form-control"
            value={userDetail?.fullname || ''}
            onChange={(e) => {
              setUserDetail({
                ...userDetail,
                fullname: e.target.value
              });
            }}
          />
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label">Phone:</label>
          <input
            type="text"
            className="form-control"
            value={userDetail?.phonenumber || ''}
            onChange={(e) => {
              setUserDetail({
                ...userDetail,
                phonenumber: e.target.value
              });
            }}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email:</label>
          <input
            type="text"
            className="form-control"
            value={userDetail?.email || ''}
            onChange={(e) => {
              setUserDetail({
                ...userDetail,
                email: e.target.value
              });
            }}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Address:</label>
        <input
          type="text"
          className="form-control"
          value={userDetail?.address || ''}
          onChange={(e) => {
            setUserDetail({
              ...userDetail,
              address: e.target.value
            });
          }}
        />
      </div>

      <div className="row mb-3">
        <div className="col-md-12">
          <label className="form-label">Gender</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="Male"
              checked={userDetail.gender === 'Male'}
              id="genderMale"
              onChange={handleGenderChange}
            />
            <label className="form-check-label" htmlFor="genderMale">
              Male
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="Female"
              checked={userDetail.gender === 'Female'}
              id="genderFemale"
              onChange={handleGenderChange}
            />
            <label className="form-check-label" htmlFor="genderFemale">
              Female
            </label>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label">Password Change:</label>
        <input
          type="password"
          placeholder="New Password"
          className="form-control mb-2"
          value={resetPassword.newPassword}
          onChange={handleNewPasswordChange}
        />
        {newPasswordError && <p style={{ color: 'red' }}>{newPasswordError}</p>}
        <input
          type="password"
          placeholder="Confirm Password"
          className="form-control"
          value={resetPassword.confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {confirmPasswordError && <p style={{ color: 'red' }}>{confirmPasswordError}</p>}
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={handleCancel}
          className="btn btn-outline-secondary me-2"
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default UserProfile;

