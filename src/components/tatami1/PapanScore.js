import React, {useState, useEffect, useRef} from 'react';

import logoBupati from './../../images/bupati.png';
import logoForki from './../../images/forki.png';
import logoKab from './../../images/logo_loteng.png';
import logoO2sn from './../../images/o2sn.png';

function PapanScore() {

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


  const [dataAtletAKA, setDataAtletAKA] = useState([]);
  const [dataAtletAO, setDataAtletAO] = useState([]);
  const [nilai, setNilai] = useState([]);
  const [fire, setFire] = useState([]);

  useEffect(()=> {
    const interval = setInterval(() => {
      const times = JSON.parse(localStorage.getItem('time'));
      if(fire) setFire(times);
      // if(fire !== times) setFire(times);
      // console.log(fire)
      // if (fire === 'start') {
      //   onClickReset(); 
      //   setSudah(true);
      // } else {
      //   clearTimer(); 
      //   setSudah(false); 
      //   window.location.reload();
      // }

      const dataAtletAKA = JSON.parse(localStorage.getItem('AKA'));
      const dataAtletAO = JSON.parse(localStorage.getItem('AO'));
      const nilaigass = JSON.parse(localStorage.getItem('nilai'));
      if(dataAtletAKA) setDataAtletAKA(dataAtletAKA);
      if(dataAtletAO) setDataAtletAO(dataAtletAO);
      if(nilaigass) setNilai(nilaigass);
    }, 1000);
    return () => clearInterval(interval);
  },[]);

    useEffect(() => {
      if (fire) {
        onClickReset(); 
        setSudah(true);
      }else{
        clearTimer(); 
        setSudah(false);         
      }
    }, [fire]);



  return (
    <div style={{ 
      backgroundImage: `url(${require('./../../images/board.png')})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '100vh',
      justifyContent: 'center',
      alignContent: 'center',
      alignItem: 'center',
    }}>

    <div style={{
      justifyContent: 'center',
      alignItem: 'center',
      alignContent: 'center',
      marginTop: 10
      // paddingTop: 20
    }}>
        <img 
              style={{
                height: 125,
                width: 100,
              }}
        src={logoO2sn} alt="Logo CUP 3 Bupati LOTENG" />
        <img 
              style={{
                height: 125,
                width: 100,
                marginRight: 200,
                marginLeft: 200
              }}
        src={logoForki} alt="Logo FORKI" />
        <img 
              style={{
                height: 125,
                width: 100,
              }}
        src={logoKab} alt="Logo LOTENG" />
    </div>


      <h1 style={{
        color: "#FFF",
        fontSize: 56,
        marginLeft: 100,
        marginRight: 100,
        paddingTop: 10,
        fontFamily: `'Anton', 'sans-serif'`,
        fontWeight: 400,
        fontStyle: 'normal',
      }}>OLIMPIADE OLAHRAGA SISWA NASIONAL (O2SN) 2024</h1>        
       

      <div style={{
        color: '#FFF',
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'center',
        alignContent: 'center',
        marginTop: -30
      }}>
        <div style={{ flex: 1}}>
          <h1 style={{fontSize: 70}}>AO</h1>
          <h1 style={{fontSize: 105}}>{nilai.length === 0 ? '0' : nilai.ao}</h1>
          <h2 style={{fontSize:36, marginTop: -30}}>{dataAtletAO.length === 0 ? '-' : dataAtletAO.nama}</h2>
          <h2 style={{fontSize:36, marginTop: -30}}>{dataAtletAO.length === 0 ? '-' : dataAtletAO.kata}</h2>
        </div>



        {
          <div
      style={{ textAlign: "center", margin: "auto" }}>
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
            onClick={()=> {clearTimer(); setSudah(false); window.location.reload();}}
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
        onClick={()=>{onClickReset(); setSudah(true); }}>MULAI</button> 
      }

      <h1 style={{fontSize: 46, color: '#FFF'}}>{timer}</h1>      
      
    </div>
        }

        <div style={{flex: 1}}>
          <h1 style={{fontSize: 70}}>AKA</h1>
          <h1 style={{fontSize: 105}}>{nilai.length === 0 ? '0' : nilai.aka}</h1>
          <h2 style={{fontSize:36, marginTop: -30}}>{dataAtletAKA.length === 0 ? '-' : dataAtletAKA.nama}</h2>
          <h2 style={{fontSize:36, marginTop: -30}}>{dataAtletAKA.length === 0 ? '-' : dataAtletAKA.kata}</h2>

        </div>       


      </div>


    </div>
  )
}

export default PapanScore;