/* =========================================================
   DOMAKI MOTORS — FILTERING, SEARCH, COMPARISON, MATCH
   Works with DOMAKI_TRACTORS from js/tractors.js
   ========================================================= */

(function () {
  const tractors = window.DOMAKI_TRACTORS || [];

  /* ---------- TRACTOR CARD ---------- */
  function tractorCard(t, opts) {
    opts = opts || {};
    const compare = opts.compare
      ? '<label class="compare-check"><input type="checkbox" class="cmp-box" value="' + t.id + '"> Compare</label>'
      : "";
    const badgeClass = t.availability === "Limited Stock" ? "limited" : "available";
    return '' +
      '<article class="tractor-card reveal" data-id="' + t.id + '">' +
        '<div class="card-media">' +
          '<img src="' + t.image + '" alt="' + t.brand + ' ' + t.model + ' tractor" loading="lazy">' +
          '<span class="badge ' + badgeClass + '">' + t.availability + '</span>' +
        '</div>' +
        '<div class="card-body">' +
          '<span class="card-brand">' + t.brand + '</span>' +
          '<h3 class="card-model">' + t.model + '</h3>' +
          '<div class="card-specs">' +
            '<span class="spec-pill">' + t.horsepower + ' HP</span>' +
            '<span class="spec-pill">' + t.drive + '</span>' +
            '<span class="spec-pill">' + t.transmission + '</span>' +
          '</div>' +
          '<div class="card-price">' +
            window.formatPrice(t.price) +
            '<small>Sample / Demo Pricing</small>' +
          '</div>' +
          compare +
          '<div class="card-actions">' +
            '<a class="btn btn-ghost btn-sm" href="tractor-details.html?id=' + t.id + '">View Details</a>' +
            '<button class="btn btn-primary btn-sm" data-wa="Hello Domaki Motors, I would like a quote for the ' + t.brand + ' ' + t.model + ' (' + t.horsepower + ' HP).">Request Quote</button>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  /* ---------- FEATURED (homepage) ---------- */
  const featuredGrid = document.getElementById("featuredGrid");
  if (featuredGrid) {
    featuredGrid.innerHTML = tractors.slice(0, 6).map(function (t) { return tractorCard(t); }).join("");
    if (window.bindWaButtonsAgain) window.bindWaButtonsAgain();
  }

  /* ---------- MACHINERY GRID (homepage) ---------- */
  const machineryGrid = document.getElementById("machineryGrid");
  if (machineryGrid && window.DOMAKI_MACHINERY) {
    machineryGrid.innerHTML = window.DOMAKI_MACHINERY.map(function (m) {
      return '' +
        '<article class="machinery-card reveal">' +
          '<img src="' + m.image + '" alt="' + m.name + '" loading="lazy">' +
          '<div class="machinery-body">' +
            '<h3>' + m.name + '</h3>' +
            '<p>' + m.desc + '</p>' +
            '<button class="btn btn-ghost btn-sm" data-wa="Hello Domaki Motors, I would like to enquire about ' + m.name + '.">View Equipment</button>' +
          '</div>' +
        '</article>';
    }).join("");
    if (window.bindWaButtonsAgain) window.bindWaButtonsAgain();
  }

  /* ---------- TRACTORS PAGE ---------- */
  const inventoryGrid = document.getElementById("inventoryGrid");
  if (inventoryGrid) {
    let state = {
      brand: [], hp: "", drive: [], price: "", condition: [], transmission: [], search: ""
    };
    let compareList = [];

    function applyFilters() {
      let list = tractors.slice();

      if (state.search) {
        const q = state.search.toLowerCase();
        list = list.filter(function (t) {
          return t.brand.toLowerCase().indexOf(q) !== -1 ||
                 t.model.toLowerCase().indexOf(q) !== -1 ||
                 String(t.horsepower).indexOf(q) !== -1;
        });
      }
      if (state.brand.length) list = list.filter(function (t) { return state.brand.indexOf(t.brand) !== -1; });
      if (state.hp) {
        const p = state.hp.split("-").map(Number);
        list = list.filter(function (t) { return t.horsepower >= p[0] && t.horsepower <= p[1]; });
      }
      if (state.drive.length) list = list.filter(function (t) { return state.drive.indexOf(t.drive) !== -1; });
      if (state.condition.length) list = list.filter(function (t) { return state.condition.indexOf(t.condition) !== -1; });
      if (state.transmission.length) list = list.filter(function (t) { return state.transmission.indexOf(t.transmission) !== -1; });
      if (state.price) {
        const p = state.price.split("-").map(Number);
        list = list.filter(function (t) { return t.price >= p[0] && t.price <= p[1]; });
      }
      renderInventory(list);
    }

    function renderInventory(list) {
      const countEl = document.getElementById("resultCount");
      if (countEl) countEl.textContent = list.length + " tractor" + (list.length !== 1 ? "s" : "") + " found";

      if (!list.length) {
        inventoryGrid.innerHTML =
          '<div class="empty-state">' +
            '<h3>NO MACHINES FOUND</h3>' +
            '<p>Try adjusting your filters or contact Domaki Motors and we\'ll help you find the right machine.</p>' +
            '<a class="btn btn-primary" href="contact.html">Contact Domaki</a>' +
          '</div>';
        return;
      }
      inventoryGrid.innerHTML = list.map(function (t) { return tractorCard(t, { compare: true }); }).join("");
      if (window.bindWaButtonsAgain) window.bindWaButtonsAgain();
      bindCompareBoxes();
      if (window.revealObserve) window.revealObserve();
    }

    /* Filter bindings */
    document.querySelectorAll("[data-filter]").forEach(function (el) {
      el.addEventListener("change", function () {
        const key = el.dataset.filter;
        if (key === "hp" || key === "price") {
          state[key] = el.value;
        } else {
          if (el.checked) state[key].push(el.value);
          else state[key] = state[key].filter(function (v) { return v !== el.value; });
        }
        applyFilters();
      });
    });

    const searchInput = document.getElementById("inventorySearch");
    if (searchInput) {
      searchInput.addEventListener("input", function (e) {
        state.search = e.target.value;
        applyFilters();
      });
    }

    const resetBtn = document.getElementById("resetFilters");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        state = { brand: [], hp: "", drive: [], price: "", condition: [], transmission: [], search: "" };
        document.querySelectorAll("[data-filter]").forEach(function (el) {
          if (el.type === "checkbox") el.checked = false;
          else el.value = "";
        });
        if (searchInput) searchInput.value = "";
        compareList = [];
        renderCompare();
        applyFilters();
      });
    }

    /* Comparison */
    function bindCompareBoxes() {
      document.querySelectorAll(".cmp-box").forEach(function (box) {
        box.checked = compareList.indexOf(Number(box.value)) !== -1;
        box.addEventListener("change", function () {
          const id = Number(box.value);
          if (box.checked) {
            if (compareList.length >= 3) {
              box.checked = false;
              if (window.toast) window.toast("You can compare up to 3 tractors.");
              return;
            }
            if (compareList.indexOf(id) === -1) compareList.push(id);
          } else {
            compareList = compareList.filter(function (x) { return x !== id; });
          }
          renderCompare();
        });
      });
    }

    function renderCompare() {
      const wrap = document.getElementById("compareWrap");
      if (!wrap) return;
      if (compareList.length < 2) { wrap.innerHTML = ""; return; }

      const items = compareList.map(function (id) {
        return tractors.find(function (t) { return t.id === id; });
      }).filter(Boolean);

      const rows = [
        ["Horsepower", function (t) { return t.horsepower + " HP"; }],
        ["Drive", function (t) { return t.drive; }],
        ["Transmission", function (t) { return t.transmission; }],
        ["Fuel", function (t) { return t.fuel; }],
        ["Price", function (t) { return window.formatPrice(t.price); }],
        ["Type", function (t) { return t.type; }]
      ];

      let html = '<div class="compare-wrap"><table class="compare-table"><thead><tr><th>Specification</th>';
      items.forEach(function (t) { html += '<th>' + t.brand + ' ' + t.model + '</th>'; });
      html += '</tr></thead><tbody>';
      rows.forEach(function (row) {
        html += '<tr><td>' + row[0] + '</td>';
        items.forEach(function (t) { html += '<td>' + row[1](t) + '</td>'; });
        html += '</tr>';
      });
      html += '</tbody></table></div>' +
        '<div style="margin-top:20px"><button class="btn btn-primary" data-wa="Hello Domaki Motors, I would like a quote comparing: ' +
        items.map(function (t) { return t.brand + " " + t.model; }).join(", ") +
        '.">Request Quote</button></div>';
      wrap.innerHTML = html;
      if (window.bindWaButtonsAgain) window.bindWaButtonsAgain();
    }

    // Initial render
    applyFilters();
  }

  /* ---------- HOMEPAGE FINDER → tractors.html ---------- */
  const finderForm = document.getElementById("finderForm");
  if (finderForm) {
    finderForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const params = new URLSearchParams();
      const type = document.getElementById("fType").value;
      const hp = document.getElementById("fHp").value;
      const price = document.getElementById("fPrice").value;
      const transmission = document.getElementById("fTrans").value;
      const fuel = document.getElementById("fFuel").value;
      const condition = document.getElementById("fCond").value;

      if (type) params.set("type", type);
      if (hp) params.set("hp", hp);
      if (price) params.set("price", price);
      if (transmission) params.set("transmission", transmission);
      if (fuel) params.set("fuel", fuel);
      if (condition) params.set("condition", condition);

      window.location.href = "tractors.html?" + params.toString();
    });
  }

  /* ---------- TRACTOR MATCH ---------- */
  const matchForm = document.getElementById("matchForm");
  if (matchForm) {
    matchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const work = document.getElementById("mWork").value;
      const hp = document.getElementById("mHp").value;

      if (!work && !hp) {
        if (window.toast) window.toast("Please select at least one option.");
        return;
      }

      let list = tractors.slice();

      if (hp) {
        const p = hp.split("-").map(Number);
        list = list.filter(function (t) { return t.horsepower >= p[0] && t.horsepower <= p[1]; });
      }

      if (work) {
        const map = {
          "Small farm": ["Small Farms", "Landscaping", "General Farm Work"],
          "Medium farm": ["Medium Farms", "Ploughing", "Transport"],
          "Large farm": ["Large Farms", "Commercial Agriculture", "Heavy Work"],
          "Transport": ["Transport"],
          "Commercial agriculture": ["Commercial Agriculture", "Heavy Work"],
          "Landscaping": ["Landscaping"]
        };
        const tags = map[work] || [];
        list = list.filter(function (t) {
          return t.idealFor.some(function (i) { return tags.indexOf(i) !== -1; });
        });
      }

      const results = document.getElementById("matchResults");
      if (!results) return;

      if (!list.length) {
        results.innerHTML =
          '<div class="empty-state" style="grid-column:1/-1">' +
            '<h3>NO MATCHES</h3>' +
            '<p>Try a different combination or contact us for help.</p>' +
            '<a class="btn btn-primary" href="contact.html">Contact Domaki</a>' +
          '</div>';
        return;
      }

      results.innerHTML = list.slice(0, 3).map(function (t) { return tractorCard(t); }).join("");
      if (window.bindWaButtonsAgain) window.bindWaButtonsAgain();
      if (window.revealObserve) window.revealObserve();
    });
  }
})();