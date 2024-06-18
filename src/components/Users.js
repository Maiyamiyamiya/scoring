import React from "react";
import { useNavigate } from "react-router"; 
import { useUserAuth } from "../context/UserAuthContext";

const Users = () => {

  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };


  const handleRedirect = (role) => {
    if(role === 'admin@tatami1.com'){
      navigate('/tatami1/admin');
    } else if(role === 'admin@tatami2.com'){
      navigate('/tatami2/admin')
    } else if(role === 'admin@tatami3.com') {
      navigate('/tatami3/admin')
    } else if(role === 'admin@tatami4.com'){
      navigate('/tatami4/admin')
    } else if(role === 'juri1@tatami1.com' || role === 'juri2@tatami1.com' || role === 'juri3@tatami1.com' ||
        role === 'juri4@tatami1.com' || role === 'juri5@tatami1.com' || role === 'juri6@tatami1.com' || 
        role === 'juri7@tatami1.com'
      ) {
      navigate('/tatami1/juri')
    } else if(role === 'juri1@tatami2.com' || role === 'juri2@tatami2.com' || role === 'juri3@tatami2.com' ||
        role === 'juri4@tatami2.com' || role === 'juri5@tatami2.com' || role === 'juri6@tatami2.com' || 
        role === 'juri7@tatami2.com'
      ) {
      navigate('/tatami2/juri')
    } else if(role === 'juri1@tatami3.com' || role === 'juri2@tatami3.com' || role === 'juri3@tatami3.com' ||
        role === 'juri4@tatami3.com' || role === 'juri5@tatami3.com' || role === 'juri6@tatami3.com' || 
        role === 'juri7@tatami3.com'
      ){
      navigate('/tatami3/juri')
    } else {
      navigate('/tatami4/juri')
    }
  }

  const openScoringBoard = (role) => {
    if(role === 'admin@tatami1.com'){
      navigate('/tatami1/papan-score');
    } else if(role === 'admin@tatami2.com'){
      navigate('/tatami2/papan-score')
    } else if(role === 'admin@tatami3.com') {
      navigate('/tatami3/papan-score')
    } else if('/tatami4/papan-score'){
      navigate('/tatami4/papan-score')
    }
  }



  return (
    <div 
        style={{
          backgroundImage: `url(${require('./../images/karate.jpg')})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          justifyContent: 'center',
          alignContent: 'center',
          alignItem: 'center',
          height: '100vh',
          width: '100vw'
        }}
    >
      <div className="p-4 box mt-3 text-center">
        <h1 style={{
            margin: 0, 
            color: '#fc1e31', 
            padding: 10,
            webkitTextStrokeWidth: '1px',
            webkitTextStrokeColor: '#fff',
            fontFamily: `'Anton', 'sans-serif'`,
            fontWeight: 400,
            fontSize: 40,
            fontStyle: 'normal',
        }}>SELAMAT DATANG JUNJUNG TINGGI SPORTIVITAS!</h1> <br />
        {user && user.email}
      </div>


      <div className="d-grid gap-2">
        <button variant="primary" 
        className="button1"
            type="Submit"
            style={{
              borderRadius: 30,
              height: 48,
              width: "70%",
              marginTop: 15,
              border: 0,
              padding: 15,
              cursor: 'pointer'
            }}

        onClick={()=> handleRedirect(user.email)}>
          MULAI PERTANDINGAN
        </button>
      </div>
      
      {
        user.email === 'admin@tatami1.com' || user.email === 'admin@tatami2.com' || user.email === 'admin@tatami3.com' || user.email === 'admin@tatami4.com' ?
          <div className="d-grid gap-2">
              <button variant="primary" 
              className="button1"
                  type="Submit"
                  style={{
                    borderRadius: 30,
                    height: 48,
                    width: "70%",
                    marginTop: 15,
                    border: 0,
                    padding: 15,
                    cursor: 'pointer',
                    backgroundColor: '#d65d24',
                    opacity: 0.9,
                  }}

              onClick={()=> openScoringBoard(user.email)}>
                BUKA PAPAN SCORE
              </button>
            </div>
            :
            <text></text>
      }



        <div className="d-grid gap-2">
        <button variant="primary" 
        className="button1"
            type="Submit"
            style={{
              borderRadius: 30,
              height: 48,
              width: "70%",
              marginTop: 15,
              border: 0,
              padding: 15,
              cursor: 'pointer',
              backgroundColor: 'red',
              opacity: 0.9,
            }}

        onClick={handleLogout}>
          KELUAR APLIKASI
        </button>
      </div>

    
      
    </div>
  );
};

export default Users;