import React, { useEffect } from "react";

const ContentDashboard = () => {
  return (
    <div>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid"></div>
          {/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            {/* Info boxes */}
            <div className="row">
              <div className="col-12 col-sm-6 col-md-3">
                <div className="info-box">
                  <span className="info-box-icon bg-info elevation-1">
                    <i className="fas fa-cog" />
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">Jumlah Laporan</span>
                    <span className="info-box-number">12</span>
                  </div>
                  {/* /.info-box-content */}
                </div>
                {/* /.info-box */}
              </div>
              {/* /.col */}
              <div className="col-12 col-sm-6 col-md-3">
                <div className="info-box mb-3">
                  <span className="info-box-icon bg-danger elevation-1">
                    <i className="fas fa-thumbs-up" />
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">Laporan Proses</span>
                    <span className="info-box-number">12</span>
                  </div>
                  {/* /.info-box-content */}
                </div>
                {/* /.info-box */}
              </div>
              {/* /.col */}
              {/* fix for small devices only */}
              <div className="clearfix hidden-md-up" />
              <div className="col-12 col-sm-6 col-md-3">
                <div className="info-box mb-3">
                  <span className="info-box-icon bg-success elevation-1">
                    <i className="fas fa-shopping-cart" />
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">Laporan Selesai</span>
                    <span className="info-box-number">12</span>
                  </div>
                  {/* /.info-box-content */}
                </div>
                {/* /.info-box */}
              </div>
              {/* /.col */}
              <div className="col-12 col-sm-6 col-md-3">
                <div className="info-box mb-3">
                  <span className="info-box-icon bg-warning elevation-1">
                    <i className="fas fa-users" />
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">Jumlah Pelapor</span>
                    <span className="info-box-number">20</span>
                  </div>
                  {/* /.info-box-content */}
                </div>
                {/* /.info-box */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  {/* <div className="card-header">
                    <h3 className="card-title">Carousel</h3>
                  </div> */}
                  {/* /.card-header */}
                  <div className="card-body">
                    <div
                      id="carouselExampleIndicators"
                      className="carousel slide"
                      data-ride="carousel"
                    >
                      <ol className="carousel-indicators">
                        <li
                          data-target="#carouselExampleIndicators"
                          data-slide-to={0}
                          className
                        />
                        <li
                          data-target="#carouselExampleIndicators"
                          data-slide-to={1}
                          className="active"
                        />
                        <li
                          data-target="#carouselExampleIndicators"
                          data-slide-to={2}
                          className
                        />
                      </ol>
                      <div className="carousel-inner">
                        <div className="carousel-item">
                          <img
                            className="d-block w-100 h-50"
                            src="https://1.bp.blogspot.com/-GSAIfCnXZNs/XRdAvA90nNI/AAAAAAAAKr0/TWMMFjjQ8RwOe5CSXrMWTiBERBWUb8GGACLcBGAs/s1600/Contoh%2BDesain%2BGambar%2BIklan%2BLayanan%2BMasyarakat%2BTentang%2BLingkungan.jpg"
                            alt="First slide"
                          />
                        </div>
                        <div className="carousel-item active">
                          <img
                            className="d-block w-100 h-50"
                            src="https://3.bp.blogspot.com/-mMcmJ5U9ROA/VF4fyfGH_wI/AAAAAAAACfA/b1draBzlkkQ/s1600/go%2Bgreen%2Btechnologu%2Bweb%2Bhosting.jpg"
                            alt="Second slide"
                          />
                        </div>
                        <div className="carousel-item">
                          <img
                            className="d-block w-100 h-50"
                            src="https://2.bp.blogspot.com/-cUVB9w6gcoo/XTCDN7q4OUI/AAAAAAAAcek/144yIfDysg8DHhNuZ2ZZVs9vUB17ggNuACK4BGAYYCw/s640/go-green-evercondo-hoa-condo.png"
                            alt="Third slide"
                          />
                        </div>
                      </div>
                      <a
                        className="carousel-control-prev"
                        href="#carouselExampleIndicators"
                        role="button"
                        data-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Previous</span>
                      </a>
                      <a
                        className="carousel-control-next"
                        href="#carouselExampleIndicators"
                        role="button"
                        data-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Next</span>
                      </a>
                    </div>
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
            </div>
            {/* /.row */}
          </div>
          {/*/. container-fluid */}
        </section>
        {/* /.content */}
      </div>
    </div>
  );
};
export default ContentDashboard;
