import React, { useEffect, useState } from "react";
import * as firebase from "firebase";
const MasterKriminal = () => {
  const script = document.createElement("script");
  const [id, setId] = useState();
  const [jenisKriminal, setJenisKriminal] = useState();
  const [kriminal, setKriminal] = useState([]);
  const [emailLogin, setEmailLogin] = useState();
  const [namaLogin, setNamaLogin] = useState();

  useEffect(() => {
    selectData();
    setEmailLogin(localStorage.getItem("email"));
    setNamaLogin(localStorage.getItem("nama"));
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
    const todoRef = firebase.database().ref("DataKriminal");
    todoRef.on("value", async (snapshot) => {
      const todos = snapshot.val();
      const todoList = [];
      for (let id in todos) {
        todoList.push({ id, ...todos[id] });
      }
      setKriminal(todoList);
      script.src = "js/content.js";
      script.async = true;
      document.body.appendChild(script);
      setId(todoList.length + 1);
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
                <h1>Data Jenis Kriminal</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">
                    Data Jenis Kriminal
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
                    <h3 className="card-title">Data Jenis Kriminal</h3>
                    {namaLogin != "Polres Malang Kota" ? null : (
                      <div class="card-tools">
                        <button
                          type="button"
                          class="btn btn-block btn-primary"
                          data-toggle="modal"
                          data-target="#modal-kriminal"
                        >
                          Tambah Data Kriminal
                        </button>
                      </div>
                    )}
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    {kriminal.length != 0 ? (
                      <table
                        id="tabelLaporan"
                        className="table table-bordered table-striped"
                      >
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Jenis Kriminal</th>
                            {namaLogin != "Polres Malang Kota" ? null : (
                              <>
                                <th>Edit</th>
                                <th>Hapus</th>
                              </>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {kriminal.map((item, index) => {
                            return (
                              <tr>
                                <td>{item.id}</td>
                                <td>{item.jenisKriminal}</td>
                                {namaLogin != "Polres Malang Kota" ? null : (
                                  <>
                                    <td>
                                      <button
                                        onClick={() => {
                                          dataDetail(item);
                                        }}
                                        data-toggle="modal"
                                        data-target="#modal-edit"
                                        type="button"
                                        class="btn btn-block btn-primary btn-sm"
                                      >
                                        Edit
                                      </button>
                                    </td>
                                    <td>
                                      <button
                                        onClick={() => {
                                          hapusData(item.id);
                                        }}
                                        type="button"
                                        class="btn btn-block btn-danger btn-sm"
                                      >
                                        Hapus
                                      </button>
                                    </td>
                                  </>
                                )}
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
            <div className="modal fade" id="modal-kriminal">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Tambah Jenis Kriminal</h4>
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
                          <label htmlFor="polsekID">Id</label>
                          <input
                            disabled
                            type="text"
                            className="form-control"
                            id="Id"
                            value={id}
                            placeholder="Id"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="polsekID">
                            Nama Jenis Tindak Kriminal
                          </label>
                          <input
                            onChange={(data) => {
                              setJenisKriminal(data.target.value);
                            }}
                            value={jenisKriminal}
                            type="text"
                            className="form-control"
                            id="jenisKriminal"
                            placeholder="Jenis Tindak Kriminal"
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
                    <h4 className="modal-title">Update Jenis Kriminal</h4>
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
                          <label htmlFor="polsekID">Id</label>
                          <input
                            disabled
                            type="text"
                            className="form-control"
                            id="Id"
                            value={id}
                            placeholder="Id"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="polsekID">
                            Nama Jenis Tindak Kriminal
                          </label>
                          <input
                            onChange={(data) => {
                              setJenisKriminal(data.target.value);
                            }}
                            value={jenisKriminal}
                            type="text"
                            className="form-control"
                            id="jenisKriminal"
                            placeholder="Jenis Tindak Kriminal"
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
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
      {/* /.content-wrapper */}
    </div>
  );
};

export default MasterKriminal;
