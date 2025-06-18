import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogInContext from '../context/LogInContext';

const UserProfile = () => {
  const [userDetail, setUserDetail] = useState([]);
  const {LoginData} = useContext(LogInContext)
  
  const { setUsernameUpdate } = LoginData; 
  
  const fetchUser = async () => {
    // console.log("LoginData: ", LoginData)
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${LoginData.userId}`);
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

  const [usernameError, setUsernameError] = useState('');
  const usernameRegex = /^[a-zA-Z0-9]{5,16}$/;

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!usernameError ) {
      try{
        await axios.put(`http://localhost:8080/api/users/${LoginData.userId}`,userDetail);
        
        // cập nhật username trong context
        setUsernameUpdate(userDetail.username);
        
        // cập nhật localStorage
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ 
            username: userDetail.username, 
            id: LoginData.userId, 
            loginState: LoginData.loginState 
          })
        );
        
        navigate("/")
      }catch(error){
        console.log(error);
      }
      console.log('Hồ sơ đã được cập nhật: ', userDetail);
      // Submit form data
    } else {
      alert('Vui lòng kiểm tra lại thông tin hồ sơ.');
    }
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUserDetail({
      ...userDetail,
      username: value
    });
    if (!usernameRegex.test(value)) {
      setUsernameError('Tên đăng nhập phải từ 5 đến 16 ký tự và chỉ được bao gồm chữ cái và chữ số.');
    } else if (value.toLowerCase() === 'username') {
      setUsernameError('Username không được là "Username"');
    } else {
      setUsernameError('');
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
      <h1 className="text-center text-secondary mb-4">Chỉnh sửa hồ sơ</h1>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label">Tên người dùng:</label>
          <input
            type="text"
            className="form-control"
            value={userDetail?.username || ''}
            onChange={handleUsernameChange}
          />
          {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Họ và tên:</label>
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
          <label className="form-label">Số điện thoại:</label>
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
        <label className="form-label">Địa chỉ:</label>
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
          <label className="form-label">Giới tính</label>
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
              Nam
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
              Nữ
            </label>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={handleCancel}
          className="btn btn-outline-secondary me-2"
        >
          Hủy
        </button>
        <button type="submit" className="btn" style={{
            background: "#871C1C",
            color: "#fff"}}>
          Lưu thay đổi
        </button>
      </div>
    </form>
  );
};

export default UserProfile;

