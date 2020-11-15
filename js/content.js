$(function () {
  $("#tabelLaporan").DataTable({
    responsive: true,
    autoWidth: false,
    bDestroy: true,
  });
  $("#tabelLaporan2").DataTable({
    paging: true,
    lengthChange: false,
    searching: false,
    ordering: true,
    info: true,
    autoWidth: false,
    responsive: true,
    bDestroy: true,
  });
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
  });

  $(".swalDefaultSuccess").click(function () {
    Toast.fire({
      icon: "success",
      title: "Berhasil Menambahkan Data",
    });
  });
  $(".swalDefaultDelete").click(function () {
    Toast.fire({
      icon: "success",
      title: "Berhasil Hapus Data",
    });
  });
});
