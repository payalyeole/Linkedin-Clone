const navItems = document.querySelectorAll(".nav-icons li");

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      navItems.forEach(el => el.classList.remove("active"));
      item.classList.add("active");
    });
  });


function toggleDropdown() {
    const dropdown = document.getElementById("meDropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  }

  // Close dropdown when clicking outside
  document.addEventListener("click", function (event) {
    const dropdown = document.getElementById("meDropdown");
    const profileMenu = document.querySelector(".profile-menu");
    if (!profileMenu.contains(event.target)) {
      dropdown.style.display = "none";
    }
  });
