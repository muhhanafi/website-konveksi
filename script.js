// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Products Data
    const productsData = {
        'kaos': {
            title: 'KAOS CUSTOM',
            category: 'T-Shirt',
            image: 'file:///C:/Users/Administrator/.gemini/antigravity/brain/09bf7006-b431-4982-b56f-4475408d12f8/tshirt_mockup_1781669710607.png',
            specs: [
                'Bahan: Cotton Combed 24s / 30s',
                'Teknik: Sablon Plastisol / DTF',
                'Min Order: 24 Pcs',
                'Estimasi: 7-14 Hari Kerja',
                'Finishing: Steam & Packaging Plastik'
            ]
        },
        'workshirt': {
            title: 'KEMEJA WORKSHIRT',
            category: 'Kemeja',
            image: 'file:///C:/Users/Administrator/.gemini/antigravity/brain/09bf7006-b431-4982-b56f-4475408d12f8/workshirt_mockup_1781669722949.png',
            specs: [
                'Bahan: American Drill / Nagata Drill',
                'Teknik: Bordir Komputer',
                'Min Order: 24 Pcs',
                'Estimasi: 14-21 Hari Kerja',
                'Finishing: Steam & Packaging Plastik'
            ]
        },
        'polo': {
            title: 'POLO SHIRT',
            category: 'Polo',
            image: 'file:///C:/Users/Administrator/.gemini/antigravity/brain/09bf7006-b431-4982-b56f-4475408d12f8/polo_mockup_1781669735535.png',
            specs: [
                'Bahan: Lacoste CVC / Pique',
                'Teknik: Bordir Komputer',
                'Min Order: 24 Pcs',
                'Estimasi: 10-14 Hari Kerja',
                'Finishing: Steam & Packaging Plastik'
            ]
        },
        'varsity': {
            title: 'JAKET VARSITY',
            category: 'Jaket',
            image: 'file:///C:/Users/Administrator/.gemini/antigravity/brain/09bf7006-b431-4982-b56f-4475408d12f8/varsity_mockup_1781669747985.png',
            specs: [
                'Bahan: Fleece Cotton & Synthetic Leather',
                'Teknik: Bordir Handuk / Komputer',
                'Min Order: 24 Pcs',
                'Estimasi: 14-21 Hari Kerja',
                'Finishing: Steam & Packaging Plastik'
            ]
        },
        'jeans': {
            title: 'CELANA JEANS',
            category: 'Celana',
            image: 'file:///C:/Users/Administrator/.gemini/antigravity/brain/b8c1b937-e965-4b12-927d-80e45ef8ad07/jeans_mockup_1781673594296.png',
            specs: [
                'Bahan: Denim Premium (12oz - 14oz)',
                'Teknik: Washing & Jahit Rantai (Chainstitch)',
                'Min Order: 24 Pcs',
                'Estimasi: 14-21 Hari Kerja',
                'Finishing: Steam & Packaging Plastik'
            ]
        }
    };

    // Modal Logic
    const modal = document.getElementById('productModal');
    const modalClose = document.querySelector('.modal-close');
    const detailBtns = document.querySelectorAll('.open-modal');

    detailBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = btn.getAttribute('data-product');
            const data = productsData[productId];

            if (data) {
                document.getElementById('modalImage').src = data.image;
                document.getElementById('modalCategory').textContent = data.category;
                document.getElementById('modalTitle').textContent = data.title;

                const specsList = document.getElementById('modalSpecs');
                specsList.innerHTML = '';
                data.specs.forEach(spec => {
                    const li = document.createElement('li');
                    li.innerHTML = `<i class="fas fa-check-circle"></i> <span>${spec}</span>`;
                    specsList.appendChild(li);
                });

                modal.classList.add('active');
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add to current
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    // Small animation delay for better UX
                    setTimeout(() => { item.style.opacity = '1'; }, 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => { item.style.display = 'none'; }, 300);
                }
            });
        });
    });

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let currentImageIndex = 0;
    const portfolioImages = Array.from(portfolioItems).map(item => item.querySelector('img').src);

    portfolioItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            showLightbox(portfolioImages[currentImageIndex]);
        });
    });

    function showLightbox(src) {
        lightboxImg.src = src;
        lightbox.classList.add('active');
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex + 1) % portfolioImages.length;
            showLightbox(portfolioImages[currentImageIndex]);
        });
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex - 1 + portfolioImages.length) % portfolioImages.length;
            showLightbox(portfolioImages[currentImageIndex]);
        });
    }

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
            btn.disabled = true;

            // Simulate network request
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Pesan Terkirim';
                btn.classList.replace('btn-primary', 'btn-success');
                contactForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.replace('btn-success', 'btn-primary');
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
