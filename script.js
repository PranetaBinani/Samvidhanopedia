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
    { title: "Consumer Protection Act", keywords: ["consumer", "rights", "protection"], description: "Law related to consumer rights and protection.", link: "consumer.html" },
    { title: "The Computer Fraud And Abuse Act", keywords: ["cyber", "crime", "hacking"], description: "Law to protect against cyber crimes", link: "cybercrime.html" },
    { title: "Minimum Wages Act", keywords: ["worker", "labor", "employment"], description: "Law for workers' rights and employment regulations.", link: "labor.html" },
    { title: "The Special Marriage Act", keywords: ["marriage", "divorce", "family","religion","intercaste-marriage","inter-caste","intercaste"], description: "Law that allows people to get married regardless of their religion etc", link: "special.html" },
    { title: "The Income Tax Act", keywords: ["tax", "income", "GST"], description: "Law related to taxation and financial regulations.", link: "taxation.html" }
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
                    <h3><a href="${law.link}" target="_blank">${law.title}</a></h3>
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
