const header = document.getElementById('header');
  const stickyHeader = document.getElementById('sticky-header');
  const categories = document.querySelectorAll('.category');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
      header.style.top = '-60vh';
      stickyHeader.classList.add('visible');
    } else {
      header.style.top = '0';
      stickyHeader.classList.remove('visible');
    }
    lastScrollY = window.scrollY;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  categories.forEach((category) => {
    observer.observe(category);
  });

  const laws = [
    { title: "Consumer Protection Act", keywords: ["consumer", "rights", "protection"], description: "Laws related to consumer rights and protection." },
    { title: "Cyber Crime Law", keywords: ["cyber", "crime", "hacking"], description: "Laws to protect against cyber crimes." },
    { title: "Contract Law", keywords: ["contract", "agreement", "legal"], description: "Laws related to business and individual contracts." },
    { title: "Labor Law", keywords: ["worker", "labor", "employment"], description: "Laws for workers' rights and employment regulations." },
    { title: "Marriage Law", keywords: ["marriage", "divorce", "family"], description: "Laws regarding marriage and divorce regulations." },
    { title: "Taxation Law", keywords: ["tax", "income", "GST"], description: "Laws related to taxation and financial regulations." }
];

function searchLaws() {
    let input = document.getElementById("searchBar").value.toLowerCase().trim();
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (input === "") {
        resultsDiv.innerHTML = "<p>Start typing to search for laws...</p>";
        return;
    }

    let filteredLaws = laws.filter(law => 
        law.title.toLowerCase().includes(input) || 
        law.keywords.some(keyword => keyword.toLowerCase().includes(input))
    );

    if (filteredLaws.length > 0) {
        filteredLaws.forEach(law => {
            resultsDiv.innerHTML += `
                <div class="law-item">
                    <h3>${law.title}</h3>
                    <p>${law.description}</p>
                </div>
            `;
        });
    } else {
        resultsDiv.innerHTML = "<p>No matching laws found.</p>";
    }
}

document.getElementById("searchBar").addEventListener("keyup", searchLaws);
document.getElementById("searchButton").addEventListener("click", searchLaws);
