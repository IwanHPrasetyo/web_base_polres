import React, { useEffect, useState } from "react";
import * as firebase from "firebase";
const MasterPesan = () => {
  const script = document.createElement("script");
  const [id, setId] = useState();
  const [idPolisi, setIdPolisi] = useState();
  const [jenisKriminal, setJenisKriminal] = useState();
  const [kriminal, setKriminal] = useState([]);
  const [emailLogin, setEmailLogin] = useState();
  const [namaLogin, setNamaLogin] = useState();
  const [dataPesan, setDataPesan] = useState([]);
  const [pesan, setPesan] = useState("");
  const [dataPesanDetail, setDataPesanDetail] = useState([]);

  useEffect(() => {
    setEmailLogin(localStorage.getItem("email"));
    setNamaLogin(localStorage.getItem("nama"));
    selectData();
  }, []);

  const simpanData = async () => {
    await firebase.database().ref("DataKriminal").child(id).set({
      id,
      jenisKriminal,
    });
    resetData();
  };

  const resetData = () => {
    setJenisKriminal("");
  };
  const dataDetail = (item) => {
    setId(item.id);
    setJenisKriminal(item.jenisKriminal);
  };

  const updateData = async () => {
    await firebase.database().ref("DataKriminal").child(id).update({
      id,
      jenisKriminal,
    });
    resetData();
  };

  const hapusData = (id) => {
    firebase.database().ref("DataKriminal").child(id).remove();
  };

  const selectData = async () => {
    let idUser = await localStorage.getItem("polsekId");
    setIdPolisi(idUser);

    const todoList = [];
    const listUser = [];
    const idPengirim = [];

    const todoRef = await firebase.database().ref("Message").child(idUser);
    await todoRef.on("value", async (snapshot) => {
      const todos = snapshot.val();

      for (let id in todos) {
        const dataId = idPengirim.filter((item) => {
          return item === todos[id].pegirim;
        });

        if (dataId.length === 0) {
          idPengirim.push(todos[id].pegirim);
          todoList.push({ id, ...todos[id] });
        }
      }

      console.log("datanya");

      console.log(idPengirim);

      setDataPesan(todoList);

      script.src = "js/content.js";
      script.async = true;
      document.body.appendChild(script);
      setId(todoList.length + 1);
    });

    // selectDataUser(idPengirim);
  };

  const seletDetailPesan = async (item) => {
    console.log(item);
  };

  const kirmPesan = async () => {
    console.log("kirim pesan");
    console.log(pesan);
  };

  // const selectDataUser = async (idPengirim) => {
  //   const dataUser = [];

  //   for (let i = 0; i < idPengirim.length; i++) {
  //     const todoRef = await firebase
  //       .database()
  //       .ref("DataPolapor")
  //       .child(idPengirim[i]);

  //     todoRef.on("value", async (snapshot) => {
  //       const todos = snapshot.val();
  //       for (let id in todos) {
  //         dataUser.push(todos);
  //       }
  //     });
  //   }
  //   console.log(dataUser);
  // };

  return (
    <div>
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Data Pesan</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Pesan</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Pesan</h3>

                    {/* <div class="card-tools">
                      <button
                        type="button"
                        class="btn btn-block btn-primary"
                        data-toggle="modal"
                        data-target="#modal-kriminal"
                      >
                        Tambah Data Kriminal
                      </button>
                    </div> */}
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <table
                      id="tabelLaporan"
                      className="table table-bordered table-striped"
                    >
                      <tbody>
                        {dataPesan.length > 0
                          ? dataPesan.map((item) => {
                              return (
                                <tr>
                                  <td>
                                    <img
                                      className="direct-chat-img"
                                      src={`https://ui-avatars.com/api/?size=256&name=${item.namaPelapor}&background=random`}
                                      alt="message user image"
                                    />
                                  </td>
                                  <td>
                                    <b>{item.namaPelapor}</b>
                                  </td>
                                  <td>{item.pesan}</td>
                                  <td>
                                    <button
                                      onClick={() => {
                                        seletDetailPesan(item);
                                      }}
                                      data-toggle="modal"
                                      data-target="#modal-pesan"
                                      type="button"
                                      className="btn btn-block btn-primary btn-sm"
                                    >
                                      <i className="nav-icon far fa-comment" />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })
                          : null}
                      </tbody>
                    </table>
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          <div>
            <div className="modal fade" id="modal-pesan">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Pesan</h4>
                    <button
                      onClick={() => {
                        resetData();
                      }}
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form role="form">
                      <div className="card-body">
                        <div className="direct-chat-messages">
                          {/* chat */}
                          <div className="direct-chat-msg">
                            <div className="direct-chat-infos clearfix">
                              <span className="direct-chat-name float-left">
                                Alexander Pierce
                              </span>
                              <span className="direct-chat-timestamp float-right">
                                23 Jan 2:00 pm
                              </span>
                            </div>
                            <img
                              className="direct-chat-img"
                              src="dist/img/user1-128x128.jpg"
                              alt="message user image"
                            />
                            <div className="direct-chat-text">
                              Is this template really for free? That's
                              unbelievable!
                            </div>
                          </div>

                          <div className="direct-chat-msg right">
                            <div className="direct-chat-infos clearfix">
                              <span className="direct-chat-name float-right">
                                Sarah Bullock
                              </span>
                              <span className="direct-chat-timestamp float-left">
                                23 Jan 2:05 pm
                              </span>
                            </div>
                            <img
                              className="direct-chat-img"
                              src="dist/img/user3-128x128.jpg"
                              alt="message user image"
                            />
                            <div className="direct-chat-text">
                              You better believe it!
                            </div>
                          </div>
                          {/* chat */}
                        </div>
                        <div className="card-footer">
                          <form action="#" method="post">
                            <div className="input-group">
                              <input
                                onChange={(data) => {
                                  setPesan(data.target.value);
                                }}
                                type="text"
                                name="message"
                                placeholder="Type Message ..."
                                className="form-control"
                              />
                              <span className="input-group-append">
                                <button
                                  onClick={() => {
                                    kirmPesan();
                                  }}
                                  type="button"
                                  className="btn btn-primary"
                                >
                                  Send
                                </button>
                              </span>
                            </div>
                          </form>
                        </div>
                      </div>
                      {/* .card-body */}
                    </form>
                  </div>
                </div>
                {/* .modal-content  */}
              </div>
              {/* .modal-dialog  */}
            </div>
            {/* .modal */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
      {/* /.content-wrapper */}
    </div>
  );
};

export default MasterPesan;
