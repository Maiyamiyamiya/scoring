import React, { useState, useRef } from 'react';
import { getDatabase, ref, set, push, remove, get, } from "firebase/database";
import { Link } from "react-router-dom"; 
import Swal from "sweetalert2";

import app from "../../firebaseConfig";


function Start() {
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [role, setRole] = useState(false);
  const [dasboard, setDasboard] = useState(true);
  const [selesai, setSelesai] = useState(false);


  // DARI PAPAN SCORE
  const [inputNilaiAKA, setInputNilaiAKA] = useState(0)
  const [inputNilaiAO, setInputNilaiAO] = useState(0)

  const [dataNilaiAKA, setDataNilaiAKA] = useState([]);
  const [dataNilaiAO, setDataNilaiAO] = useState([]);


  //DATA ATLET DARI FORM INPUT NAMA DAN KATA YANG DIMAINKAN
  const dataAtlet = {
    'nama': inputValue1,
    'kata': inputValue2
  }

  // SIMPAN DATA ATLET KE LOCAL STORAGE
  const dataAtletAO = ()=> localStorage.setItem('AO', JSON.stringify(dataAtlet));
  const dataAtletAKA = ()=> localStorage.setItem('AKA', JSON.stringify(dataAtlet));
  const nilaiCollection = {
    'aka': inputNilaiAKA,
    'ao': inputNilaiAO
  }
  const nilai = ()=> localStorage.setItem('nilai', JSON.stringify(nilaiCollection));

  const [dataAkaState, setDataAkaState] = useState([]);
  const [dataAoState, setDataAoState] = useState([]);

  // BUAT DATA SLUG KE FIREBASE -> SEBELUMNYA DI COMPONENT COUNTDOWN.JS
  const makeid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const slugAka = `${dataAtlet.nama}ID=${makeid(10)}`;
  const slugAo = `${dataAtlet.nama}ID=${makeid(10)}`;

  const saveDataSlugAka = async () => {
    setDataAkaState(dataAtlet);
      const db = getDatabase(app);
      const newDocRef = push(ref(db, "score/tatami4/slugAka"));
      set(newDocRef, {
        slug: slugAka
        }).then( () => {
          setInputValue1("");
          setInputValue2("");
        }).catch((error) => {
          alert("error: ", error.message);
        })
    }

     const saveDataSlugAo = async () => {
      setDataAoState(dataAtlet);
      const db = getDatabase(app);
      const newDocRef = push(ref(db, "score/tatami4/slugAo"));
      set(newDocRef, {
        slug: slugAo
        }).then( () => {
          setInputValue1("");
          setInputValue2("");
        }).catch((error) => {
          alert("error: ", error.message);
        })
    }

    const deleteSlug = async (slugId) => {
      const db = getDatabase(app);
      const dbRefAka = ref(db, "score/tatami4/slugAka");
      const dbRefAo = ref(db, "score/tatami4/slugAo");
      await remove(dbRefAka);
      await remove(dbRefAo);
    }


  // FETCH DATA SLUG
  const [dataSlugAka, setDataSlugAka] = useState([]);
  const [dataSlugAo, setDataSlugAo] = useState([]);

  const fetchDataSlugAka = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "score/tatami4/slugAka"); 
    const snapshot = await get(dbRef);
    if(snapshot.exists()) setDataSlugAka(Object.values(snapshot.val()));   
  }
  const fetchDataSlugAo = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "score/tatami4/slugAo"); 
    const snapshot = await get(dbRef);
    if(snapshot.exists()) setDataSlugAo(Object.values(snapshot.val()));   
  }


    // DARI PAPAN SCORE
    const fetchDataAKA = async () => {
          fetchDataSlugAka();
          if (dataSlugAka.length === 0) {
            Swal.fire("Nilai atlet masih kosong!");   
          } else {
            const db = getDatabase(app);
            const dbRef = ref(db, `score/tatami4/atlet=${dataSlugAka[0].slug}`)
            const snapshot = await get(dbRef);
            if(snapshot.exists()) {
              localStorage.setItem('Nilai AKA', JSON.stringify(Object.values(snapshot.val())));
              const nilaiAKA = JSON.parse(localStorage.getItem('Nilai AKA'));
              setDataNilaiAKA(nilaiAKA); 
            } else {
              Swal.fire("Nilai atlet masih kosong!");
            }
          }
        
      }

  const fetchDataAO = async () => {
      fetchDataSlugAo();
      if (dataSlugAo.length === 0) {
        Swal.fire("Nilai atlet masih kosong!");
      } else {        
        const db = getDatabase(app);
        const dbRef = ref(db, `score/tatami4/atlet=${dataSlugAo[0].slug}`); 
        const snapshot = await get(dbRef);
        if(snapshot.exists()) {
          localStorage.setItem('Nilai AO', JSON.stringify(Object.values(snapshot.val())));
          const nilaiAO = JSON.parse(localStorage.getItem('Nilai AO'));
          setDataNilaiAO(nilaiAO); 
        } else {
          Swal.fire("Nilai atlet masih kosong!");
        }
      }
    
  }


  const kalkulasiNilaiAKA = (data) => {
        const myNums = data.map((item, index) => {
              let res = []
              res.push(item.skorAtlet)
              return res
          })
        let sorted = myNums.slice().sort(function(a, b) {
          return a - b;
        });
        let sum = 0;
        for (let i = 1; i < sorted.length-1; i++ ) {
          sum += parseFloat(sorted[i]);
        }
        setInputNilaiAKA(sum.toFixed(2));
    }

    const kalkulasiNilaiAO = (data) => {
          const myNums = data.map((item, index) => {
              let res = []
              res.push(item.skorAtlet)
              return res
          })
          
          let sorted = myNums.slice().sort(function(a, b) {
            return a - b;
          });
          let sum = 0;
          for (let i = 1; i < sorted.length-1; i++ ) {
            sum += parseFloat(sorted[i]);
          }
          setInputNilaiAO(sum.toFixed(2));
    }


    const fetchData = () => {
      fetchDataAKA();
      fetchDataAO();
      kalkulasiNilaiAKA(dataNilaiAKA);
      kalkulasiNilaiAO(dataNilaiAO);
      nilai();
    }


      const selesaiFunction = () => {
              deleteSlug(); 
              setDasboard(true); 
              setRole(false); 
              setDataNilaiAKA([]); 
              setDataNilaiAO([]); 
              setInputNilaiAKA(0); 
              setInputNilaiAO(0);
              setDataSlugAka([]);
              setDataSlugAo([]);
              localStorage.clear();
              setSelesai(false);

      }

      const belumSelesaiFunction = () => {
              // kalkulasiNilaiAKA(dataNilaiAKA);
              // kalkulasiNilaiAO(dataNilaiAO);
              nilai();
              setSelesai(true);

      }


  // DARI COUNTDOWN
  //=============================================================================================
  const [sudah, setSudah] = useState(false);
  // We need ref in this, because we are dealing
  // with JS setInterval to keep track of it and
  // stop it when neede
  const Ref = useRef(null);
  // The state for our timer
  const [timer, setTimer] = useState("00:00");
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    // const hours = Math.floor(
    //  (total / 1000 / 60 / 60) % 24
    // );
    return {
      total,      
      minutes,
      seconds,
    };
  };
  const startTimer = (e) => {
    let { total, minutes, seconds } =
      getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(       
        (minutes > 9 ? minutes : "0" + minutes) + ":" + (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };
  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer('05:00');

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };
  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 300);
    return deadline;
  };
  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  // useEffect(() => {
  //  clearTimer(getDeadTime());
  // }, []);

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button
  const onClickReset = () => {
    clearTimer(getDeadTime());
  };
  //=============================================================================================



  return (
    dasboard ?
    role ?
    <div>
        
        <div style={{ 
          backgroundImage: `url(${require('./../../images/board.png')})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '100vh',
          justifyContent: 'center',
          alignContent: 'center',
          display: 'flex',
          flexDirection: 'row',
        }}>




          <div
            style={{

              justifyContent: 'center',
              alignContent: 'center',
              width: '100vw',
              height: '100vh',        }}

          >

            <h2 style={{
              marginTop: 120,
              fontSize: 40,
              paddingBottom: 30
            }}>PERTANDINGAN SELANJUTNYA!</h2>

            <text
            style={{
              fontStyle: "bold",
              fontSize: 20,
              margin: 15,
            }}
            >NAMA ATLET [AO]</text> <br />

            <input type="text"
            value={inputValue1} 
            style={{
              textColor: "#000",
              borderRadius: 30,
              height: 32,
              width: "80%",
              padding: 8,
              paddingLeft: 15,
              fontSize: 18,
              marginTop: 10,
              marginBottom: 15,
              borderColor:"aquamarine"
            }}
            onChange={(e) => setInputValue1(e.target.value)}/> <br />

            <text
            style={{
              fontStyle: "bold",
              fontSize: 20,
              margin: 15,
            }}
            >KATA YANG DIMAINKAN</text> <br />

            <input type='text' 
            value={inputValue2} 
            style={{
              textColor: "#000",
              borderRadius: 30,
              height: 32,
              width: "80%",
              padding: 8,
              paddingLeft: 15,
              fontSize: 18,
              marginTop: 10,
              marginBottom: 15,
              borderColor:"aquamarine"
            }}
            onChange={(e) => setInputValue2(e.target.value)}/> <br />



            <button 
            style={{
              borderRadius: 30,
              height: 48,
              width: 'auto',
              marginTop: 15,
              border: 0,
              padding: 15,
              cursor: 'pointer'
            }}
            onClick={()=>{dataAtletAO(); setDasboard(false); saveDataSlugAo();}}
            className='button1' >MAINKAN AO!</button>


          </div>

          <div
            style={{

              backgroundImage: `url(${require('./../../images/karate.jpg')})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              justifyContent: 'center',
              alignContent: 'center',
              width: '100vw',
              height: '100vh'
            }}

          >
            <h1>BUPATI CUP 3 LOMBOK TENGAH</h1>
            <Link to='/users'
            style={{marginBottom: 0, fontSize: 22}}
          >
              PROFILE
          </Link>

          </div>
            
        </div>


    </div>


    :


    <div>

        <div style={{ 
          backgroundImage: `url(${require('./../../images/board.png')})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '100vh',
          justifyContent: 'center',
          alignContent: 'center',
          display: 'flex',
          flexDirection: 'row',
          // width: '100vw'
        }}>
          <div
            style={{

              backgroundImage: `url(${require('./../../images/karate.jpg')})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              justifyContent: 'center',
              alignContent: 'center',
              width: '100vw',
              height: '100vh'
            }}

          >
            <h1>BUPATI CUP 3 LOMBOK TENGAH</h1>
          <Link to='/users'
            style={{marginBottom: 0, fontSize: 22}}
          >
              PROFILE
          </Link>
          </div>

          <div
            style={{

              justifyContent: 'center',
              alignContent: 'center',
              width: '100vw',
              height: '100vh'
            }}

          >

            <h2 style={{
              marginTop: 120,
              fontSize: 40,
              paddingBottom: 30
            }}>PERTANDINGAN SELANJUTNYA!</h2>

            <text
            style={{
              fontStyle: "bold",
              fontSize: 20,
              margin: 15,
            }}
            >NAMA ATLET [AKA]</text> <br />

            <input type="text"
            value={inputValue1} 
            style={{
              textColor: "#000",
              borderRadius: 30,
              height: 32,
              width: "80%",
              padding: 8,
              paddingLeft: 15,
              fontSize: 18,
              marginTop: 10,
              marginBottom: 15,
              borderColor:"aquamarine"
            }}
            onChange={(e) => setInputValue1(e.target.value)}/> <br />

            <text
            style={{
              fontStyle: "bold",
              fontSize: 20,
              margin: 15,
            }}
            >KATA YANG DIMAINKAN</text> <br />

            <input type='text' 
            value={inputValue2} 
            style={{
              textColor: "#000",
              borderRadius: 30,
              height: 32,
              width: "80%",
              padding: 8,
              paddingLeft: 15,
              fontSize: 18,
              marginTop: 10,
              marginBottom: 15,
              borderColor:"aquamarine"
            }}
            onChange={(e) => setInputValue2(e.target.value)}/> <br />



            <button 
            style={{
              borderRadius: 30,
              height: 48,
              width: 'auto',
              marginTop: 15,
              border: 0,
              padding: 15,
              cursor: 'pointer'
            }}
            onClick={()=>{dataAtletAKA(); setRole(true); saveDataSlugAka();}}
            className='button1' >MAINKAN AKA!</button>


          </div>
        

        </div>



    </div>


    :


    <div style={{ 
      backgroundImage: `url(${require('./../../images/board.png')})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '100vh',
      justifyContent: 'center',
      alignContent: 'center',
      alignItem: 'center',
    }}>


      <h1 style={{
        color: "#FFF",
        fontSize: 40,
        marginLeft: 100,
        marginRight: 100,
        paddingTop: 10,
        fontFamily: `'Anton', 'sans-serif'`,
        fontWeight: 400,
        fontStyle: 'normal',
      }}>DASBOARD ADMIN NATIONAL OPEN KARATE CHAMPIONSHIP BUPATI CUP 3 2024</h1>        
       

      <div style={{
        color: '#FFF',
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'center',
        alignContent: 'center'
      }}>
        <div style={{ flex: 1}}>
          <h1 style={{fontSize: 50}}>AO</h1>
          <h2>{dataAoState.length === 0 ? <text>-</text> : dataAoState.nama}</h2>
          <h2>{dataAoState.length === 0 ? <text>-</text> : dataAoState.kata}</h2>
          <h1 style={{fontSize: 60}}>{inputNilaiAO}</h1>
        </div>


        

      



          {
          <div>
      
      <h1 style={{ color: "#FFF", fontSize: 36 }}>
        {"SISA WAKTU"}
      </h1>
      {
        sudah?
        <button 
        style={{
              borderRadius: 15,
              height: 32,
              width: 72,
              border: 0,
              fontStyle: 'Trebuchet MS',
              fontWeight: 'bolder',
              backgroundColor: '#000',
              color: '#FFF',
              opacity: 0.7,
              cursor: 'pointer',

            }}
            onClick={()=> {clearTimer(); 
              setSudah(false); 
              localStorage.removeItem('time');}}
            >
              RESET
        </button> 


        :

        
        <button 
        style={{
              borderRadius: 15,
              height: 32,
              width: 72,
              border: 0,
              fontStyle: 'Trebuchet MS',
              fontWeight: 'bolder',
              backgroundColor: '#000',
              color: '#FFF',
              opacity: 0.7,
              cursor: 'pointer'
            }}
        onClick={()=>{onClickReset(); 
          setSudah(true); 
          localStorage.setItem('time', JSON.stringify('start'));
        }}>MULAI</button> 
      }


      <h1 style={{fontSize: 46, color: '#FFF'}}>{timer}</h1>
      
      
    </div>
        }



        <div style={{flex: 1}}>
          <h1 style={{fontSize: 50}}>AKA</h1>
          <h2>{dataAkaState.length === 0 ? <text>-</text> : dataAkaState.nama}</h2>
          <h2>{dataAkaState.length === 0 ? <text>-</text> : dataAkaState.kata}</h2>
          <h1 style={{fontSize: 60}}>{inputNilaiAKA}</h1>

        </div>

        


      </div>

      
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >

              <div style={{
                  listStyle: "none",
                  MozColumnCount: 4,
                  MozColumnGap: '20px',
                  WebkitColumnCount: 4,
                  WebkitColumnGap: '20px',
                  columnCount: 4,
                  columnGap: '20px',
                  marginBottom: 0,
                  marginRight: 180,
                  color: '#FFF',
                  justifyContent: 'left',
                  }}>
                  {
                      dataNilaiAO.map((item, index)=>(
                        <text key={index} style={{fontSize: 12}}> 
                          {item.juri.substring(0,5)} <br/> Skor: {item.skorAtlet} <br/>
                        </text>
                      ))
                  }

              </div>

              <div style={{
                  MozColumnCount: 4,
                  MozColumnGap: '20px',
                  WebkitColumnCount: 4,
                  WebkitColumnGap: '20px',
                  columnCount: 4,
                  columnGap: '20px',
                  marginBottom: 0,
                  color: '#FFF',
                  justifyContent: 'right',
                  }}>
                  {
                      dataNilaiAKA.map((item, index)=>(
                        <text key={index} style={{fontSize: 12}}> 
                            {item.juri.substring(0,5)} <br/> Skor: {item.skorAtlet} <br/>
                        </text>

                      ))
                  }
               </div>

            </div>

            <button 
          style={{
            borderRadius: 15,
            height: 48,
            width: "15%",
            border: 0,
            color: '#FFF',
            cursor: 'pointer'
          }}
          className='button1'
          onClick={fetchData}
          > UPDATE SKOR </button> <br/>


      <button 
          style={{
            borderRadius: 15,
            marginTop: 15,
            height: 48,
            width: "15%",
            border: 0,
            color: '#FFF',
            cursor: 'pointer'
          }}
          className='button1'
          onClick={
            selesai ? selesaiFunction : belumSelesaiFunction
          }
          > {selesai? 'PERTANDINGAN SELESAI' : 'TAMPILKAN SKOR'} </button>



    </div>
  )
}

export default Start;