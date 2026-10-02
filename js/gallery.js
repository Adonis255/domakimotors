/* =========================================================
   DOMAKI MOTORS — TRACTOR DETAILS PAGE
   Reads ?id= from URL, renders details, gallery, related.
   Uses config.js for phone number.
   ========================================================= */

(function () {
  const params = new URLSearchParams(location.search);
  const id = Number(params.get("id"));
  const tractors = window.DOMAKI_TRACTORS || [];
  const CFG = window.DOMAKI_CONFIG || {};
  const BIZ = CFG.business || {};

  const container = document.getElementById("detailsContainer");
  if (!container) return;

  const tractor = tractors.find(function (t) { return t.id === id; });

  if (!tractor) {
    container.innerHTML =
      '<div class="empty-state" style="padding:120px 20px">' +
        '<h1 style="color:var(--white);font-size:2rem;">TRACTOR NOT FOUND</h1>' +
        '<p style="margin:16px 0 28px">The tractor you are looking for does not exist in our inventory.</p>' +
        '<a class="btn btn-primary" href="tractors.html">Return to Inventory</a>' +
      '</div>';
    return;
  }

  // Gallery uses same image 3× for now; replace with real gallery later
  const gallery = [tractor.image, tractor.image, tractor.image];

  let thumbsHTML = "";
  gallery.forEach(function (src, i) {
    thumbsHTML += '<img src="' + src + '" data-idx="' + i + '" class="' + (i === 0 ? "active" : "") + '" alt="' + tractor.brand + ' ' + tractor.model + ' view ' + (i + 1) + '">';
  });

  let idealTags = "";
  tractor.idealFor.forEach(function (tag) {
    idealTags += '<span class="tag">' + tag + '</span>';
  });

  container.innerHTML =
    '<div class="details-layout">' +
      '<div class="details-gallery">' +
        '<div class="gallery-main"><img id="galleryMain" src="' + gallery[0] + '" alt="' + tractor.brand + ' ' + tractor.model + '"></div>' +
        '<div class="gallery-thumbs">' + thumbsHTML + '</div>' +
      '</div>' +
      '<div class="details-info">' +
        '<p class="details-brand">' + tractor.brand + '</p>' +
        '<h1>' + tractor.model + '</h1>' +
        '<p style="color:var(--green);font-family:var(--font-head);font-size:1.1rem;">' + tractor.horsepower + ' HP • ' + tractor.drive + '</p>' +
        '<p class="details-price">' + window.formatPrice(tractor.price) + '</p>' +
        '<p style="font-size:.8rem;color:var(--muted);margin-bottom:20px;">Sample / Demo Pricing</p>' +
        '<span class="badge ' + (tractor.availability === "Limited Stock" ? "limited" : "available") + '">' + tractor.availability + '</span>' +

        '<div class="details-actions">' +
          '<button class="btn btn-primary" data-wa="Hello Domaki Motors, I would like a quote for the ' + tractor.brand + ' ' + tractor.model + '.">Request a Quote</button>' +
          '<a class="btn btn-ghost" href="tel:' + (BIZ.phone || "") + '">Call Domaki Motors</a>' +
          '<button class="btn btn-ghost" data-wa="Hello Domaki Motors, I would like to enquire about the ' + tractor.brand + ' ' + tractor.model + '.">WhatsApp Us</button>' +
        '</div>' +

        '<h3 style="color:var(--white);margin-top:30px;">Key Specifications</h3>' +
        '<div class="spec-cards">' +
          '<div class="spec-card"><span>Engine</span><strong>' + tractor.horsepower + ' HP Diesel</strong></div>' +
          '<div class="spec-card"><span>Horsepower</span><strong>' + tractor.horsepower + ' HP</strong></div>' +
          '<div class="spec-card"><span>Transmission</span><strong>' + tractor.transmission + '</strong></div>' +
          '<div class="spec-card"><span>Drive</span><strong>' + tractor.drive + '</strong></div>' +
          '<div class="spec-card"><span>Fuel Capacity</span><strong>—</strong></div>' +
          '<div class="spec-card"><span>Hydraulic System</span><strong>—</strong></div>' +
          '<div class="spec-card"><span>PTO</span><strong>—</strong></div>' +
          '<div class="spec-card"><span>Weight</span><strong>—</strong></div>' +
          '<div class="spec-card"><span>Tyres</span><strong>—</strong></div>' +
          '<div class="spec-card"><span>Cab</span><strong>—</strong></div>' +
        '</div>' +

        '<h3 style="color:var(--white);margin-top:30px;">About This Tractor</h3>' +
        '<p style="margin-top:10px;">' + tractor.description + '</p>' +

        '<h3 style="color:var(--white);margin-top:30px;">Ideal For</h3>' +
        '<div class="tag-list">' + idealTags + '</div>' +
      '</div>' +
    '</div>' +

    '<section style="margin-top:80px;">' +
      '<h2 class="section-title" style="margin-bottom:30px;">YOU MAY ALSO LIKE</h2>' +
      '<div class="tractor-grid" id="relatedGrid"></div>' +
    '</section>';

  /* Related tractors */
  const related = tractors.filter(function (t) { return t.id !== tractor.id; }).slice(0, 3);
  const relatedGrid = document.getElementById("relatedGrid");
  if (relatedGrid) {
    relatedGrid.innerHTML = related.map(function (t) {
      return '' +
        '<article class="tractor-card">' +
          '<div class="card-media">' +
            '<img src="' + t.image + '" alt="' + t.brand + ' ' + t.model + '" loading="lazy">' +
            '<span class="badge ' + (t.availability === "Limited Stock" ? "limited" : "available") + '">' + t.availability + '</span>' +
          '</div>' +
          '<div class="card-body">' +
            '<span class="card-brand">' + t.brand + '</span>' +
            '<h3 class="card-model">' + t.model + '</h3>' +
            '<div class="card-specs">' +
              '<span class="spec-pill">' + t.horsepower + ' HP</span>' +
              '<span class="spec-pill">' + t.drive + '</span>' +
            '</div>' +
            '<div class="card-price">' + window.formatPrice(t.price) + '<small>Sample / Demo Pricing</small></div>' +
            '<div class="card-actions">' +
              '<a class="btn btn-ghost btn-sm" href="tractor-details.html?id=' + t.id + '">View Details</a>' +
              '<button class="btn btn-primary btn-sm" data-wa="Hello Domaki Motors, I would like a quote for the ' + t.brand + ' ' + t.model + '.">Request Quote</button>' +
            '</div>' +
          '</div>' +
        '</article>';
    }).join("");
    if (window.bindWaButtonsAgain) window.bindWaButtonsAgain();
  }

  /* Gallery thumbnails */
  const mainImg = document.getElementById("galleryMain");
  document.querySelectorAll(".gallery-thumbs img").forEach(function (thumb) {
    thumb.addEventListener("click", function () {
      document.querySelectorAll(".gallery-thumbs img").forEach(function (i) { i.classList.remove("active"); });
      thumb.classList.add("active");
      mainImg.src = thumb.src;
    });
  });

  if (window.bindWaButtonsAgain) window.bindWaButtonsAgain();
})();