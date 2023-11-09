function createProfile() {
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const birthdate = document.getElementById("birthdate").value;
  const country = document.getElementById("country").value;
  const profilePic = document.getElementById("profilePic").value;

  const profileInfo = document.getElementById("profileInfo");
  const profileImage = document.getElementById("profileImage");
  const profileCard = document.getElementById("profileCard");

  profileInfo.innerHTML = `
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Cognome:</strong> ${surname}</p>
      <p><strong>Data di Nascita:</strong> ${birthdate}</p>
      <p><strong>Paese di Origine:</strong> ${country}</p>
    `;

  if (profilePic) {
    profileImage.src = profilePic;
    profileImage.style.display = "block";
  } else {
    profileImage.style.display = "none";
  }

  profileCard.classList.remove("hidden");
}
