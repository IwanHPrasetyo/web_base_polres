import React, { useEffect, useState } from "react";
import * as firebase from "firebase";

const MasterPolsek = () => {
  const script = document.createElement("script");
  const datanya = [];
  const [alamat, setAlamat] = useState("");
  const [password, setPassword] = useState("");
  const [polsekID, setPolsekID] = useState("");
  const [namaKantor, setNamaKantor] = useState("");
  const [nomerTelfon, setNomerTelfon] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");
  const [kantor, setKantor] = useState([]);
  const [dataEdit, setDataEdit] = useState([]);
  const [email, setEmail] = useState();

  useEffect(() => {
    selectData();
  }, []);

  const simpanData = async () => {
    let Alamat = alamat;
    let Password = password;
    let PolsekID = polsekID;
    let NamaKantor = namaKantor;
    let Email = email;
    let NomerTelfon = nomerTelfon;
    let KonfirmasiPassword = konfirmasiPassword;

    await firebase.database().ref("DataPolsek").child(PolsekID).set({
      PolsekID,
      NamaKantor,
      NomerTelfon,
      Alamat,
      Email,
      Password,
    });

    resetDataInput();
  };

  const resetDataInput = () => {
    setAlamat("");
    setPassword("");
    setNamaKantor("");
    setEmail("");
    setNomerTelfon("");
    setKonfirmasiPassword("");
  };

  const detailEdit = (item) => {
    console.log(item);
    setAlamat(item.Alamat);
    setPassword(item.Password);
    setNamaKantor(item.NamaKantor);
    setEmail(item.Email);
    setPolsekID(item.PolsekID);
    setNomerTelfon(item.NomerTelfon);
    setKonfirmasiPassword(item.Password);
  };

  const updateData = async () => {
    // let Alamat = alamat;
    // let Password = password;
    // let PolsekID = polsekID;
    // let NamaKantor = namaKantor;
    // let Email = email;
    // let NomerTelfon = nomerTelfon;
    // let KonfirmasiPassword = konfirmasiPassword;
    // firebase.database().ref("DataPolsek").child(id).update({
    //   Alamat: Alamat,
    //   Email: Email,
    //   NamaKantor: NamaKantor,
    //   NomerTelfon: NomerTelfon,
    //   Password: Password,
    // });
    let Alamat = alamat;
    let Password = password;
    let PolsekID = polsekID;
    let NamaKantor = namaKantor;
    let Email = email;
    let NomerTelfon = nomerTelfon;
    let KonfirmasiPassword = konfirmasiPassword;

    await firebase.database().ref("DataPolsek").child(PolsekID).update({
      PolsekID,
      NamaKantor,
      NomerTelfon,
      Alamat,
      Email,
      Password,
    });

    resetDataInput();
  };

  const hapusData = (id) => {
    firebase.database().ref("DataPolsek").child(id).remove();
  };

  const selectData = async () => {
    const todoRef = firebase.database().ref("DataPolsek");
    todoRef.on("value", async (snapshot) => {
      const todos = snapshot.val();
      const todoList = [];
      for (let id in todos) {
        todoList.push({ id, ...todos[id] });
      }
      setKantor(todoList);
      script.src = "js/content.js";
      script.async = true;
      document.body.appendChild(script);
      setPolsekID(todoList.length + 1);
    });
  };

  return (
    <div>
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Data Polsek Kota Malang</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">
                    Data Polsek Kota Malang
                  </li>
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
                    <h3 className="card-title">
                      Tabel Data Polsek Kota Malang
                    </h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-block btn-primary"
                        data-toggle="modal"
                        data-target="#modal-polsek"
                      >
                        Tambah Data Polsek
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="modal fade" id="modal-polsek">
                      <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h4 className="modal-title">Tambah Data Polsek</h4>
                            <button
                              onClick={() => {
                                resetDataInput();
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
                                <div className="form-group">
                                  <label htmlFor="polsekID">Polsek ID</label>
                                  <input
                                    disabled
                                    value={polsekID}
                                    type="text"
                                    className="form-control"
                                    id="polsekIDInput"
                                    placeholder="Polsek ID"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="namaKantorPolisi">
                                    Nama Kantor Polisi
                                  </label>
                                  <input
                                    onChange={(data) => {
                                      setNamaKantor(data.target.value);
                                    }}
                                    value={namaKantor}
                                    type="text"
                                    className="form-control"
                                    id="namaKantorPolisiInput"
                                    placeholder="Nama Kantor Polisi"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="email">Email</label>
                                  <input
                                    onChange={(data) => {
                                      setEmail(data.target.value);
                                    }}
                                    value={email}
                                    type="email"
                                    className="form-control"
                                    id="emailInput"
                                    placeholder="email"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="nomeTelfon">
                                    Nomer Telfon
                                  </label>
                                  <input
                                    onChange={(data) => {
                                      setNomerTelfon(data.target.value);
                                    }}
                                    value={nomerTelfon}
                                    type="number"
                                    className="form-control"
                                    id="nomeTelfonInput"
                                    placeholder="Nomer Telfon"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="alamat">Alamat</label>
                                  <input
                                    onChange={(data) => {
                                      setAlamat(data.target.value);
                                    }}
                                    value={alamat}
                                    type="text"
                                    className="form-control"
                                    id="alamat"
                                    placeholder="Alamat Kantor Polisi"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="Password">Password</label>
                                  <input
                                    onChange={(data) => {
                                      setPassword(data.target.value);
                                    }}
                                    value={password}
                                    type="password"
                                    className="form-control"
                                    id="PasswordInput"
                                    placeholder="Password"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="konfirmasiPassword">
                                    Konfirmasi Password
                                  </label>
                                  <input
                                    onChange={(data) => {
                                      setKonfirmasiPassword(data.target.value);
                                    }}
                                    value={konfirmasiPassword}
                                    type="password"
                                    className="form-control"
                                    id="konfirmasiPasswordInput"
                                    placeholder="Konfirmasi Password"
                                  />
                                </div>
                              </div>
                              {/* .card-body */}
                            </form>
                          </div>
                          <div className="modal-footer justify-content-between">
                            <button
                              onClick={() => {
                                resetDataInput();
                              }}
                              type="button"
                              className="btn btn-default"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              onClick={() => {
                                simpanData();
                              }}
                              className="btn btn-primary swalDefaultSuccess"
                              data-dismiss="modal"
                              type="button"
                            >
                              Simpan
                            </button>
                          </div>
                        </div>
                        {/* .modal-content  */}
                      </div>
                      {/* .modal-dialog  */}
                    </div>
                    {/* .modal */}
                  </div>

                  <div>
                    <div className="modal fade" id="modal-edit">
                      <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h4 className="modal-title">Update Data Polsek</h4>
                            <button
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
                                <div className="form-group">
                                  <label htmlFor="polsekID">Polsek ID</label>
                                  <input
                                    disabled
                                    value={dataEdit.PolsekID}
                                    className="form-control"
                                    id="polsekIDInput"
                                    placeholder="Polsek ID"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="namaKantorPolisi">
                                    Nama Kantor Polisi
                                  </label>
                                  <input
                                    onChange={(data) => {
                                      setNamaKantor(data.target.value);
                                    }}
                                    value={namaKantor}
                                    type="text"
                                    className="form-control"
                                    id="namaKantorPolisiInput"
                                    placeholder="Nama Kantor Polisi"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="email">Email</label>
                                  <input
                                    onChange={(data) => {
                                      setEmail(data.target.value);
                                    }}
                                    value={email}
                                    type="email"
                                    className="form-control"
                                    id="emailInput"
                                    placeholder="Email"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="nomeTelfon">
                                    Nomer Telfon
                                  </label>
                                  <input
                                    onChange={(data) => {
                                      setNomerTelfon(data.target.value);
                                    }}
                                    value={nomerTelfon}
                                    type="number"
                                    className="form-control"
                                    id="nomeTelfonInput"
                                    placeholder="Nomer Telfon"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="alamat">Alamat</label>
                                  <input
                                    onChange={(data) => {
                                      setAlamat(data.target.value);
                                    }}
                                    value={alamat}
                                    type="text"
                                    className="form-control"
                                    id="alamat"
                                    placeholder="Alamat Kantor Polisi"
                                  />
                                </div>
                                {/* <div className="form-group">
                                  <label htmlFor="Password">Password</label>
                                  <input
                                    onChange={(data) => {
                                      setPassword(data.target.value);
                                    }}
                                    type="password"
                                    className="form-control"
                                    id="PasswordInput"
                                    placeholder="Password"
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="konfirmasiPassword">
                                    Konfirmasi Password
                                  </label>
                                  <input
                                    onChange={(data) => {
                                      setKonfirmasiPassword(data.target.value);
                                    }}
                                    type="password"
                                    className="form-control"
                                    id="konfirmasiPasswordInput"
                                    placeholder="Konfirmasi Password"
                                  />
                                </div> */}
                              </div>
                              {/* .card-body */}
                            </form>
                          </div>
                          <div className="modal-footer justify-content-between">
                            <button
                              type="button"
                              className="btn btn-default"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              onClick={() => {
                                updateData();
                              }}
                              className="btn btn-primary swalDefaultSuccess"
                              data-dismiss="modal"
                              type="button"
                            >
                              Simpan
                            </button>
                          </div>
                        </div>
                        {/* .modal-content  */}
                      </div>
                      {/* .modal-dialog  */}
                    </div>
                    {/* .modal */}
                  </div>

                  {/* /.card-header */}
                  {kantor.length != 0 ? (
                    <div className="card-body">
                      <table
                        id="tabelLaporan"
                        className="table table-bordered table-striped"
                      >
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Nama Polsek</th>
                            <th>Telfon</th>
                            <th>Alamat</th>
                            <th>Edit</th>
                            <th>Hapus</th>
                          </tr>
                        </thead>
                        <tbody>
                          {kantor.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.PolsekID}</td>
                                <td>{item.NamaKantor}</td>
                                <td>{item.NomerTelfon}</td>
                                <td>{item.Alamat}</td>
                                <td>
                                  <button
                                    onClick={async () => {
                                      await setDataEdit(item);
                                      detailEdit(item);
                                    }}
                                    type="button"
                                    className="btn btn-block btn-primary btn-sm"
                                    data-toggle="modal"
                                    data-target="#modal-edit"
                                  >
                                    Edit
                                  </button>
                                </td>
                                <td>
                                  <button
                                    onClick={() => {
                                      hapusData(item.PolsekID);
                                    }}
                                    type="button"
                                    className="btn btn-block btn-danger btn-sm"
                                  >
                                    Hapus
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
      {/* /.content-wrapper */}
    </div>
  );
};

export default MasterPolsek;
