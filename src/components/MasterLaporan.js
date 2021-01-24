import React, { useEffect, useState } from "react";
import * as firebase from "firebase";
import L from "leaflet";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";

var greenIcon = L.icon({
  iconUrl:
    "https://cdn.iconscout.com/icon/free/png-512/police-1659481-1410003.png",

  iconSize: [38, 95], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const MasterLaporan = () => {
  const script = document.createElement("script");

  const [noLaporan, setNoLaporan] = useState();
  const [nomerId, setNomerId] = useState();
  const [namaPelapor, setNamaPelapor] = useState();
  const [telfon, setTelfon] = useState();
  const [jenisKriminal, setJenisKriminal] = useState();
  const [kronologi, setKronologi] = useState();
  const [status, setStatus] = useState("Proses");
  const [tanggal, setTanggal] = useState();
  const [kriminal, setKriminal] = useState([]);
  const [laporan, setLaporan] = useState([]);
  const [emailLogin, setEmailLogin] = useState();
  const [namaLogin, setNamaLogin] = useState();

  useEffect(() => {
    selectDataLaporan();
    selectData();
    setEmailLogin(localStorage.getItem("email"));
    setNamaLogin(localStorage.getItem("nama"));
  }, []);

  const simpanData = async () => {
    // console.log(noLaporan);
    // console.log(nomerId);
    // console.log(namaPelapor);
    // console.log(telfon);
    // console.log(jenisKriminal);
    // console.log(kronologi);
    // console.log(status);
    // console.log(tanggal);

    firebase.database().ref("DataLaporan").child(noLaporan).set({
      noLaporan,
      nomerId,
      namaPelapor,
      telfon,
      jenisKriminal,
      kronologi,
      status,
      tanggal,
    });
  };

  const onMap = (item) => {
    localStorage.setItem("latMap", item.latitude);
    localStorage.setItem("lonMap", item.Longtitude);
    window.location.href = "/maps";
  };

  const selectDataLaporan = async () => {
    const todoRef = firebase.database().ref("DataLaporan");
    todoRef.on("value", async (snapshot) => {
      const todos = snapshot.val();
      const todoList = [];
      for (let id in todos) {
        let polsekName = await localStorage.getItem("nama");
        todos[id].namaPolse === polsekName
          ? todoList.push({ id, ...todos[id] })
          : console.log("tidak input");
      }
      setLaporan(todoList);
      setNoLaporan(todoList.length + 1);
      console.log(todoList);
      script.src = "js/content.js";
      script.async = true;
      document.body.appendChild(script);
    });
  };

  const selectData = async () => {
    var d = new Date();
    let day = d.getDate();
    let bulan = d.getMonth();
    let tahun = d.getFullYear();
    setTanggal(day + "/" + bulan + "/" + tahun);

    const todoRef = firebase.database().ref("DataKriminal");
    todoRef.on("value", async (snapshot) => {
      const todos = snapshot.val();
      const todoList = [];
      for (let id in todos) {
        todoList.push({ id, ...todos[id] });
      }
      setKriminal(todoList);
      setJenisKriminal(todoList[0].jenisKriminal);
      console.log(todoList);
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
                <h1>Data Laporan</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Data Laporan</li>
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
                    <h3 className="card-title">Data Laporan Tindak Kriminal</h3>
                    {namaLogin != "Polres Malang Kota" ? (
                      <>
                        <div className="card-tools">
                          <button
                            type="button"
                            className="btn btn-block btn-primary"
                            data-toggle="modal"
                            data-target="#modal-laporan"
                          >
                            Tambah Data Laporan
                          </button>
                        </div>
                      </>
                    ) : null}
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <table
                      id="tabelLaporan"
                      className="table table-bordered table-striped"
                    >
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Jenis Kejahatan</th>
                          <th>Keterangan</th>
                          <th>Tanggal</th>
                          <th>Proses Laporan</th>
                          <th>Detail</th>
                          <th>Maps</th>
                        </tr>
                      </thead>
                      <tbody>
                        {laporan.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{item.noLaporan}</td>
                              <td>{item.jenisKriminal}</td>
                              <td>{item.kronologi}</td>
                              <td>{item.tanggal}</td>
                              <td>
                                {item.status == "Selesai" ? (
                                  <small className="badge badge-success">
                                    {item.status}
                                  </small>
                                ) : (
                                  <small className="badge badge-warning">
                                    {item.status}
                                  </small>
                                )}
                              </td>
                              <td>
                                {/* href="/DataPolsek" */}
                                <button
                                  type="button"
                                  className="btn btn-block btn-primary btn-sm"
                                  data-toggle="modal"
                                  data-target="#modal-detail"
                                >
                                  Detail
                                </button>
                              </td>
                              <td>
                                <button
                                  onClick={() => {
                                    onMap(item);
                                  }}
                                  type="button"
                                  className="btn btn-block btn-info btn-sm"
                                >
                                  Maps
                                </button>
                              </td>
                            </tr>
                          );
                        })}
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
            <div className="modal fade" id="modal-detail">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Detail Laporan</h4>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-footer justify-content-between">
                    <button
                      type="button"
                      className="btn btn-default"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-primary">
                      Save changes
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
            <div className="modal fade" id="modal-laporan">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Buat Laporan</h4>
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
                          <label htmlFor="nomerId">Nomer Identitas</label>
                          <input
                            type="number"
                            className="form-control"
                            id="nomerId"
                            placeholder="KTP/SIM"
                            onChange={(data) => {
                              setNomerId(data.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="namaPelapor">Nama Pelapor</label>
                          <input
                            type="text"
                            className="form-control"
                            id="namaPelapor"
                            placeholder="Nama"
                            onChange={(data) => {
                              setNamaPelapor(data.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="telfon">No Telfon</label>
                          <input
                            type="number"
                            className="form-control"
                            id="telfon"
                            placeholder="telfon"
                            onChange={(data) => {
                              setTelfon(data.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <label>Jenis Kejahatan</label>
                          <select
                            onChange={(data) => {
                              setJenisKriminal(data.target.value);
                            }}
                            className="form-control"
                          >
                            {kriminal.map((item, index) => {
                              return (
                                <option key={index} value={item.jenisKriminal}>
                                  {item.jenisKriminal}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="kronologi">Kronologi Kejadian</label>
                          <input
                            onChange={(data) => {
                              setKronologi(data.target.value);
                            }}
                            type="text"
                            className="form-control"
                            id="kronologi"
                            placeholder="Kronologi kejadian"
                          />
                        </div>
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
                        simpanData();
                      }}
                      type="button"
                      className="btn btn-primary swalDefaultSuccess"
                      data-dismiss="modal"
                    >
                      Buat Laporan
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

export default MasterLaporan;
