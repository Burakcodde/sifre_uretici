function sifreUret() {
  let karakterler = "";
  if (document.getElementById("harf").checked) {
    karakterler += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  }
  if (document.getElementById("rakam").checked) {
    karakterler += "0123456789";
  }
  if (document.getElementById("ozelKarakter").checked) {
    karakterler += "!@#$%^&*()_+[]{}|;:,.<>?";
  }

  if (karakterler === "") {
    alert("Lütfen en az bir karakter türü seçin.");
    return;
  }

  const haricKarakterler = document.getElementById("haricKarakterler").value;
  for (let i = 0; i < haricKarakterler.length; i++) {
    karakterler = karakterler.replace(
      new RegExp(`[${haricKarakterler[i]}]`, "g"),
      ""
    );
  }

  let sifre = "";
  const sifreUzunlugu = parseInt(
    document.getElementById("sifreUzunlugu").value
  ); // Şifrenin uzunluğu

  for (let i = 0; i < sifreUzunlugu; i++) {
    const rastgeleIndex = Math.floor(Math.random() * karakterler.length);
    sifre += karakterler[rastgeleIndex];
  }

  document.getElementById("sifreGoster").innerText = sifre;
  sifreGucuGoster(sifre);
}

function sifreGucuGoster(sifre) {
  let guc = 0;
  if (/[A-Z]/.test(sifre)) guc += 20;
  if (/[a-z]/.test(sifre)) guc += 20;
  if (/[0-9]/.test(sifre)) guc += 20;
  if (/[^A-Za-z0-9]/.test(sifre)) guc += 20;
  if (sifre.length >= 12) guc += 20;

  const progressBar = document.getElementById("sifreGuclu");
  progressBar.style.width = guc + "%";
  progressBar.setAttribute("aria-valuenow", guc);

  if (guc <= 40) {
    progressBar.classList.add("bg-danger");
    progressBar.classList.remove("bg-warning", "bg-success");
  } else if (guc <= 80) {
    progressBar.classList.add("bg-warning");
    progressBar.classList.remove("bg-danger", "bg-success");
  } else {
    progressBar.classList.add("bg-success");
    progressBar.classList.remove("bg-danger", "bg-warning");
  }
}

function panoyaKopyala() {
  const sifre = document.getElementById("sifreGoster").innerText;
  if (sifre) {
    navigator.clipboard.writeText(sifre).then(
      () => {
        alert("Şifre panoya kopyalandı!");
      },
      () => {
        alert("Şifre panoya kopyalanamadı.");
      }
    );
  } else {
    alert("Kopyalanacak şifre yok.");
  }
}

function toggleDarkMode() {
  const body = document.body;
  const darkModeBtn = document.getElementById("darkModeBtn");

  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    darkModeBtn.textContent = "Light Mode";
    darkModeBtn.classList.remove("btn-dark");
    darkModeBtn.classList.add("btn-light");
  } else {
    darkModeBtn.textContent = "Dark Mode";
    darkModeBtn.classList.remove("btn-light");
    darkModeBtn.classList.add("btn-dark");
  }
}

document.getElementById("sifreUretBtn").addEventListener("click", sifreUret);
document
  .getElementById("panoyaKopyalaBtn")
  .addEventListener("click", panoyaKopyala);
document
  .getElementById("darkModeBtn")
  .addEventListener("click", toggleDarkMode);
