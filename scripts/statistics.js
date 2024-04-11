function showStatistics() {
  console.log("heeyy");
  var btnStatistics = document.getElementById("btnStatistics");
  var statistics = document.getElementById("statistics");
  var image = document.getElementById("image-annotations");
  
  if(btnStatistics.textContent == "Zobraz štatistiku") {
    statistics.style.display = "block";
    btnStatistics.textContent = "Skry štatistiku";
    image.style.display = "none";
  }
  else if(btnStatistics.textContent == "Skry štatistiku") {
      statistics.style.display = "none";
      btnStatistics.textContent = "Zobraz štatistiku";
      image.style.display = "block";
  }
}