import React, { useEffect, useState } from "react";

const Menu = () => {
  const [email, setEmail] = useState();
  const [nama, setNama] = useState();

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
    setNama(localStorage.getItem("nama"));
  });
  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="/" className="brand-link">
          <span className="brand-text font-weight-light">
            <b>Hallo Police</b>
          </span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src={`https://ui-avatars.com/api/?size=256&name=${nama}&background=random`}
                className="img-circle elevation-2"
                alt="User"
              />
            </div>
            <div className="info">
              <a href="/Dashboard" className="d-block">
                {nama}
              </a>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class * /}
         {/* with font-awesome or any other icon font library */}
              <li className="nav-item">
                {/* <a href="/" className="nav-link active"> */}
                <a href="/Dashboard" className="nav-link">
                  <i className="nav-icon fas fa fa-home" />
                  <p>Dashboard</p>
                </a>
              </li>
              {nama != "Polres Malang Kota" ? null : (
                <li className="nav-item">
                  <a href="/DataPolsek" className="nav-link">
                    <i className="nav-icon fas fa fa-building" />
                    <p>Data Polsek</p>
                  </a>
                </li>
              )}

              <li className="nav-item">
                <a href="/DaftarPelapor" className="nav-link">
                  <i className="nav-icon fas fa fa-users" />
                  <p>Data Pelapor</p>
                </a>
              </li>
              {nama == "Polres Malang Kota" ? null : (
                <li className="nav-item">
                  <a href="/DataPesan" className="nav-link">
                    <i className="nav-icon far fa-comment" />
                    <p>Pesan</p>
                  </a>
                </li>
              )}
              <li className="nav-header">MASTERING DATA LAPORAN</li>
              <li className="nav-item">
                <a href="/DaftarKriminal" className="nav-link">
                  <i className="nav-icon fas fa fa-user-secret" />
                  <p>Data Jenis Kriminal</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/DataLaporan" className="nav-link">
                  <i className="nav-icon fas fa fa-archive" />
                  <p>Data Laporan Kriminal</p>
                </a>
              </li>
              <li className="nav-header">LAINYA</li>
              <li className="nav-item">
                <a href="/" className="nav-link">
                  <i className="nav-icon far fa fa-power-off" />
                  <p>Keluar</p>
                </a>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  );
};

export default Menu;
