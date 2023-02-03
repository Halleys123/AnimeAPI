// let test = fetch()
//   .then((e) => e.json())
//   .then((e) => {
//     console.log(e);
//
//   })
//   .catch((e) => alert(e))
//   .finally(() => {});

window.addEventListener("load", () => {
  let i = 1,
    x = 0;

  function nToM(month) {
    switch (month) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
    }
  }
  function giveDate(date) {
    return `${nToM(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`;
  }
  const readdButton = function () {
    document.getElementById("rem").remove();

    let button = document.createElement("button");

    button.setAttribute("id", "rem");
    button.setAttribute("class", "id");

    button.style.width = "14rem";
    button.style.alignSelf = "center";
    button.style.fontSize = "2rem";
    button.style.padding = "1rem";
    button.style.backgroundColor = "aquamarine";
    button.style.borderRadius = "1.2rem";
    button.style.borderWidth = "0rem";
    button.innerHTML = "Load More";
    button.style.transition = "all";
    button.style.transitionDuration = "0.5s";

    button.addEventListener("mouseenter", () => {
      button.backgroundColor = "rgb(70, 233, 179)";
      button.style.borderRadius = "1.8rem";
      button.style.transform = "Scale(110%)";
      button.style.boxShadow = "black 8px";
    });
    button.addEventListener("mouseout", () => {
      button.backgroundColor = "aquamarine";
      button.style.borderRadius = "1.2rem";
      button.style.transform = "Scale(100%)";
      button.style.boxShadow = "black 0px";
    });
    button.addEventListener("click", () => {
      button.style.backgroundColor = "rgb(45, 191, 143)";
      button.style.borderRadius = "1.4rem";
      button.style.transform = "Scale(105%)";
      button.style.boxShadow = "black 4px";
      console.log(`${i} Pressed`);
      getData(i);
      ++i;
    });
    document
      .querySelector(".animeBox")
      .insertAdjacentElement("beforeend", button);
  };
  function getData(page) {
    let requestData = fetch(`https://api.jikan.moe/v4/anime?page=${page}`);
    requestData
      .then((e) => {
        console.log(e);
        if (!e.ok) throw new Error(`Error: ${e.statusText}`);
        return e.json();
      })
      .then((obj) => {
        console.log(obj);
        obj.data.forEach((element) => {
          const sdate = new Date(element.aired.from);
          const edate = new Date(element.aired.to);
          const sDate = giveDate(sdate);
          const eDate = giveDate(edate);

          let html = `<div class="item">
            <img
              class="itemImg"
              src = "${element.images.webp.image_url}"
              alt="Image here"
            />
            <span class="itemName">${element.titles[0].title}</span>
            <span class="itemScore">${element.score}</span>
            <span class="ranking">${element.rank}</span>
            <span class="startDate">${sDate}</span>
            <span class="endDate">${eDate}</span>
            <span class="episodes">${element.episodes}</span>
          </div>`;

          document
            .querySelector(".animeBox")
            .insertAdjacentHTML("beforeend", html);
        });
        readdButton();
      })
      .catch((e) => alert(e));
  }
  document.querySelector(".more").addEventListener("click", () => {
    getData(i);
    console.log(`${i} Pressed`);
    ++i;
  });
});
