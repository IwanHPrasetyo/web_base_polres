import React, { useEffect, useState } from "react";
import * as firebase from "firebase";

const MasterPelapor = () => {
  const script = document.createElement("script");
  const [noIdentitas, setNoIdentitas] = useState();
  const [nama, setNamaPelapor] = useState();
  const [jenisKelamin, setJenisKelamin] = useState("L");
  const [telfon, setTelfon] = useState();
  const [pekerjaan, setPekerjaan] = useState();
  const [alamat, setAlamat] = useState();
  const [password, setPassword] = useState();
  const [kPassword, setKpassword] = useState();
  const [emailLogin, setEmailLogin] = useState();
  const [namaLogin, setNamaLogin] = useState();
  const [dataPelapor, setDataPelapor] = useState([]);

  useEffect(() => {
    selectData();
    setEmailLogin(localStorage.getItem("email"));
    setNamaLogin(localStorage.getItem("nama"));
  }, []);

  const simpanData = async () => {
    await firebase.database().ref("DataPolapor").child(noIdentitas).set({
      noIdentitas,
      nama,
      jenisKelamin,
      telfon,
      alamat,
      password,
    });
    resetData();
  };

  const resetData = () => {
    setNoIdentitas("");
    setNamaPelapor("");
    setJenisKelamin("");
    setTelfon("");
    setPekerjaan("");
    setAlamat("");
    setPassword("");
    setKpassword("");
  };

  const dataDetail = (item) => {
    console.log(item);
    setNoIdentitas(item.noIdentitas);
    setNamaPelapor(item.nama);
    setJenisKelamin(item.jenisKelamin);
    setTelfon(item.telfon);
    setAlamat(item.alamat);
    setPassword(item.password);
  };
  const updateData = async () => {
    // let Alamat = alamat;
    // let Password = password;
    // let PolsekID = polsekID;
    // let NamaKantor = namaKantor;
    // let NomerTelfon = nomerTelfon;
    // let KonfirmasiPassword = konfirmasiPassword;
    // firebase.database().ref("DataPolsek").child(id).update({
    //   Alamat: Alamat,
    //   NamaKantor: NamaKantor,
    //   NomerTelfon: NomerTelfon,
    //   Password: Password,
    // });
    await firebase.database().ref("DataPolapor").child(noIdentitas).update({
      noIdentitas,
      nama,
      jenisKelamin,
      telfon,
      alamat,
      password,
    });
    resetData();
  };

  const hapusData = (id) => {
    firebase.database().ref("DataPolapor").child(id).remove();
  };

  const selectData = async () => {
    const todoRef = firebase.database().ref("DataPolapor");
    todoRef.on("value", async (snapshot) => {
      const todos = snapshot.val();
      const todoList = [];
      for (let id in todos) {
        todoList.push({ id, ...todos[id] });
      }
      setDataPelapor(todoList);
      script.src = "js/content.js";
      script.async = true;
      document.body.appendChild(script);
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
                <h1>Data Pelapor</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Data Pelapor</li>
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
                    <h3 className="card-title">Data Pelapor Masyarakat</h3>
                    {namaLogin != "Polres Malang Kota" ? (
                      <div className="card-tools">
                        <button
                          type="button"
                          className="btn btn-block btn-primary"
                          data-toggle="modal"
                          data-target="#modal-laporan"
                        >
                          Tambah Data Polapor
                        </button>
                      </div>
                    ) : null}
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    {dataPelapor != 0 ? (
                      <table
                        id="tabelLaporan"
                        className="table table-bordered table-striped"
                      >
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>No Identitas</th>
                            <th>Nama Pelapor</th>
                            <th>Jenis Kelamin</th>
                            <th>No Telfon</th>
                            <th>Alamat</th>
                            {namaLogin != "Polres Malang Kota" ? (
                              <>
                                <th>Edit</th>
                                <th>Hapus</th>
                              </>
                            ) : null}
                          </tr>
                        </thead>
                        <tbody>
                          {dataPelapor.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.noIdentitas}</td>
                                <td>{item.nama}</td>
                                <td>{item.jenisKelamin}</td>
                                <td>{item.telfon}</td>
                                <td>{item.alamat}</td>
                                {namaLogin != "Polres Malang Kota" ? (
                                  <>
                                    <td>
                                      <button
                                        type="button"
                                        className="btn btn-block btn-primary btn-sm"
                                        data-toggle="modal"
                                        data-target="#modal-edit"
                                        onClick={() => {
                                          dataDetail(item);
                                        }}
                                      >
                                        Edit
                                      </button>
                                    </td>
                                    <td>
                                      <button
                                        onClick={() => {
                                          hapusData(item.noIdentitas);
                                        }}
                                        type="button"
                                        className="btn btn-block btn-danger btn-sm"
                                      >
                                        Hapus
                                      </button>
                                    </td>
                                  </>
                                ) : null}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    ) : null}
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
            <div className="modal fade" id="modal-laporan">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Form Data Pelapor</h4>
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
                        <div className="form-group">
                          <label htmlFor="nomerIdentitas">
                            Nomer Identitas
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="nomerIdentitasInput"
                            placeholder="KTP/SIM"
                            onChange={(data) => {
                              setNoIdentitas(data.target.value);
                            }}
                            value={noIdentitas}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="namaPelapor">Nama Pelapor</label>
                          <input
                            type="text"
                            className="form-control"
                            id="namaPelaporInput"
                            placeholder="Nama"
                            onChange={(data) => {
                              setNamaPelapor(data.target.value);
                            }}
                            value={nama}
                          />
                        </div>
                        <div className="form-group">
                          <label>Jenis Kelamin</label>
                          <select
                            onChange={(data) => {
                              setJenisKelamin(data.target.value);
                            }}
                            className="form-control"
                          >
                            <option value="L">Laki Laki</option>
                            <option value="P">Perempuan</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="Telfon">No Telfon</label>
                          <input
                            type="number"
                            className="form-control"
                            id="telfonInput"
                            placeholder="Telfon"
                            onChange={(data) => {
                              setTelfon(data.target.value);
                            }}
                            value={telfon}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Alamat</label>
                          <input
                            type="text"
                            className="form-control"
                            id="alamat"
                            placeholder="Alamat"
                            onChange={(data) => {
                              setAlamat(data.target.value);
                            }}
                            value={alamat}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">
                            Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            onChange={(data) => {
                              setPassword(data.target.value);
                            }}
                            value={password}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">
                            Konfrimasi Password
                          </label>
                          <input
                            onChange={(data) => {
                              setKpassword(data.target.value);
                            }}
                            type="password"
                            className="form-control"
                            id="kPassword"
                            placeholder="Konfirmasi Password"
                            value={kPassword}
                          />
                        </div>
                      </div>
                      {/* .card-body */}
                    </form>
                  </div>
                  <div className="modal-footer justify-content-between">
                    <button
                      onClick={() => {
                        resetData();
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
                      type="button"
                      data-dismiss="modal"
                      className="btn btn-primary swalDefaultSuccess"
                    >
                      Simpan Data
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
                    <h4 className="modal-title">Update Data Pelapor</h4>
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
                        <div className="form-group">
                          <label htmlFor="nomerIdentitas">
                            Nomer Identitas
                          </label>
                          <input
                            disabled
                            type="number"
                            className="form-control"
                            id="nomerIdentitasInput"
                            placeholder="KTP/SIM"
                            onChange={(data) => {
                              setNoIdentitas(data.target.value);
                            }}
                            value={noIdentitas}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="namaPelapor">Nama Pelapor</label>
                          <input
                            type="text"
                            className="form-control"
                            id="namaPelaporInput"
                            placeholder="Nama"
                            onChange={(data) => {
                              setNamaPelapor(data.target.value);
                            }}
                            value={nama}
                          />
                        </div>
                        <div className="form-group">
                          <label>Jenis Kelamin</label>
                          <select
                            onChange={(data) => {
                              setJenisKelamin(data.target.value);
                            }}
                            className="form-control"
                          >
                            <option
                              selected={jenisKelamin == "L" ? true : false}
                              value="L"
                            >
                              Laki Laki
                            </option>
                            <option
                              selected={jenisKelamin == "P" ? true : false}
                              value="P"
                            >
                              Perempuan
                            </option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="Telfon">No Telfon</label>
                          <input
                            type="number"
                            className="form-control"
                            id="telfonInput"
                            placeholder="Telfon"
                            onChange={(data) => {
                              setTelfon(data.target.value);
                            }}
                            value={telfon}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Alamat</label>
                          <input
                            type="text"
                            className="form-control"
                            id="alamat"
                            placeholder="Alamat"
                            onChange={(data) => {
                              setAlamat(data.target.value);
                            }}
                            value={alamat}
                          />
                        </div>
                        {/* <div className="form-group">
                          <label htmlFor="exampleInputPassword1">
                            Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            onChange={(data) => {
                              setPassword(data.target.value);
                            }}
                            value={password}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">
                            Konfrimasi Password
                          </label>
                          <input
                            onChange={(data) => {
                              setKpassword(data.target.value);
                            }}
                            type="password"
                            className="form-control"
                            id="kPassword"
                            placeholder="Konfirmasi Password"
                            value={kPassword}
                          />
                        </div> */}
                      </div>
                      {/* .card-body */}
                    </form>
                  </div>
                  <div className="modal-footer justify-content-between">
                    <button
                      onClick={() => {
                        resetData();
                      }}
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
                      type="button"
                      data-dismiss="modal"
                      className="btn btn-primary swalDefaultSuccess"
                    >
                      Simpan Data
                    </button>
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

export default MasterPelapor;
