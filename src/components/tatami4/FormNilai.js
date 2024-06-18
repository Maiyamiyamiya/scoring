import React, {useState, } from 'react';
import { getDatabase, ref, set, push, get } from "firebase/database";
import Swal from "sweetalert2";
import { Link } from "react-router-dom"; 


import app from "../../firebaseConfig";
import { useUserAuth } from "../../context/UserAuthContext";




function FormNilai() {

  const { user } = useUserAuth();


  const [inputValue3, setInputValue3] = useState("");
  const [siap, setSiap] = useState(false);
  const [isAkaAo, setIsAkaAo] = useState(true);
  // FETCH DATA SLUG
  let [dataSlugAka, setDataSlugAka] = useState([]);
  let [dataSlugAo, setDataSlugAo] = useState([]);

  const saveDataAka = async () => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, `score/tatami4/atlet=${dataSlugAka[0].slug}`));
    set(newDocRef, {
      skorAtlet: inputValue3,
      juri: user.email
    }).then( () => {
      setSiap(false);
      Swal.fire("Nilai berhasil di submit!");
    }).catch((error) => {
      alert("error: ", error.message);
    })
  }

  const saveDataAo = async () => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, `score/tatami4/atlet=${dataSlugAo[0].slug}`));
    set(newDocRef, {
      skorAtlet: inputValue3,
      juri: user.email
    }).then( () => {
      setSiap(false);
      Swal.fire("Nilai berhasil di submit!");
    }).catch((error) => {
      alert("error: ", error.message);
    })
  }


  const fetchDataSlugAka = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "score/tatami4/slugAka"); 
    const snapshot = await get(dbRef);
    if(snapshot.exists()) {
      setDataSlugAka(Object.values(snapshot.val()));   
      setSiap(true);
      setIsAkaAo(true);
      setInputValue3("");
    } else {
      Swal.fire("Anda belum bisa memberi nilai!");
    }
  }

  const fetchDataSlugAo = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "score/tatami4/slugAo"); 
    const snapshot = await get(dbRef);
    if(snapshot.exists()) {
      setDataSlugAo(Object.values(snapshot.val()));   
      setSiap(true);
      setIsAkaAo(false);
      setInputValue3("");
    } else {
      Swal.fire("Anda belum bisa memberi nilai!");
    }
  }


  return (
    siap?
      isAkaAo?
          <div
            style={{
              backgroundImage: `url(${require('./../../images/karate.jpg')})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              justifyContent: 'center',
              alignContent: 'center',
              alignItem: 'center',
              height: '100vh',
              width: '100vw'
            }}
          >
          
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
            }}>NATIONAL OPEN KARATE CHAMPIONSHIP BUPATI CUP 3 2024</h1>


            <h2 style={{
                margin: 0, 
                color: '#fc1e31', 
                padding: 10,
                webkitTextStrokeWidth: '1px',
                webkitTextStrokeColor: '#fff',
                fontFamily: `'Anton', 'sans-serif'`,
                fontWeight: 400,
                fontSize: 35,
                fontStyle: 'normal',
            }}>PENILAIAN KATA KARATE OLEH JURI</h2>

            <text
            style={{
              margin: 0, 
              color: '#fc1e31', 
              padding: 10,
              webkitTextStrokeWidth: '1px',
              webkitTextStrokeColor: '#fff',
              fontFamily: `'Anton', 'sans-serif'`,
              fontWeight: 400,
              fontSize: 25,
              fontStyle: 'normal',            
            }}
            >SKOR ATLET AKA</text> 

            <br />


            <input type='number' 
            value={inputValue3}
            style={{
              textColor: "#000",
              borderRadius: 30,
              height: 32,
              width: "auto",
              padding: 8,
              paddingLeft: 15,
              fontSize: 18,
              borderColor:"aquamarine",
              margin: 30
            }} 
            onChange={(e) => setInputValue3(e.target.value)}/> 

            <br/>

            <button 
            style={{
              borderRadius: 30,
              height: 48,
              width: "70%",
              marginTop: 15,
              border: 0,
              padding: 15,
              cursor: 'pointer'
            }}
            className='button1' onClick={()=>{saveDataAka();}}>SIMPAN PENILAIAN</button>

            <button 
            style={{
              borderRadius: 30,
              height: 48,
              width: "70%",
              marginTop: 15,
              border: 0,
              padding: 15,
              cursor: 'pointer',
              backgroundColor: 'red'
            }}
            className='button1' onClick={()=>{setSiap(false);}}>BATALKAN PENILAIAN</button>

          
          </div>
        :
          <div
            style={{
              backgroundImage: `url(${require('./../../images/karate.jpg')})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              justifyContent: 'center',
              alignContent: 'center',
              alignItem: 'center',
              height: '100vh',
              width: '100vw'
            }}
          >

            <h1 style={{
                margin: 0, 
                color: '#1d6ef0', 
                padding: 10,
                webkitTextStrokeWidth: '1px',
                webkitTextStrokeColor: '#fff',
                fontFamily: `'Anton', 'sans-serif'`,
                fontWeight: 400,
                fontSize: 40,
                fontStyle: 'normal',
            }}>NATIONAL OPEN KARATE CHAMPIONSHIP BUPATI CUP 3 2024</h1>


            <h2 style={{
                margin: 0, 
                color: '#1d6ef0', 
                padding: 10,
                webkitTextStrokeWidth: '1px',
                webkitTextStrokeColor: '#fff',
                fontFamily: `'Anton', 'sans-serif'`,
                fontWeight: 400,
                fontSize: 35,
                fontStyle: 'normal',
            }}>PENILAIAN KATA KARATE OLEH JURI</h2>

            <text
            style={{
              margin: 0, 
              color: '#1d6ef0', 
              padding: 10,
              webkitTextStrokeWidth: '1px',
              webkitTextStrokeColor: '#fff',
              fontFamily: `'Anton', 'sans-serif'`,
              fontWeight: 400,
              fontSize: 25,
              fontStyle: 'normal',            
            }}
            >SKOR ATLET AO</text> 

            <br />


            <input type='number' 
            value={inputValue3}
            style={{
              textColor: "#000",
              borderRadius: 30,
              height: 32,
              width: "auto",
              padding: 8,
              paddingLeft: 15,
              fontSize: 18,
              borderColor:"aquamarine",
              margin: 30
            }} 
            onChange={(e) => setInputValue3(e.target.value)}/> 

            <br/>

            <button 
            style={{
              borderRadius: 30,
              height: 48,
              width: "70%",
              marginTop: 15,
              border: 0,
              padding: 15,
              cursor: 'pointer'
            }}
            className='button1' onClick={()=>{saveDataAo();}}>SIMPAN PENILAIAN</button>

            <button 
            style={{
              borderRadius: 30,
              height: 48,
              width: "70%",
              marginTop: 15,
              border: 0,
              padding: 15,
              cursor: 'pointer',
              backgroundColor: 'red'
            }}
            className='button1' onClick={()=>{setSiap(false);}}>BATALKAN PENILAIAN</button>

          
          </div>

    :

      <div style={{
          backgroundImage: `url(${require('./../../images/karate.jpg')})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          justifyContent: 'center',
          alignContent: 'center',
          alignItem: 'center',
          height: '100vh',
          width: '100vw'

      }}>

      <div>

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
        }}>NATIONAL OPEN KARATE CHAMPIONSHIP BUPATI CUP 3 2024</h1>

          <h2 style={{padding: 15, 
            color: '#fc1e31',
            webkitTextStrokeWidth: '0.1px',
            webkitTextStrokeColor: '#fff',

          }}>
              Silakan berikan nilai dengan cara tekan tombol di bawah ini.
          </h2>
      </div>

          <br/>


          <div>

            <button 
              style={{
                borderRadius: 30,
                height: 48,
                width: "70%",
                border: 0,
                padding: 15,
                cursor: 'pointer',
                margin: 10,
                backgroundColor: 'red'
              }}
              className='button1' onClick={fetchDataSlugAka}>
                  PENILAIAN AKA
            </button>

            <br/>
            <button 
              style={{
                borderRadius: 30,
                height: 48,
                width: "70%",
                border: 0,
                padding: 15,
                cursor: 'pointer',
                margin: 10,
                backgroundColor: 'blue',
              }}
              className='button1' onClick={fetchDataSlugAo}>
                  PENILAIAN AO
            </button>


          </div>

          <Link to='/users'
            style={{marginBottom: 0}}
          >
              PROFILE
          </Link>

      </div>
  )
}

export default FormNilai;