function showStatistics() {
  var btnStatistics = document.getElementById("btnStatistics");
  var statistics = document.getElementById("statistics");
  var image = document.getElementById("image-annotations");
  
  if(btnStatistics.textContent == "Show statistics") {
    console.log("heeyy");
    statistics.style.display = "block";
    btnStatistics.textContent = "Hide statistics";
    image.style.display = "none";
  }
  else if(btnStatistics.textContent == "Hide statistics") {
      statistics.style.display = "none";
      btnStatistics.textContent = "Show statistics";
      image.style.display = "block";
  }
}